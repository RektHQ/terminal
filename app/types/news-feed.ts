export interface FeedItem {
  id: string
  title: string
  content: string
  timestamp: string
  source: string
  url?: string
  tags: string[]
  importance: "high" | "medium" | "low"
}

export interface DailyRecap {
  date: string
  summary: string
  keyPoints: string[]
  marketSentiment: "bullish" | "bearish" | "neutral"
  topStories: FeedItem[]
  exploitStats: {
    total24h: number
    totalValue24h: number
    change7d: number
  }
}

