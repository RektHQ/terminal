"use client"

import { useState } from "react"
import { mockArticles } from "../data/mock-articles"
import { securityPartners } from "../services/security-service"
import { hackBounties, auditBounties } from "../data/mock-bounties"
import { mockHackVisualizations } from "../data/mock-hack-visualizations"
import { mockFeedItems, mockDailyRecaps } from "../data/mock-news-feed"
import { mockParlourPosts } from "../data/mock-parlour"
import { auditPlatforms } from "../data/mock-audit-platforms"
import { mockUserPoints } from "../data/mock-user-points"
import { subscriptionTiers } from "../data/mock-subscriptions"

export function useTerminalCommands() {
  const [lastArticleId, setLastArticleId] = useState<string | null>(null)

  const executeCommand = async (command: string): Promise<any> => {
    const [cmd, ...args] = command.trim().toLowerCase().split(" ")

    switch (cmd) {
      case "help":
        return {
          type: "help",
          commands: [
            { command: "help", description: "Show available commands" },
            { command: "clear", description: "Clear the terminal" },
            { command: "articles", description: "List recent Rekt News articles" },
            { command: "read [id]", description: "Read a specific article by ID" },
            { command: "scan [address]", description: "Scan a contract address for vulnerabilities" },
            { command: "analyze", description: "Upload and analyze a smart contract file" },
            { command: "search [term]", description: "Search articles by keyword" },
            { command: "stats", description: "Show DeFi exploit statistics" },
            { command: "visualize [hack]", description: "Visualize hack fund flows" },
            { command: "feed", description: "Show Rekt News live feed" },
            { command: "recap", description: "Show daily recap by RektAI" },
            { command: "parlour", description: "Show Rekt Parlour discussions" },
            { command: "partners", description: "Show security partners and integrations" },
            { command: "bounties", description: "Show available DeFi security bounties" },
            { command: "platforms", description: "Show security audit platforms" },
            { command: "points", description: "Show your Rekt points and rewards" },
            { command: "referral", description: "Show referral program" },
            { command: "subscribe", description: "View Rekt Exclusive Club subscription options" },
            { command: "about", description: "About Rekt AI Terminal" },
            { command: "dashboard", description: "Open the Rekt Intelligence Dashboard" },
            { command: "rektdashboard", description: "Open the Rekt Dashboard interface" },
            { command: "bloomberg", description: "Open the Bloomberg-style multi-tab interface" },
            { command: "terminal", description: "Return to the terminal view" },
            { command: "roadmap", description: "Show the Rekt AI Terminal feature roadmap" },
          ],
        }

      case "clear":
        // The clear command is handled in the Terminal component
        return { type: "clear" }

      case "articles":
        return {
          type: "article-list",
          title: "Recent Rekt News Articles",
          articles: mockArticles.slice(0, 5),
        }

      case "read":
        if (args.length === 0) {
          if (lastArticleId) {
            const article = mockArticles.find((a) => a.id === lastArticleId)
            if (article) {
              return { type: "article", article }
            }
          }
          return { type: "error", message: "Error: Please specify an article ID (e.g., read 1)" }
        }

        const articleId = args[0]
        const article = mockArticles.find((a) => a.id === articleId)

        if (article) {
          setLastArticleId(articleId)
          return { type: "article", article }
        } else {
          return { type: "error", message: `Error: Article with ID "${articleId}" not found` }
        }

      case "scan":
        if (args.length === 0) {
          return { type: "error", message: "Error: Please specify a contract address to scan" }
        }

        const address = args[0]
        // In a real app, this would call an API to scan the contract
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate scanning delay

        return {
          type: "scan",
          contract: address,
          riskScore: Math.floor(Math.random() * 100),
          vulnerabilities: [
            {
              name: "Reentrancy Vulnerability",
              severity: "HIGH",
              description: "Contract state is updated after external calls, allowing potential reentrancy attacks.",
            },
            {
              name: "Unchecked Return Values",
              severity: "MEDIUM",
              description: "External call return values are not checked, potentially leading to silent failures.",
            },
            {
              name: "Timestamp Dependence",
              severity: "LOW",
              description: "Contract logic depends on block.timestamp which can be manipulated by miners.",
            },
          ],
          similarExploits: Math.floor(Math.random() * 10) + 1,
        }

      case "analyze":
        // This is handled in the Terminal component
        return { type: "analyze" }

      case "partners":
        // This is handled in the Terminal component
        return { type: "partners", partners: securityPartners }

      case "bounties":
        return {
          type: "bounties",
          hackBounties: hackBounties,
          auditBounties: auditBounties,
        }

      case "platforms":
        return {
          type: "platforms",
          platforms: auditPlatforms,
        }

      case "points":
        return {
          type: "points",
          points: mockUserPoints,
        }

      case "referral":
        return {
          type: "referral",
        }

      case "subscribe":
        return {
          type: "subscribe",
          tiers: subscriptionTiers,
        }

      case "visualize":
        if (args.length === 0) {
          return {
            type: "error",
            message: "Error: Please specify a hack to visualize (e.g., visualize wormhole, visualize ronin)",
          }
        }

        const hackName = args[0].toLowerCase()
        const visualization = mockHackVisualizations[hackName]

        if (visualization) {
          return {
            type: "visualization",
            visualization,
          }
        } else {
          return {
            type: "error",
            message: `Error: Visualization for "${args[0]}" not found. Available: wormhole, ronin`,
          }
        }

      case "feed":
        return {
          type: "feed",
          items: mockFeedItems,
        }

      case "recap":
        return {
          type: "recap",
          recap: mockDailyRecaps[0], // Most recent recap
        }

      case "stats":
        return {
          type: "stats",
        }

      case "parlour":
        return {
          type: "parlour",
          posts: mockParlourPosts,
        }

      case "search":
        if (args.length === 0) {
          return { type: "error", message: "Error: Please specify a search term" }
        }

        const searchTerm = args.join(" ").toLowerCase()
        const results = mockArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm) ||
            article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
        )

        if (results.length === 0) {
          return { type: "error", message: `No articles found matching "${args.join(" ")}"` }
        }

        return {
          type: "article-list",
          title: `Search Results for "${args.join(" ")}"`,
          articles: results,
        }

      case "about":
        return {
          type: "welcome",
          title: "About Rekt AI Terminal",
          content: `Since 2020, Rekt News has chronicled the chaos.
When projects fall, we explain why. When millions vanish, we trace the fault lines.
We don't do press releases. We publish post-mortems.

This industry runs fast and breaks things.
We're here to document what's broken — and help builders avoid the same mistakes.

Rekt News is the independent voice in DeFi security.
No VC fluff. No protocol puppets. Just truth, consequences, and a little sarcasm.

The Rekt AI Terminal is a public good for a public threat.
Drag and drop your code. Ask if it's ever been rekt.
Scan your repo for red flags we've seen over five years of carnage.

VIEWS:
- Terminal: Command-line interface (current view)
- Bloomberg: Multi-window dashboard view
- Dashboard: Single-page dashboard view

SECURITY PARTNERSHIPS:
- Zama – for FHE and privacy-preserving scanning
- Giza – for MPC and on-chain AI workflows
- Chaos Labs – for deep risk modeling and quant security insights
- Certora – for formal verification
- ChainSecurity – for audit and vulnerability detection
- OpenZeppelin – for smart contract standards

© 2020-2025 Rekt News - Independent Journalism`,
        }

      case "dashboard":
        return { type: "dashboard" }

      case "rektdashboard":
        return { type: "rektdashboard" }

      case "bloomberg":
        return { type: "bloomberg" }

      case "terminal":
        return { type: "terminal" }

      case "roadmap":
        return {
          type: "roadmap",
        }

      default:
        return { type: "error", message: `Command not found: ${cmd}. Type 'help' for available commands.` }
    }
  }

  return { executeCommand }
}

