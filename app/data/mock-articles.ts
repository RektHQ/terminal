import type { Article } from "../types/article"

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Hyperliquid Exploited - $50M Drained in Oracle Manipulation",
    date: "2025-03-15",
    tags: ["exploit", "oracle", "defi", "hyperliquid"],
    content: `In the early hours of March 15th, Hyperliquid suffered a catastrophic exploit resulting in the loss of approximately $50 million in user funds.

The attacker manipulated price oracles by executing a series of coordinated trades across multiple venues, creating artificial price discrepancies that were then exploited on Hyperliquid's perpetual futures platform.

Our analysis indicates the attacker had been preparing this exploit for weeks, gradually building positions that would maximize the impact of their oracle manipulation strategy.

The protocol has been paused, and the team is working with blockchain analytics firms to track the stolen funds. A post-mortem from the team is expected within 48 hours.

This incident highlights the ongoing challenges in securing cross-chain oracle systems, particularly for high-leverage trading platforms.`,
    lossAmount: 50000000,
  },
  {
    id: "2",
    title: "Morpho Protocol Governance Compromise",
    date: "2025-02-28",
    tags: ["governance", "security", "morpho", "dao"],
    content: `Morpho Protocol's governance system was compromised yesterday after an attacker exploited a vulnerability in the timelock controller.

The exploit allowed the attacker to bypass the mandatory 48-hour delay on governance actions, enabling them to push through a malicious proposal that would have redirected protocol fees to their own address.

Fortunately, the attack was detected by Morpho's automated monitoring systems before funds could be extracted. The team quickly deployed an emergency patch and temporarily disabled governance actions.

This incident serves as a stark reminder that governance systems themselves are attack vectors. Even with secure smart contracts, the mechanisms that control them can become points of failure.

The Morpho team has announced plans to overhaul their governance architecture, implementing a multi-signature scheme with additional security measures.`,
    lossAmount: 0,
  },
  {
    id: "3",
    title: "Mellow Finance Loses $32M in Flash Loan Attack",
    date: "2025-01-17",
    tags: ["flash-loan", "defi", "exploit", "mellow"],
    content: `Mellow Finance has been hit by a sophisticated flash loan attack resulting in approximately $32 million in losses.

The attacker exploited a vulnerability in Mellow's yield optimization vaults, using a series of flash loans to manipulate the pricing of LP tokens within the protocol.

By temporarily distorting asset prices and exploiting a reentrancy vulnerability in the withdrawal function, the attacker was able to extract significantly more value than they were entitled to.

On-chain analysis shows the funds were immediately routed through Tornado Cash and various cross-chain bridges, making recovery unlikely.

The Mellow team has acknowledged the exploit and paused all protocol operations. They've also engaged security firms to conduct a comprehensive audit of their codebase.

This marks the third major flash loan attack in the DeFi space this month, raising concerns about the security implications of these uncollateralized lending mechanisms.`,
    lossAmount: 32000000,
  },
  {
    id: "4",
    title: "Symbiotic Finance Narrowly Avoids $75M Exploit",
    date: "2024-12-05",
    tags: ["security", "whitehack", "symbiotic", "prevention"],
    content: `In what could have been one of the largest DeFi exploits of the year, Symbiotic Finance narrowly avoided a $75 million loss thanks to the intervention of white hat hackers.

The security researchers discovered a critical vulnerability in Symbiotic's cross-chain messaging protocol that would have allowed an attacker to forge message proofs and drain the protocol's liquidity pools.

After identifying the vulnerability, the white hats created a proof-of-concept exploit and immediately notified the Symbiotic team, who deployed an emergency fix within hours.

As a gesture of appreciation, Symbiotic has awarded the white hat team a $1.5 million bounty - one of the largest in DeFi history.

This near-miss highlights both the ongoing security challenges in cross-chain infrastructure and the vital role of white hat hackers in the ecosystem.

Symbiotic has announced plans for a comprehensive security overhaul, including additional audits and an expanded bug bounty program.`,
    lossAmount: 0,
  },
  {
    id: "5",
    title: "Stake Capital Launches On-Chain Security Intelligence Platform",
    date: "2024-11-20",
    tags: ["security", "tools", "stake-capital", "announcement"],
    content: `Stake Capital Group has unveiled a new on-chain security intelligence platform aimed at preventing DeFi exploits before they happen.

The platform, called "StakeLayer," combines on-chain analytics with AI-powered vulnerability detection to provide real-time security insights for DeFi protocols and users.

Key features include:
- Contract vulnerability scanning with historical exploit pattern matching
- Real-time monitoring of suspicious on-chain activity
- Risk scoring for protocols based on security practices and audit history
- Integration with major wallets to warn users before interacting with high-risk contracts

"After years of documenting the carnage through Rekt News, we're now building tools to prevent it," said a Stake Capital representative. "StakeLayer turns our archive of exploits into actionable intelligence."

The platform will operate on a freemium model, with basic security checks available to all users and advanced features reserved for subscribers.

This launch represents a significant evolution for Stake Capital, expanding beyond their media and investment activities into security infrastructure.`,
    lossAmount: 0,
  },
  {
    id: "6",
    title: "The $150M Lesson: Post-Mortem of the Curve Finance Oracle Manipulation",
    date: "2024-10-12",
    tags: ["curve", "oracle", "post-mortem", "defi"],
    content: `Three weeks after the $150 million Curve Finance exploit, we can finally piece together the full attack vector.

The exploit centered on a subtle flaw in how Curve's price oracles handled extreme market conditions during periods of low liquidity.

By strategically timing their attack during off-peak hours and targeting specific liquidity pools, the attacker was able to create artificial price discrepancies that the protocol's safety mechanisms failed to detect.

What makes this exploit particularly noteworthy is that the code had been audited multiple times by reputable firms. The vulnerability existed not in obvious bugs, but in the complex interaction between different protocol components under specific market conditions.

Recovery efforts have been partially successful, with approximately $45 million frozen on centralized exchanges. The remaining funds appear to have been laundered through privacy protocols and cross-chain bridges.

This incident serves as a sobering reminder that even battle-tested protocols with billions in TVL remain vulnerable to sophisticated attacks that target the underlying economic assumptions rather than code flaws alone.`,
    lossAmount: 150000000,
  },
  {
    id: "7",
    title: "Rekt Exclusive: Inside the Team That Recovered the Wormhole Funds",
    date: "2024-09-03",
    tags: ["wormhole", "recovery", "investigation", "bridges"],
    content: `In a Rekt News exclusive, we go behind the scenes with the team that orchestrated the recovery of $325 million from the Wormhole bridge exploit.

The recovery operation, which played out over six months, involved a complex collaboration between blockchain analytics firms, law enforcement agencies across three continents, and the Wormhole team.

Our investigation reveals how the team tracked the attacker through a sophisticated web of wallets, exchanges, and privacy tools, eventually identifying critical operational security mistakes that led to their downfall.

"The attacker was technically brilliant but made classic OPSEC errors," explained one investigator who requested anonymity. "They maintained consistent patterns in their on-chain behavior that eventually created a fingerprint we could track."

The recovery represents one of the largest successful retrieval operations in crypto history and offers valuable lessons for other protocols facing similar threats.

This case demonstrates that even in the pseudonymous world of crypto, perfect anonymity remains elusive for those moving large sums of stolen funds.`,
    lossAmount: 325000000,
  },
]

