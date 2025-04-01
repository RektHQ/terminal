import type { HackBounty, AuditBounty } from "../types/bounty"

export const hackBounties: HackBounty[] = [
  {
    id: "hb-001",
    protocol: "Wormhole Bridge",
    amount: 10000000,
    incident: "Cross-chain bridge exploit",
    date: "2025-03-02",
    status: "active",
    contactInfo: "security@wormhole.com | @wormholecrypto",
    deadline: "2025-06-02",
    details:
      "Offering a 10% white hat bounty for the return of funds from the February 2025 exploit. No questions asked, no legal action if funds are returned by the deadline.",
  },
  {
    id: "hb-002",
    protocol: "Aave Fork Protocol",
    amount: 2500000,
    incident: "Flash loan price manipulation",
    date: "2025-02-15",
    status: "active",
    contactInfo: "recovery@aavefork.finance | @AaveForkSecurity",
    deadline: "2025-04-15",
    details:
      "Offering a white hat bounty for the return of funds from the flash loan exploit. The team is willing to negotiate terms with the exploiter.",
  },
  {
    id: "hb-003",
    protocol: "DeFi Options Protocol",
    amount: 750000,
    incident: "Oracle manipulation",
    date: "2025-01-28",
    status: "active",
    contactInfo: "bounty@defiop.xyz | @DeFiOptionsProtocol",
    details:
      "Offering a bounty for information leading to the recovery of funds or identification of the exploiter. Will work with white hats to ensure fair compensation.",
  },
  {
    id: "hb-004",
    protocol: "Multichain DEX",
    amount: 5000000,
    incident: "Cross-chain messaging exploit",
    date: "2025-01-10",
    status: "active",
    contactInfo: "security@multidex.exchange | @MultiDEXSecurity",
    deadline: "2025-04-10",
    details:
      "Offering a significant bounty for the return of funds from the January exploit. The team is open to negotiation and guarantees anonymity.",
  },
  {
    id: "hb-005",
    protocol: "Yield Optimizer",
    amount: 1200000,
    incident: "Vault strategy manipulation",
    date: "2024-12-20",
    status: "expired",
    contactInfo: "recovery@yieldopt.finance | @YieldOptFinance",
    deadline: "2025-02-20",
    details: "This bounty has expired. The team has implemented a compensation plan for affected users.",
  },
]

export const auditBounties: AuditBounty[] = [
  {
    id: "ab-001",
    platform: "Code4rena",
    protocol: "Morpho Blue Extensions",
    amount: 150000,
    startDate: "2025-04-01",
    endDate: "2025-04-15",
    status: "upcoming",
    url: "https://code4rena.com/contests/2025-04-morpho-blue-extensions",
    details:
      "Audit of new extensions for the Morpho Blue lending protocol, focusing on new market types and liquidation mechanisms.",
    tags: ["lending", "defi", "solidity", "evm"],
  },
  {
    id: "ab-002",
    platform: "Sherlock",
    protocol: "Hyperliquid V2",
    amount: 200000,
    startDate: "2025-03-20",
    endDate: "2025-04-10",
    status: "active",
    url: "https://app.sherlock.xyz/audits/contests/hyperliquid-v2",
    details:
      "Comprehensive audit of Hyperliquid V2 perpetual futures protocol, focusing on the new cross-margin system and liquidation engine.",
    tags: ["perpetuals", "trading", "solidity", "evm"],
  },
  {
    id: "ab-003",
    platform: "Hats Finance",
    protocol: "Symbiotic Finance",
    amount: 100000,
    startDate: "2025-03-15",
    endDate: "2025-03-30",
    status: "active",
    url: "https://app.hats.finance/vulnerability-details/symbiotic-finance",
    details:
      "Audit of Symbiotic Finance cross-chain liquidity protocol, focusing on the bridge mechanism and liquidity pools.",
    tags: ["cross-chain", "bridges", "liquidity", "solidity"],
  },
  {
    id: "ab-004",
    platform: "Immunefi",
    protocol: "Mellow Protocol",
    amount: 500000,
    startDate: "2025-03-10",
    endDate: "2025-04-30",
    status: "active",
    url: "https://immunefi.com/bounty/mellow-protocol/",
    details:
      "Ongoing bug bounty program for Mellow Protocol. Rewards based on severity of findings, with up to $500k for critical vulnerabilities.",
    tags: ["yield", "vaults", "solidity", "evm", "ongoing"],
  },
  {
    id: "ab-005",
    platform: "Code4rena",
    protocol: "Stake Capital DAO",
    amount: 175000,
    startDate: "2025-03-05",
    endDate: "2025-03-19",
    status: "active",
    url: "https://code4rena.com/contests/2025-03-stake-capital-dao",
    details:
      "Audit of Stake Capital DAO governance and treasury management contracts, focusing on voting mechanisms and fund allocation.",
    tags: ["dao", "governance", "solidity", "evm"],
  },
  {
    id: "ab-006",
    platform: "Sherlock",
    protocol: "Rekt Insurance",
    amount: 125000,
    startDate: "2025-02-25",
    endDate: "2025-03-10",
    status: "ended",
    url: "https://app.sherlock.xyz/audits/contests/rekt-insurance",
    details:
      "Audit of Rekt Insurance protocol for DeFi coverage, focusing on claims processing and premium calculation.",
    tags: ["insurance", "defi", "solidity", "evm"],
  },
]

