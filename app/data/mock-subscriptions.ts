import type { SubscriptionTier } from "../types/subscription"

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: "rekt-club",
    name: "Rekt Club",
    price: 12,
    billingCycle: "monthly",
    tagline: "Essential Web3 Intelligence & Security",
    features: [
      "Premium newsletter access – stay ahead with expert insights",
      "Real-time security alerts – protect your assets from threats",
      "Insider Web3 intelligence – exclusive alpha, delivered first",
      "Rekt Club perks – early access to reports, insights & special features",
      "Partner airdrops – exclusive rewards from top-tier projects",
    ],
  },
  {
    id: "rekt-expert",
    name: "Rekt Expert",
    price: 49,
    billingCycle: "monthly",
    tagline: "Deep Research, AI Risk Assessments & VIP Access",
    features: [
      "Everything in Rekt Club",
      "Full premium research & deep-dive reports – uncover hidden opportunities",
      "AI-powered risk assessments – identify threats before they happen",
      "VIP Club Rekt Newspaper – daily Web3 insights & exclusive reports",
      "Rekt Expert perks – special reports, priority access, and more",
    ],
    highlighted: true,
    valueProposition: "For those who want a serious edge in Web3 & DeFi.",
  },
  {
    id: "rekt-og",
    name: "Rekt OG",
    price: 99,
    billingCycle: "monthly",
    tagline: "The Ultimate Rekt Experience – Exclusive, High-Value & VIP Only",
    features: [
      "Everything in Rekt Expert",
      "NFT claims & exclusive Web3 rewards – early access to premium drops",
      "Rekt OG private parties – capped at 100 people per venue for ultra-exclusive networking",
      "VIP access to partner events & private gatherings – connect with top players in the space",
      "Partner discounts – StableSummit, Nansen, RPC services, VPNs, and more",
    ],
    valueProposition: "Total value: $10,000+",
  },
]

