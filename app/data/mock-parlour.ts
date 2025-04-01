export interface ParlourPost {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  comments: number
  tags: string[]
}

export const mockParlourPosts: ParlourPost[] = [
  {
    id: "post-001",
    author: "securityGuru",
    content:
      "Just analyzed the latest bridge exploit. The issue was in the signature verification process - they were using ecrecover without checking if the signature was valid for the expected message. Classic mistake we've seen before.",
    timestamp: "2025-03-29T11:30:00Z",
    likes: 42,
    comments: 7,
    tags: ["security", "bridges", "exploit"],
  },
  {
    id: "post-002",
    author: "defiWatcher",
    content:
      "Anyone else concerned about the amount of TVL flowing into unaudited forks? We're seeing the same patterns from 2021 all over again. Projects launching with minimal security reviews and users aping in for high APYs.",
    timestamp: "2025-03-29T10:15:00Z",
    likes: 28,
    comments: 12,
    tags: ["defi", "risk", "tvl"],
  },
  {
    id: "post-003",
    author: "rektHunter",
    content:
      "Prediction: The next major exploit will target cross-chain messaging protocols. Too many projects are implementing their own messaging layers without proper security considerations. The complexity of these systems makes them prime targets.",
    timestamp: "2025-03-28T22:45:00Z",
    likes: 56,
    comments: 9,
    tags: ["prediction", "cross-chain", "security"],
  },
  {
    id: "post-004",
    author: "auditAnon",
    content:
      "Just finished reviewing a major protocol's code. Found 3 critical issues that could have led to a complete drain of funds. All fixed now, but it's concerning how these issues made it through multiple previous audits. Always get multiple reviews!",
    timestamp: "2025-03-28T18:20:00Z",
    likes: 37,
    comments: 5,
    tags: ["audit", "security", "review"],
  },
  {
    id: "post-005",
    author: "onChainSleuth",
    content:
      "Following the money from yesterday's exploit. The attacker has split the funds across 12 different wallets and is slowly moving them through various mixers. Interesting that they're avoiding the major CEXs so far - suggests they're patient and experienced.",
    timestamp: "2025-03-28T14:10:00Z",
    likes: 63,
    comments: 15,
    tags: ["investigation", "tracking", "exploit"],
  },
]

