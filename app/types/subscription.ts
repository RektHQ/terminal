export interface SubscriptionTier {
  id: string
  name: string
  price: number
  billingCycle: "monthly" | "yearly" | "biennial"
  tagline: string
  features: string[]
  highlighted?: boolean
  valueProposition?: string
  enterpriseTier?: boolean
  customPricing?: boolean
}

