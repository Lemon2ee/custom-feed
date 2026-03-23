import { z } from "zod";
import type { OutputConnector } from "@/src/core/connectors/types";

const configSchema = z.object({
  baseUrl: z.string().url().default("https://ntfy.sh"),
  topic: z.string().min(1),
  token: z.string().optional(),
  priority: z.enum(["1", "2", "3", "4", "5"]).default("3"),
});

type NtfyConfig = z.infer<typeof configSchema>;

export const ntfyOutputConnector: OutputConnector<NtfyConfig> = {
  kind: "output",
  id: "ntfy",
  validateConfig(config) {
    const parsed = configSchema.safeParse(config);
    return parsed.success
      ? { valid: true }
      : { valid: false, errors: parsed.error.issues.map((issue) => issue.message) };
  },
  async send(event, _context, config) {
    const parsed = configSchema.parse(config);
    const url = `${parsed.baseUrl.replace(/\/$/, "")}/${parsed.topic}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        ...(parsed.token ? { Authorization: `Bearer ${parsed.token}` } : {}),
        Title: event.title,
        Priority: parsed.priority,
      },
      body: `${event.title}\n${event.url ?? ""}`.trim(),
    });

    if (res.ok) {
      return {
        status: "sent",
        receipt: { status: res.status },
      };
    }
    if (res.status >= 500 || res.status === 429) {
      return { status: "retryable_error", error: `ntfy returned ${res.status}` };
    }
    return { status: "permanent_error", error: `ntfy returned ${res.status}` };
  },
};
