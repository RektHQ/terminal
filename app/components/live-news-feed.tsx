"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../contexts/theme-context"
import { AlertTriangle, Clock, ExternalLink, RefreshCw } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  source: string
  timestamp: string
  category: string
  importance: "critical" | "high" | "medium" | "low"
  url?: string
}

const mockNewsItems: NewsItem[] = [
  {
    id: "news-001",
    title: "BREAKING: Major DeFi Protocol Exploited for $30M",
    source: "Rekt News",
    timestamp: "2025-03-30T12:15:00Z",
    category: "exploit",
    importance: "critical",
    url: "https://rekt.news/example",
  },
  {
    id: "news-002",
    title: "Ethereum Layer 2 TVL Reaches New All-Time High",
    source: "DeFi Pulse",
    timestamp: "2025-03-30T11:45:00Z",
    category: "market",
    importance: "medium",
    url: "https://defipulse.com/example",
  },
  {
    id: "news-003",
    title: "SEC Approves Spot Ethereum ETF Applications",
    source: "Bloomberg",
    timestamp: "2025-03-30T10:30:00Z",
    category: "regulatory",
    importance: "high",
    url: "https://bloomberg.com/example",
  },
  {
    id: "news-004",
    title: "Uniswap Governance Proposal Passes with 98% Approval",
    source: "Uniswap Blog",
    timestamp: "2025-03-30T09:15:00Z",
    category: "governance",
    importance: "medium",
    url: "https://uniswap.org/blog/example",
  },
  {
    id: "news-005",
    title: "Chainlink Introduces New Cross-Chain Interoperability Protocol",
    source: "Chainlink Blog",
    timestamp: "2025-03-30T08:45:00Z",
    category: "development",
    importance: "medium",
    url: "https://blog.chain.link/example",
  },
  {
    id: "news-006",
    title: "White Hat Returns $12M to Exploited Protocol",
    source: "Rekt News",
    timestamp: "2025-03-30T07:30:00Z",
    category: "security",
    importance: "high",
    url: "https://rekt.news/example-2",
  },
  {
    id: "news-007",
    title: "Tornado Cash Developer Released from Custody",
    source: "CoinDesk",
    timestamp: "2025-03-30T06:15:00Z",
    category: "legal",
    importance: "medium",
    url: "https://coindesk.com/example",
  },
  {
    id: "news-008",
    title: "Critical Vulnerability Discovered in Popular Smart Contract Library",
    source: "OpenZeppelin",
    timestamp: "2025-03-30T05:00:00Z",
    category: "security",
    importance: "critical",
    url: "https://openzeppelin.com/example",
  },
  {
    id: "news-009",
    title: "Bitcoin Mining Difficulty Reaches All-Time High",
    source: "CoinMetrics",
    timestamp: "2025-03-30T04:30:00Z",
    category: "mining",
    importance: "low",
    url: "https://coinmetrics.io/example",
  },
  {
    id: "news-010",
    title: "Major Bank Launches Institutional Crypto Custody Service",
    source: "Financial Times",
    timestamp: "2025-03-30T03:15:00Z",
    category: "institutional",
    importance: "medium",
    url: "https://ft.com/example",
  },
  {
    id: "news-011",
    title: "New Exploit Vector Discovered in Cross-Chain Bridges",
    source: "Rekt News",
    timestamp: "2025-03-30T02:00:00Z",
    category: "security",
    importance: "high",
    url: "https://rekt.news/example-3",
  },
  {
    id: "news-012",
    title: "Stablecoin Market Cap Surpasses $500 Billion",
    source: "The Block",
    timestamp: "2025-03-30T01:30:00Z",
    category: "market",
    importance: "medium",
    url: "https://theblock.co/example",
  },
]

export function LiveNewsFeed() {
  const { theme } = useTheme()
  const [filter, setFilter] = useState<string>("all")
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())

  // Simulate periodic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefreshed(new Date())
    }, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setLastRefreshed(new Date())
    }, 1000)
  }

  const filteredNews =
    filter === "all"
      ? mockNewsItems
      : mockNewsItems.filter((item) => item.category === filter || item.importance === filter)

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "critical":
        return theme === "hacker" ? "text-red-500 bg-red-900/20" : "text-red-400 bg-red-900/30"
      case "high":
        return theme === "hacker" ? "text-orange-500 bg-orange-900/20" : "text-orange-400 bg-orange-900/30"
      case "medium":
        return theme === "hacker" ? "text-yellow-500 bg-yellow-900/20" : "text-yellow-400 bg-yellow-900/30"
      case "low":
        return theme === "hacker" ? "text-blue-500 bg-blue-900/20" : "text-blue-400 bg-blue-900/30"
      default:
        return "text-gray-400 bg-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "exploit":
      case "security":
        return theme === "hacker" ? "text-red-500" : "text-red-400"
      case "market":
      case "mining":
        return theme === "hacker" ? "text-green-500" : "text-green-400"
      case "regulatory":
      case "legal":
        return theme === "hacker" ? "text-blue-500" : "text-blue-400"
      case "governance":
        return theme === "hacker" ? "text-purple-500" : "text-purple-400"
      case "development":
        return theme === "hacker" ? "text-yellow-500" : "text-yellow-400"
      case "institutional":
        return theme === "hacker" ? "text-cyan-500" : "text-cyan-400"
      default:
        return "text-gray-400"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 border-b border-gray-800">
        <div className="flex space-x-1">
          <button
            className={`px-2 py-1 text-xs rounded ${
              filter === "all"
                ? theme === "hacker"
                  ? "bg-green-900/30 text-green-500"
                  : "bg-blue-900/30 text-blue-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-2 py-1 text-xs rounded ${
              filter === "critical"
                ? theme === "hacker"
                  ? "bg-red-900/30 text-red-500"
                  : "bg-red-900/30 text-red-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("critical")}
          >
            Critical
          </button>
          <button
            className={`px-2 py-1 text-xs rounded ${
              filter === "security"
                ? theme === "hacker"
                  ? "bg-red-900/30 text-red-500"
                  : "bg-red-900/30 text-red-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("security")}
          >
            Security
          </button>
          <button
            className={`px-2 py-1 text-xs rounded ${
              filter === "market"
                ? theme === "hacker"
                  ? "bg-green-900/30 text-green-500"
                  : "bg-blue-900/30 text-blue-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("market")}
          >
            Market
          </button>
          <button
            className={`px-2 py-1 text-xs rounded ${
              filter === "governance"
                ? theme === "hacker"
                  ? "bg-purple-900/30 text-purple-500"
                  : "bg-purple-900/30 text-purple-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("governance")}
          >
            Governance
          </button>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <button className="flex items-center mr-2 hover:text-gray-300" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={14} className={`mr-1 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Clock size={14} className="mr-1" />
          Last updated: {lastRefreshed.toLocaleTimeString()}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-gray-800">
          {filteredNews.map((item) => (
            <div key={item.id} className="p-3 hover:bg-gray-900">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {item.importance === "critical" && (
                    <AlertTriangle size={14} className="text-red-500 mr-1 animate-pulse" />
                  )}
                  <span className={`text-sm font-bold ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-0.5 rounded mr-2 ${getImportanceColor(item.importance)}`}>
                    {item.importance.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-xs">{formatTime(item.timestamp)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${getCategoryColor(item.category)}`}>#{item.category}</span>
                <div className="flex items-center">
                  <span className="text-gray-400 text-xs mr-1">{item.source}</span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`ml-1 ${theme === "hacker" ? "text-red-500 hover:text-red-400" : "text-blue-400 hover:text-blue-300"}`}
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

