import type { AuditPlatform } from "../types/audit-platform"

export const auditPlatforms: AuditPlatform[] = [
  {
    id: "sherlock",
    name: "Sherlock",
    description: "Competitive audit contests with fixed payouts + performance-based rewards.",
    features: [
      "Auditors review real-world DeFi protocols over 7–10 day contests",
      "Focused on top-tier protocols with insurance backing",
    ],
    url: "https://www.sherlock.xyz",
  },
  {
    id: "code4rena",
    name: "Code4rena",
    description: "One of the largest audit contest platforms.",
    features: [
      "Run weekly contests with large prize pools ($50K–$150K+)",
      "Uses a leaderboard and incentivizes both depth and breadth",
    ],
    url: "https://code4rena.com",
  },
  {
    id: "immunefi",
    name: "Immunefi",
    description: "Bug bounty platform for Web3 projects.",
    features: [
      "Ongoing bounties (not contests), sometimes up to $10M+ in rewards",
      "Categories: smart contracts, front-end, infrastructure, and oracles",
    ],
    url: "https://immunefi.com",
  },
  {
    id: "hackenproof",
    name: "HackenProof",
    description: "Traditional bug bounty platform tailored to Web3.",
    features: ["Focused on continuous bug bounties and penetration testing"],
    url: "https://hackenproof.com",
  },
  {
    id: "secure3",
    name: "Secure3",
    description: "Emerging audit contest platform, similar to Code4rena/Sherlock.",
    features: ["Also runs workshops and educational challenges"],
    url: "https://www.secure3.io",
  },
  {
    id: "armorcode",
    name: "ArmorCode (Web3Scan)",
    description: "Focuses on smart contract scanning, bounty linking, and monitoring.",
    features: ["Still growing its ecosystem of bounty integrations"],
    url: "https://www.armorcode.com",
  },
  {
    id: "hats",
    name: "Bunker / Hats Finance",
    description: "Hats Finance: Decentralized bug bounty protocol.",
    features: ["Projects can deposit bounties into vaults for whitehats"],
    url: "https://hats.finance",
  },
  {
    id: "cantina",
    name: "Cantina",
    description: "Web3 security marketplace with contests, assessments, and peer reviews.",
    features: ["Matching researchers with protocols"],
    url: "https://cantina.xyz",
  },
  {
    id: "ethernautdao",
    name: "EthernautDAO",
    description: "Training and bounty-style missions for security researchers.",
    features: ["Good for ramping up into more serious bounty work"],
    url: "https://www.ethernautdao.xyz",
  },
  {
    id: "openzeppelin",
    name: "OpenZeppelin Defender Bounties",
    description: "Not a platform, but OpenZeppelin sometimes runs bug bounties for Defender or clients.",
    features: [],
    url: "https://openzeppelin.com/defender/",
  },
]

