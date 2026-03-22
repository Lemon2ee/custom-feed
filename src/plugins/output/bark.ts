import { z } from "zod";
import type { OutputConnector } from "@/src/core/connectors/types";

const configSchema = z.object({
  serverUrl: z.string().url().default("https://api.day.app"),
  deviceKey: z.string().min(1),
  group: z.string().optional(),
});

type BarkConfig = z.infer<typeof configSchema>;

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
    const endpoint = `${parsed.serverUrl.replace(/\/$/, "")}/push`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        device_key: parsed.deviceKey,
        title: event.title,
        body: event.contentText?.slice(0, 180) ?? event.url ?? "",
        url: event.url,
        group: parsed.group,
      }),
    });
    if (res.ok) return { status: "sent", receipt: { status: res.status } };
    if (res.status >= 500 || res.status === 429) {
      return { status: "retryable_error", error: `bark returned ${res.status}` };
    }
    return { status: "permanent_error", error: `bark returned ${res.status}` };
  },
};
