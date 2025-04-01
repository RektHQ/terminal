export interface SecurityPartner {
  id: string
  name: string
  description: string
  specialty: string
  apiEndpoint?: string
}

export interface Vulnerability {
  id: string
  name: string
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO"
  description: string
  line?: number
  column?: number
  code?: string
  recommendation?: string
  references?: string[]
  detectedBy: string[]
}

export interface SecurityReport {
  fileName: string
  vulnerabilities: Vulnerability[]
  riskScore: number
  partners: SecurityPartner[]
}

