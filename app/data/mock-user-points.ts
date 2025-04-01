import type { UserPoints } from "../types/user-points"

export const mockUserPoints: UserPoints = {
  totalPoints: 1250,
  level: "Rekt Insider",
  nextLevel: "Rekt Veteran",
  pointsToNextLevel: 750,
  breakdown: [
    {
      category: "Subscription",
      points: 500,
      description: "Active Rekt News subscriber for 6 months",
    },
    {
      category: "Articles",
      points: 350,
      description: "Read 35 articles (10 points each)",
    },
    {
      category: "Engagement",
      points: 200,
      description: "20 comments on Rekt Parlour",
    },
    {
      category: "Sharing",
      points: 150,
      description: "15 articles shared on social media",
    },
    {
      category: "Security",
      points: 50,
      description: "5 contract analyses performed",
    },
  ],
  rewards: [
    {
      name: "Rekt Exclusive Report",
      pointsRequired: 1000,
      claimed: true,
      description: "Access to exclusive security research report",
    },
    {
      name: "StableSummit Discount",
      pointsRequired: 1500,
      claimed: false,
      description: "15% discount on StableSummit tickets",
    },
    {
      name: "Rekt Merch Pack",
      pointsRequired: 2000,
      claimed: false,
      description: "Exclusive Rekt News merchandise package",
    },
    {
      name: "Private AMA Access",
      pointsRequired: 3000,
      claimed: false,
      description: "Access to private AMA with security researchers",
    },
    {
      name: "Rekt OG Status",
      pointsRequired: 5000,
      claimed: false,
      description: "Lifetime OG status with special benefits",
    },
  ],
  history: [
    {
      date: "2025-03-29",
      action: "Read article: Hyperliquid Exploited",
      points: 10,
    },
    {
      date: "2025-03-28",
      action: "Shared article on social media",
      points: 10,
    },
    {
      date: "2025-03-27",
      action: "Posted comment in Rekt Parlour",
      points: 10,
    },
    {
      date: "2025-03-26",
      action: "Analyzed contract via terminal",
      points: 10,
    },
    {
      date: "2025-03-25",
      action: "Monthly subscription renewal",
      points: 100,
    },
  ],
}

