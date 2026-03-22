import { createCipheriv, randomBytes } from "node:crypto";
import { z } from "zod";
import type { OutputConnector } from "@/src/core/connectors/types";

const ALGO_KEY_LENGTHS: Record<string, number> = {
  "aes-128-cbc": 16,
  "aes-192-cbc": 24,
  "aes-256-cbc": 32,
};

const configSchema = z
  .object({
    serverUrl: z.string().url().default("https://api.day.app"),
    deviceKey: z.string().min(1),
    encryptionKey: z.string().optional(),
    encryptionIv: z.string().optional(),
    encryptionAlgorithm: z
      .enum(["aes-128-cbc", "aes-192-cbc", "aes-256-cbc"])
      .default("aes-256-cbc"),
  })
  .refine(
    (v) => {
      if (!v.encryptionKey) return true;
      const expected = ALGO_KEY_LENGTHS[v.encryptionAlgorithm];
      return v.encryptionKey.length === expected;
    },
    {
      message: "Encryption key length must match algorithm (16/24/32 bytes for 128/192/256-bit)",
      path: ["encryptionKey"],
    },
  )
  .refine(
    (v) => {
      if (!v.encryptionIv) return true;
      return v.encryptionIv.length === 16;
    },
    {
      message: "Encryption IV must be exactly 16 bytes",
      path: ["encryptionIv"],
    },
  );

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
  icon?: string,
): Promise<Response> {
  const endpoint = `${baseUrl}/${encodeURIComponent(deviceKey)}/${encodeURIComponent(title)}/${encodeURIComponent(body)}`;
  const query = new URLSearchParams();
  if (group) query.set("group", group);
  if (url) query.set("url", url);
  if (icon) query.set("icon", icon);
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
  icon?: string,
): Promise<Response> {
  const endpoint = `${baseUrl}/push`;
  const payload: Record<string, string> = { device_key: deviceKey, title, body };
  if (url) payload.url = url;
  if (group) payload.group = group;
  if (icon) payload.icon = icon;
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function encryptPayload(
  payload: Record<string, unknown>,
  algorithm: string,
  key: string,
  iv?: string,
): { ciphertext: string; iv: string } {
  const ivBytes = iv ? Buffer.from(iv, "utf-8") : randomBytes(16);
  const cipher = createCipheriv(algorithm, Buffer.from(key, "utf-8"), ivBytes);
  const json = JSON.stringify(payload);
  const encrypted = Buffer.concat([cipher.update(json, "utf-8"), cipher.final()]);
  return {
    ciphertext: encrypted.toString("base64"),
    iv: ivBytes.toString("utf-8"),
  };
}

async function sendEncrypted(
  baseUrl: string,
  deviceKey: string,
  payload: Record<string, unknown>,
  algorithm: string,
  key: string,
  iv?: string,
): Promise<Response> {
  const encrypted = encryptPayload(payload, algorithm, key, iv);
  const endpoint = `${baseUrl}/${encodeURIComponent(deviceKey)}`;
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv,
    }).toString(),
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
  async send(event, context, config) {
    const parsed = configSchema.parse(config);
    const baseUrl = parsed.serverUrl.replace(/\/$/, "");
    const messageTitle = event.title || "New feed item";
    const messageBody = createMessageBody(messageTitle, event.contentText ?? event.url);
    const group = context.sourceName;

    let res: Response;

    const icon = event.authorImageUrl ?? event.imageUrl;

    if (parsed.encryptionKey) {
      const payload: Record<string, unknown> = {
        title: messageTitle,
        body: messageBody,
      };
      if (group) payload.group = group;
      if (event.url) payload.url = event.url;
      if (icon) payload.icon = icon;

      res = await sendEncrypted(
        baseUrl,
        parsed.deviceKey,
        payload,
        parsed.encryptionAlgorithm,
        parsed.encryptionKey,
        parsed.encryptionIv,
      );
    } else {
      res = await sendWithPathEndpoint(
        baseUrl,
        parsed.deviceKey,
        messageTitle,
        messageBody,
        group,
        event.url,
        icon,
      );
      if (res.status === 404 || res.status === 405) {
        res = await sendWithPushEndpoint(
          baseUrl,
          parsed.deviceKey,
          messageTitle,
          messageBody,
          group,
          event.url,
          icon,
        );
      }
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
