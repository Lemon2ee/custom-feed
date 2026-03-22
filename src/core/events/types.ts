export type SourceType =
  | "rss"
  | "youtube"
  | "bilibili"
  | "hackernews"
  | "steam-news"
  | "stock"
  | "webhook"
  | "custom";

export interface NormalizedEvent {
  id: string;
  workspaceId: string;
  sourceId: string;
  sourceType: SourceType;
  externalItemId: string;
  title: string;
  url?: string;
  contentText?: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  authorImageUrl?: string;
  tags: string[];
  rawPayload: unknown;
  createdAt: string;
}

export interface DeliveryTarget {
  outputId: string;
  channel: string;
  template?: string;
}

export interface MatchContext {
  nowIso: string;
}
