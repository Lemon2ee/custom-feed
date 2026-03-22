import type { ConnectorRegistry } from "@/src/core/pipeline/orchestrator";
import { rssInputConnector } from "./input/rss";
import { youtubeInputConnector } from "./input/youtube";
import { ntfyOutputConnector } from "./output/ntfy";
import { barkOutputConnector } from "./output/bark";

export const connectorRegistry: ConnectorRegistry = {
  inputs: {
    [rssInputConnector.id]: rssInputConnector,
    [youtubeInputConnector.id]: youtubeInputConnector,
  },
  outputs: {
    [ntfyOutputConnector.id]: ntfyOutputConnector,
    [barkOutputConnector.id]: barkOutputConnector,
  },
};
