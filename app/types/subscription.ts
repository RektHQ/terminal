export interface SubscriptionTier {
  id: string
  name: string
  price: number
  billingCycle: "monthly" | "yearly"
  tagline: string
  features: string[]
  highlighted?: boolean
  valueProposition?: string
}

