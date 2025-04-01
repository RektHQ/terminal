"use client"

import { useTheme } from "../contexts/theme-context"
import { Check, Clock, Star, AlertTriangle, Zap } from "lucide-react"

interface Feature {
  id: string
  title: string
  description: string
  complexity: "Low" | "Low-Medium" | "Medium" | "Medium-High" | "High"
  tools: string[]
  priority: "High" | "Medium" | "Low"
  category: "top" | "medium-term"
}

const features: Feature[] = [
  {
    id: "feature-001",
    title: "Customizable Alerts & Notifications",
    description:
      "Users subscribe to events (e.g. new exploit alert, governance vote, wallet movement). Integrate with Telegram / Email / Discord bots. Trigger alerts from existing Rekt editorial pipeline or scraped data.",
    complexity: "Low",
    tools: ["Telegram Bot API", "Notion API", "webhooks", "Discord Webhooks"],
    priority: "High",
    category: "top",
  },
  {
    id: "feature-002",
    title: "AI-Generated Summaries (RektGPT)",
    description:
      "Feed exploit data, governance proposals, or top addresses into OpenAI / Claude. Train prompt templates in Rekt tone. Display summaries on incident pages or governance panels.",
    complexity: "Low-Medium",
    tools: ["OpenAI API", "existing Rekt content database"],
    priority: "High",
    category: "top",
  },
  {
    id: "feature-003",
    title: "Governance Proposal Feed with AI TL;DRs",
    description:
      "Scrape Snapshot, Tally, Agora, etc. Use AI to auto-summarize new proposals. Add filters by DAO or token holdings.",
    complexity: "Medium",
    tools: ["Snapshot API", "OpenAI", "custom frontend widget"],
    priority: "High",
    category: "top",
  },
  {
    id: "feature-004",
    title: "Live Risk Feed (Protocol Watcher)",
    description:
      'Pull from existing sources: DefiLlama, Dune queries, TVL changes, Twitter scraping. Add "risk score" flags (e.g. Rekt warning) based on behavior (big withdrawals, governance attacks).',
    complexity: "Medium",
    tools: ["Dune API", "DefiLlama API", "Chainalysis-lite scrapers"],
    priority: "High",
    category: "top",
  },
  {
    id: "feature-005",
    title: "Simple Wallet Watchlists",
    description:
      "Let users track specific wallet activity (e.g. exploiter multisigs, DAO treasury). Add basic alerts for large transfers or protocol interactions.",
    complexity: "Medium",
    tools: ["Etherscan", "Covalent", "Arkham open data"],
    priority: "Medium",
    category: "medium-term",
  },
  {
    id: "feature-006",
    title: "Community-Contributed Labels or Notes",
    description:
      'Simple interface to add metadata to protocols, hacks, addresses. Think: "Web of Trust for Rekt-core contributors."',
    complexity: "Medium",
    tools: ["GitHub-style comment system", "basic moderation logic"],
    priority: "Medium",
    category: "medium-term",
  },
]

export function FeatureRoadmap() {
  const { theme } = useTheme()

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return theme === "hacker" ? "text-green-500 bg-green-900/20" : "text-green-400 bg-green-900/30"
      case "Low-Medium":
        return theme === "hacker" ? "text-blue-500 bg-blue-900/20" : "text-blue-400 bg-blue-900/30"
      case "Medium":
        return theme === "hacker" ? "text-yellow-500 bg-yellow-900/20" : "text-yellow-400 bg-yellow-900/30"
      case "Medium-High":
        return theme === "hacker" ? "text-orange-500 bg-orange-900/20" : "text-orange-400 bg-orange-900/30"
      case "High":
        return theme === "hacker" ? "text-red-500 bg-red-900/20" : "text-red-400 bg-red-900/30"
      default:
        return "text-gray-400 bg-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <Zap size={14} className={theme === "hacker" ? "text-red-500" : "text-red-400"} />
      case "Medium":
        return <Star size={14} className={theme === "hacker" ? "text-yellow-500" : "text-yellow-400"} />
      case "Low":
        return <Clock size={14} className={theme === "hacker" ? "text-blue-500" : "text-blue-400"} />
      default:
        return <Clock size={14} className="text-gray-400" />
    }
  }

  const topFeatures = features.filter((f) => f.category === "top")
  const mediumTermFeatures = features.filter((f) => f.category === "medium-term")

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <h3 className={`${headerClass} text-lg font-bold mb-4`}>Rekt AI Terminal Roadmap</h3>

      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Check size={16} className={theme === "hacker" ? "text-green-500 mr-2" : "text-green-400 mr-2"} />
          <h4 className={`${headerClass} font-bold`}>Top Features to Add (High Value, Low/Medium Complexity)</h4>
        </div>

        <div className="space-y-4">
          {topFeatures.map((feature) => (
            <div key={feature.id} className={`border ${borderClass} p-3 rounded`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className={`${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
                    {feature.title}
                  </span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded ${getComplexityColor(feature.complexity)}`}>
                    {feature.complexity}
                  </span>
                </div>
                <div className="flex items-center">
                  {getPriorityIcon(feature.priority)}
                  <span className="text-gray-400 text-xs ml-1">Priority: {feature.priority}</span>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-300">{feature.description}</div>

              <div className="mt-2">
                <span className="text-xs text-gray-500">Tools: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {feature.tools.map((tool, index) => (
                    <span
                      key={index}
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        theme === "hacker" ? "bg-green-900/20 text-green-500" : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <AlertTriangle size={16} className={theme === "hacker" ? "text-yellow-500 mr-2" : "text-yellow-400 mr-2"} />
          <h4 className={`${headerClass} font-bold`}>Medium-Term but Valuable Features</h4>
        </div>

        <div className="space-y-4">
          {mediumTermFeatures.map((feature) => (
            <div key={feature.id} className={`border ${borderClass} p-3 rounded`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className={`${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
                    {feature.title}
                  </span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded ${getComplexityColor(feature.complexity)}`}>
                    {feature.complexity}
                  </span>
                </div>
                <div className="flex items-center">
                  {getPriorityIcon(feature.priority)}
                  <span className="text-gray-400 text-xs ml-1">Priority: {feature.priority}</span>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-300">{feature.description}</div>

              <div className="mt-2">
                <span className="text-xs text-gray-500">Tools: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {feature.tools.map((tool, index) => (
                    <span
                      key={index}
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        theme === "hacker" ? "bg-green-900/20 text-green-500" : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

