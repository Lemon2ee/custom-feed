import { z } from "zod";
import type { OutputConnector } from "@/src/core/connectors/types";

const configSchema = z.object({
  serverUrl: z.string().url().default("https://api.day.app"),
  deviceKey: z.string().min(1),
  group: z.string().optional(),
});

type BarkConfig = z.infer<typeof configSchema>;

interface BarkApiResponse {
  code?: number;
  message?: string;
  [key: string]: unknown;
}

async function parseBarkBody(response: Response): Promise<BarkApiResponse | undefined> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined;
  try {
    return (await response.json()) as BarkApiResponse;
  } catch {
    return undefined;
  }
}

function createMessageBody(title: string, content?: string): string {
  const safeContent = content?.trim() ?? "";
  if (!safeContent) return title;
  return safeContent.slice(0, 180);
}

async function sendWithPathEndpoint(
  baseUrl: string,
  deviceKey: string,
  title: string,
  body: string,
  group?: string,
  url?: string,
): Promise<Response> {
  const endpoint = `${baseUrl}/${encodeURIComponent(deviceKey)}/${encodeURIComponent(title)}/${encodeURIComponent(body)}`;
  const query = new URLSearchParams();
  if (group) query.set("group", group);
  if (url) query.set("url", url);
  const withQuery = query.size > 0 ? `${endpoint}?${query.toString()}` : endpoint;
  return fetch(withQuery, { method: "GET" });
}

async function sendWithPushEndpoint(
  baseUrl: string,
  deviceKey: string,
  title: string,
  body: string,
  group?: string,
  url?: string,
): Promise<Response> {
  const endpoint = `${baseUrl}/push`;
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      device_key: deviceKey,
      title,
      body,
      url,
      group,
    }),
  });
}

export const barkOutputConnector: OutputConnector<BarkConfig> = {
  kind: "output",
  id: "bark",
  validateConfig(config) {
    const parsed = configSchema.safeParse(config);
    return parsed.success
      ? { valid: true }
      : { valid: false, errors: parsed.error.issues.map((issue) => issue.message) };
  },
  async send(event, _context, config) {
    const parsed = configSchema.parse(config);
    const baseUrl = parsed.serverUrl.replace(/\/$/, "");
    const messageTitle = event.title || "New feed item";
    const messageBody = createMessageBody(messageTitle, event.contentText ?? event.url);

    // Prefer path-style endpoint since it matches common Bark usage.
    let res = await sendWithPathEndpoint(
      baseUrl,
      parsed.deviceKey,
      messageTitle,
      messageBody,
      parsed.group,
      event.url,
    );
    if (res.status === 404 || res.status === 405) {
      // Fallback for servers that support only /push JSON endpoint.
      res = await sendWithPushEndpoint(
        baseUrl,
        parsed.deviceKey,
        messageTitle,
        messageBody,
        parsed.group,
        event.url,
      );
    }

    const body = await parseBarkBody(res);
    if (res.ok) {
      if (typeof body?.code === "number" && body.code !== 200) {
        return {
          status: "permanent_error",
          error: `bark rejected request (${body.code}): ${body.message ?? "unknown"}`,
        };
      }
      return { status: "sent", receipt: { status: res.status, body } };
    }

    if (res.status >= 500 || res.status === 429) {
      return { status: "retryable_error", error: `bark returned ${res.status}` };
    }
    return {
      status: "permanent_error",
      error: `bark returned ${res.status}${body?.message ? `: ${body.message}` : ""}`,
    };
  },
};
