#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const manifestPath = process.argv[2];

if (!manifestPath) {
  console.error("Usage: node scripts/validate-plugin.mjs <path-to-manifest.json>");
  process.exit(1);
}

const absolutePath = path.resolve(manifestPath);
const manifestRaw = await fs.readFile(absolutePath, "utf8");
const manifest = JSON.parse(manifestRaw);

const requiredFields = [
  "id",
  "name",
  "version",
  "type",
  "entrypoint",
  "capabilities",
  "integrity",
  "signature",
];
const missing = requiredFields.filter((field) => !manifest[field]);
if (missing.length) {
  console.error(`Invalid manifest: missing fields ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Plugin manifest is valid for publishing checks.");
