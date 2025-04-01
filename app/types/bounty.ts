export interface HackBounty {
  id: string
  protocol: string
  amount: number
  incident: string
  date: string
  status: "active" | "expired"
  contactInfo: string
  deadline?: string
  details: string
}

export interface AuditBounty {
  id: string
  platform: string
  protocol: string
  amount: number
  startDate: string
  endDate: string
  status: "active" | "upcoming" | "ended"
  url: string
  details: string
  tags: string[]
}

export type Bounty = HackBounty | AuditBounty

