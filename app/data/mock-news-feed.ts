import type { FeedItem, DailyRecap } from "../types/news-feed"

export const mockFeedItems: FeedItem[] = [
  {
    id: "feed-001",
    title: "BREAKING: New DeFi Protocol Exploited for $15M",
    content:
      "A new DeFi protocol has been exploited for $15M due to a reentrancy vulnerability in their staking contract.",
    timestamp: "2025-03-29T12:15:00Z",
    source: "Rekt News",
    url: "https://rekt.news/example-exploit",
    tags: ["exploit", "defi", "reentrancy"],
    importance: "high",
  },
  {
    id: "feed-002",
    title: "White Hat Returns $7M to Vulnerable Protocol",
    content:
      "A white hat hacker has returned $7M to a protocol after discovering a critical vulnerability in their smart contracts.",
    timestamp: "2025-03-29T10:45:00Z",
    source: "Rekt News",
    url: "https://rekt.news/white-hat-return",
    tags: ["white-hat", "security", "recovery"],
    importance: "medium",
  },
  {
    id: "feed-003",
    title: "Security Firm Identifies Vulnerability in Popular Bridge",
    content:
      "A security firm has identified a critical vulnerability in a popular cross-chain bridge. The team has been notified and is working on a fix.",
    timestamp: "2025-03-29T09:30:00Z",
    source: "Rekt News",
    url: "https://rekt.news/bridge-vulnerability",
    tags: ["security", "bridge", "vulnerability"],
    importance: "high",
  },
  {
    id: "feed-004",
    title: "New Audit Standard Proposed by Security Coalition",
    content:
      "A coalition of security firms has proposed a new standard for smart contract audits to improve security across the ecosystem.",
    timestamp: "2025-03-29T08:15:00Z",
    source: "Rekt News",
    url: "https://rekt.news/audit-standard",
    tags: ["audit", "security", "standards"],
    importance: "medium",
  },
  {
    id: "feed-005",
    title: "Governance Proposal to Improve Protocol Security",
    content:
      "A major DeFi protocol has introduced a governance proposal to allocate 10% of treasury funds to security improvements.",
    timestamp: "2025-03-29T07:00:00Z",
    source: "Rekt News",
    url: "https://rekt.news/governance-security",
    tags: ["governance", "security", "defi"],
    importance: "low",
  },
  {
    id: "feed-006",
    title: "Exploit Analysis: The $50M Flash Loan Attack",
    content: "Detailed technical analysis of yesterday's $50M flash loan attack on a yield farming protocol.",
    timestamp: "2025-03-28T22:30:00Z",
    source: "Rekt News",
    url: "https://rekt.news/flash-loan-analysis",
    tags: ["analysis", "flash-loan", "exploit"],
    importance: "high",
  },
  {
    id: "feed-007",
    title: "Security Bounty Program Launched with $10M Pool",
    content:
      "A consortium of DeFi protocols has launched a joint security bounty program with a $10M reward pool for vulnerability disclosures.",
    timestamp: "2025-03-28T20:15:00Z",
    source: "Rekt News",
    url: "https://rekt.news/bounty-program",
    tags: ["bounty", "security", "defi"],
    importance: "medium",
  },
  {
    id: "feed-008",
    title: "Hacker Returns 80% of Stolen Funds After Negotiation",
    content:
      "The hacker behind last week's exploit has returned 80% of the stolen funds after negotiation with the protocol team.",
    timestamp: "2025-03-28T18:45:00Z",
    source: "Rekt News",
    url: "https://rekt.news/funds-returned",
    tags: ["recovery", "negotiation", "exploit"],
    importance: "high",
  },
  {
    id: "feed-009",
    title: "New Tool Released for Smart Contract Vulnerability Detection",
    content:
      "A new open-source tool has been released that can detect common smart contract vulnerabilities through static analysis.",
    timestamp: "2025-03-28T16:30:00Z",
    source: "Rekt News",
    url: "https://rekt.news/vulnerability-tool",
    tags: ["tool", "security", "development"],
    importance: "medium",
  },
  {
    id: "feed-010",
    title: "Insurance Protocol Pays Out $5M to Exploit Victims",
    content:
      "A DeFi insurance protocol has processed claims and paid out $5M to victims of last month's lending protocol exploit.",
    timestamp: "2025-03-28T14:00:00Z",
    source: "Rekt News",
    url: "https://rekt.news/insurance-payout",
    tags: ["insurance", "recovery", "defi"],
    importance: "medium",
  },
]

export const mockDailyRecaps: DailyRecap[] = [
  {
    date: "2025-03-29",
    summary:
      "Today saw a significant exploit of a new DeFi protocol for $15M, highlighting ongoing security challenges in the space. On a positive note, a white hat returned $7M to a vulnerable protocol, and a security coalition proposed new audit standards.",
    keyPoints: [
      "New DeFi protocol exploited for $15M due to reentrancy vulnerability",
      "White hat returns $7M after discovering critical vulnerability",
      "Security firm identifies vulnerability in popular bridge",
      "New audit standard proposed by security coalition",
    ],
    marketSentiment: "neutral",
    topStories: [mockFeedItems[0], mockFeedItems[1], mockFeedItems[2]],
    exploitStats: {
      total24h: 1,
      totalValue24h: 15000000,
      change7d: -30,
    },
  },
  {
    date: "2025-03-28",
    summary:
      "A day of mixed news with a detailed analysis of yesterday's $50M flash loan attack, but also positive developments including a major bounty program launch and the return of 80% of previously stolen funds after negotiation.",
    keyPoints: [
      "Detailed analysis published of $50M flash loan attack",
      "$10M security bounty program launched by DeFi consortium",
      "Hacker returns 80% of stolen funds after negotiation",
      "New vulnerability detection tool released",
    ],
    marketSentiment: "bearish",
    topStories: [mockFeedItems[5], mockFeedItems[6], mockFeedItems[7]],
    exploitStats: {
      total24h: 1,
      totalValue24h: 50000000,
      change7d: 25,
    },
  },
]

