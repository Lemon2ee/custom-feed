import type { ExternalItem, InputConnector } from "@/src/core/connectors/types";
import { z } from "zod";

const ReminderConfigSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  level: z.enum(["active", "timeSensitive", "critical"]).optional(),
  tags: z
    .array(z.string().min(1))
    .optional()
    .default([]),
});

export type ReminderConfig = z.infer<typeof ReminderConfigSchema>;

interface Cursor {
  count: number;
}

function parseCursor(raw: string | undefined): Cursor | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.count === "number" && parsed.count >= 0) {
      return { count: parsed.count };
    }
  } catch {
    return null;
  }
  return null;
}

function buildTags(config: ReminderConfig): string[] {
  const base = ["reminder"];
  const levelTag = config.level ? [config.level] : [];
  const extra = config.tags ?? [];
  return [...base, ...levelTag, ...extra].filter(Boolean);
}

export const reminderInputConnector: InputConnector<ReminderConfig> = {
  kind: "input",
  id: "reminder",

  validateConfig(raw) {
    const result = ReminderConfigSchema.safeParse(raw);
    if (!result.success) {
      return { valid: false, errors: result.error.errors.map((e) => e.message) };
    }
    return { valid: true };
  },

  async poll(context, rawConfig) {
    const config = ReminderConfigSchema.parse(rawConfig);
    const cursor = parseCursor(context.cursor);
    const nextCount = (cursor?.count ?? 0) + 1;

    const item: ExternalItem = {
      externalItemId: `${context.sourceId}-reminder-${nextCount}`,
      title: config.title,
      contentText: config.body,
      tags: buildTags(config),
      publishedAt: new Date().toISOString(),
      rawPayload: {
        ...config,
        count: nextCount,
      },
    };

    return {
      items: [item],
      nextCursor: JSON.stringify({ count: nextCount }),
      details: {
        delivered: true,
        count: nextCount,
        level: config.level ?? null,
        initial: !cursor,
      },
    };
  },
};
