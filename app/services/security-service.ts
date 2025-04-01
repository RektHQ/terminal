import type { SecurityPartner, Vulnerability, SecurityReport } from "../types/security"

// Mock security partners
export const securityPartners: SecurityPartner[] = [
  {
    id: "chaoslabs",
    name: "Chaos Labs",
    description: "Economic security and risk modeling",
    specialty: "Risk Modeling & Simulation",
    apiEndpoint: "https://api.chaoslabs.xyz/analyze",
  },
  {
    id: "certora",
    name: "Certora",
    description: "Formal verification platform",
    specialty: "Formal Verification",
    apiEndpoint: "https://verify.certora.com",
  },
  {
    id: "chainsecurity",
    name: "ChainSecurity",
    description: "Smart contract auditing",
    specialty: "Audit & Vulnerability Detection",
    apiEndpoint: "https://api.chainsecurity.com/verify",
  },
  {
    id: "zama",
    name: "Zama",
    description: "FHE for privacy-preserving computation",
    specialty: "Fully Homomorphic Encryption",
    apiEndpoint: "https://api.zama.ai/analyze",
  },
  {
    id: "giza",
    name: "Giza",
    description: "MPC and on-chain AI workflows",
    specialty: "Multi-Party Computation",
    apiEndpoint: "https://api.giza.sh/analyze",
  },
  {
    id: "openzeppelin",
    name: "OpenZeppelin",
    description: "Security products and services",
    specialty: "Smart Contract Standards",
    apiEndpoint: "https://api.openzeppelin.com/defender",
  },
]

// Common vulnerability patterns to detect in code
const vulnerabilityPatterns = [
  {
    pattern: /reentrancy|external\.call|transfer\(/i,
    create: (match: string, line: number): Vulnerability => ({
      id: `VULN-${Math.random().toString(36).substring(2, 9)}`,
      name: "Potential Reentrancy Vulnerability",
      severity: "HIGH",
      description:
        "The contract makes external calls before updating state variables, which could lead to reentrancy attacks.",
      line,
      code: match,
      recommendation: "Implement checks-effects-interactions pattern or use ReentrancyGuard.",
      references: ["SWC-107: Reentrancy", "Rekt News: The DAO Hack"],
      detectedBy: ["Certora", "ChainSecurity"],
    }),
  },
  {
    pattern: /selfdestruct|suicide/i,
    create: (match: string, line: number): Vulnerability => ({
      id: `VULN-${Math.random().toString(36).substring(2, 9)}`,
      name: "Self-Destruct Mechanism",
      severity: "CRITICAL",
      description: "The contract contains a self-destruct function that could be exploited to destroy the contract.",
      line,
      code: match,
      recommendation: "Remove self-destruct functionality or implement robust access controls.",
      references: ["SWC-106: Unprotected SELFDESTRUCT Instruction"],
      detectedBy: ["Chaos Labs", "OpenZeppelin"],
    }),
  },
  {
    pattern: /tx\.origin/i,
    create: (match: string, line: number): Vulnerability => ({
      id: `VULN-${Math.random().toString(36).substring(2, 9)}`,
      name: "tx.origin Authentication",
      severity: "HIGH",
      description: "Using tx.origin for authentication is vulnerable to phishing attacks.",
      line,
      code: match,
      recommendation: "Use msg.sender instead of tx.origin for authentication.",
      references: ["SWC-115: Authorization through tx.origin"],
      detectedBy: ["ChainSecurity", "Certora"],
    }),
  },
  {
    pattern: /block\.(timestamp|number)/i,
    create: (match: string, line: number): Vulnerability => ({
      id: `VULN-${Math.random().toString(36).substring(2, 9)}`,
      name: "Block Values as Time Dependency",
      severity: "MEDIUM",
      description:
        "Using block.timestamp or block.number as a source of randomness is predictable and can be manipulated by miners.",
      line,
      code: match,
      recommendation: "Use a secure source of randomness like Chainlink VRF.",
      references: ["SWC-116: Block values as a proxy for time"],
      detectedBy: ["Giza", "Chaos Labs"],
    }),
  },
  {
    pattern: /assembly/i,
    create: (match: string, line: number): Vulnerability => ({
      id: `VULN-${Math.random().toString(36).substring(2, 9)}`,
      name: "Use of Assembly",
      severity: "MEDIUM",
      description:
        "The contract uses assembly code which bypasses Solidity safety features and may introduce vulnerabilities.",
      line,
      code: match,
      recommendation: "Minimize use of assembly and ensure thorough testing of assembly blocks.",
      references: ["Solidity Documentation: Inline Assembly"],
      detectedBy: ["Certora", "OpenZeppelin"],
    }),
  },
  {
    pattern: /private|internal/i,
    create: (match: string, line: number): Vulnerability => ({
      id: `VULN-${Math.random().toString(36).substring(2, 9)}`,
      name: "Private Data Exposure",
      severity: "LOW",
      description:
        "Private and internal variables are still visible on the blockchain and should not be used to store sensitive information.",
      line,
      code: match,
      recommendation: "Do not store sensitive information on-chain, even in private variables.",
      references: ["SWC-136: Unencrypted Private Data On-Chain"],
      detectedBy: ["Zama", "Giza"],
    }),
  },
]

// Mock security analysis function
export async function analyzeContract(code: string, fileName: string): Promise<SecurityReport> {
  // Simulate API calls to security partners
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const lines = code.split("\n")
  const vulnerabilities: Vulnerability[] = []

  // Simple pattern matching to find potential vulnerabilities
  lines.forEach((line, index) => {
    vulnerabilityPatterns.forEach(({ pattern, create }) => {
      const match = line.match(pattern)
      if (match) {
        vulnerabilities.push(create(line, index + 1))
      }
    })
  })

  // Add some random vulnerabilities if none found (for demo purposes)
  if (vulnerabilities.length === 0) {
    const randomVulns = [
      {
        id: `VULN-${Math.random().toString(36).substring(2, 9)}`,
        name: "Unchecked Return Values",
        severity: "MEDIUM" as const,
        description:
          "The contract does not check return values from external calls, which could lead to silent failures.",
        line: Math.floor(Math.random() * lines.length) + 1,
        recommendation: "Always check return values from external calls or use SafeERC20.",
        references: ["SWC-104: Unchecked Call Return Value"],
        detectedBy: ["ChainSecurity", "OpenZeppelin"],
      },
      {
        id: `VULN-${Math.random().toString(36).substring(2, 9)}`,
        name: "Integer Overflow/Underflow",
        severity: "HIGH" as const,
        description: "The contract may be vulnerable to integer overflow or underflow attacks.",
        line: Math.floor(Math.random() * lines.length) + 1,
        recommendation: "Use SafeMath library or Solidity 0.8.0+ which has built-in overflow checking.",
        references: ["SWC-101: Integer Overflow and Underflow"],
        detectedBy: ["Certora", "Chaos Labs"],
      },
    ]

    vulnerabilities.push(...randomVulns)
  }

  // Calculate risk score based on vulnerabilities
  const severityWeights = {
    CRITICAL: 25,
    HIGH: 15,
    MEDIUM: 8,
    LOW: 3,
    INFO: 1,
  }

  let riskScore = vulnerabilities.reduce((score, vuln) => {
    return score + (severityWeights[vuln.severity] || 0)
  }, 0)

  // Cap the risk score at 100
  riskScore = Math.min(riskScore, 100)

  // Select random partners that "detected" the vulnerabilities
  const activePartners = securityPartners.filter((partner) =>
    vulnerabilities.some((v) => v.detectedBy.includes(partner.name)),
  )

  return {
    fileName,
    vulnerabilities,
    riskScore,
    partners: activePartners,
  }
}

