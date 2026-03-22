import type { ConnectorRegistry } from "@/src/core/pipeline/orchestrator";
import { rssInputConnector } from "./input/rss";
import { youtubeInputConnector } from "./input/youtube";
import { bilibiliInputConnector } from "./input/bilibili";
import { ntfyOutputConnector } from "./output/ntfy";
import { barkOutputConnector } from "./output/bark";

type FieldType = "text" | "url" | "number" | "password";

interface ConnectorConfigField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
}

interface ConnectorCatalogItem {
  id: string;
  kind: "input" | "output";
  name: string;
  description: string;
  configFields: ConnectorConfigField[];
}

export const connectorRegistry: ConnectorRegistry = {
  inputs: {
    [rssInputConnector.id]: rssInputConnector,
    [youtubeInputConnector.id]: youtubeInputConnector,
    [bilibiliInputConnector.id]: bilibiliInputConnector,
  },
  outputs: {
    [ntfyOutputConnector.id]: ntfyOutputConnector,
    [barkOutputConnector.id]: barkOutputConnector,
  },
};

export const connectorCatalog: {
  inputs: ConnectorCatalogItem[];
  outputs: ConnectorCatalogItem[];
} = {
  inputs: [
    {
      id: "rss",
      kind: "input",
      name: "RSS Feed",
      description: "Polls RSS/Atom feed URLs.",
      configFields: [
        {
          key: "feedUrl",
          label: "Feed URL",
          type: "url",
          required: true,
          placeholder: "https://example.com/feed.xml",
        },
        {
          key: "limit",
          label: "Max Items",
          type: "number",
          required: true,
          placeholder: "20",
        },
      ],
    },
    {
      id: "youtube",
      kind: "input",
      name: "YouTube Channel",
      description: "Polls channel feed for new videos.",
      configFields: [
        {
          key: "channel",
          label: "Channel URL / Handle / ID",
          type: "text",
          required: true,
          placeholder: "https://www.youtube.com/@elliotpage_",
        },
        {
          key: "limit",
          label: "Max Items",
          type: "number",
          required: true,
          placeholder: "20",
        },
      ],
    },
    {
      id: "bilibili",
      kind: "input",
      name: "Bilibili Channel",
      description: "Polls a Bilibili user's uploaded videos.",
      configFields: [
        {
          key: "spaceUrl",
          label: "Space URL or UID",
          type: "text",
          required: true,
          placeholder: "https://space.bilibili.com/12345 or 12345",
        },
        {
          key: "limit",
          label: "Max Items",
          type: "number",
          required: true,
          placeholder: "30",
        },
      ],
    },
  ],
  outputs: [
    {
      id: "ntfy",
      kind: "output",
      name: "ntfy",
      description: "Send push notifications via ntfy topic.",
      configFields: [
        {
          key: "baseUrl",
          label: "Base URL",
          type: "url",
          required: true,
          placeholder: "https://ntfy.sh",
        },
        {
          key: "topic",
          label: "Topic",
          type: "text",
          required: true,
          placeholder: "my-topic",
        },
        {
          key: "token",
          label: "Bearer Token (optional)",
          type: "password",
          required: false,
          placeholder: "ntfy access token",
        },
      ],
    },
    {
      id: "bark",
      kind: "output",
      name: "Bark",
      description: "Send iOS push notifications via Bark.",
      configFields: [
        {
          key: "serverUrl",
          label: "Server URL",
          type: "url",
          required: true,
          placeholder: "https://api.day.app",
        },
        {
          key: "deviceKey",
          label: "Device Key",
          type: "password",
          required: true,
          placeholder: "your-bark-device-key",
        },
        {
          key: "group",
          label: "Group (optional)",
          type: "text",
          required: false,
          placeholder: "feeds",
        },
        {
          key: "encryptionAlgorithm",
          label: "Encryption Algorithm (optional)",
          type: "text",
          required: false,
          placeholder: "aes-256-cbc",
        },
        {
          key: "encryptionKey",
          label: "Encryption Key (optional)",
          type: "password",
          required: false,
          placeholder: "32-byte key (or 16/24 for 128/192-bit)",
        },
        {
          key: "encryptionIv",
          label: "Encryption IV (optional)",
          type: "password",
          required: false,
          placeholder: "16-byte IV, random if omitted",
        },
      ],
    },
  ],
};
