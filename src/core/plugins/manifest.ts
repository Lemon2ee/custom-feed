import { z } from "zod";

export const pluginCapabilitySchema = z.enum([
  "http:outbound",
  "secrets:read",
  "schedule:tick",
]);

export const pluginTypeSchema = z.enum(["input", "output", "transform"]);

export const pluginManifestSchema = z.object({
  id: z.string().min(3),
  name: z.string().min(1),
  version: z.string().min(1),
  description: z.string().optional(),
  author: z.string().optional(),
  homepage: z.string().url().optional(),
  repository: z.string().url().optional(),
  type: pluginTypeSchema,
  entrypoint: z.string().min(1),
  capabilities: z.array(pluginCapabilitySchema).default([]),
  permissions: z.array(z.string()).default([]),
  integrity: z.string().min(16),
  signature: z.string().min(16),
});

export type PluginManifest = z.infer<typeof pluginManifestSchema>;

export function parsePluginManifest(input: unknown): PluginManifest {
  return pluginManifestSchema.parse(input);
}
