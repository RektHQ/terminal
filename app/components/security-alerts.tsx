"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { AlertTriangle, Shield, Clock, ExternalLink, Filter } from "lucide-react"

interface SecurityAlert {
  id: string
  title: string
  protocol: string
  severity: "critical" | "high" | "medium" | "low"
  category: "exploit" | "vulnerability" | "scam" | "rugpull" | "phishing" | "governance"
  status: "active" | "resolved" | "investigating"
  timestamp: string
  description: string
  affectedAddresses?: string[]
  url?: string
}

const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: "alert-001",
    title: "Active Exploit: Flash Loan Attack on DeFi Protocol",
    protocol: "LendingPool Finance",
    severity: "critical",
    category: "exploit",
    status: "active",
    timestamp: "2025-03-30T12:15:00Z",
    description:
      "Ongoing flash loan attack detected. Approximately $18M drained so far. Attacker using multiple routes to launder funds.",
    affectedAddresses: ["0x1234...5678", "0xabcd...ef01"],
    url: "https://rekt.news/example",
  },
  {
    id: "alert-002",
    title: "Critical Vulnerability: Reentrancy in Popular DeFi Protocol",
    protocol: "Yield Optimizer",
    severity: "critical",
    category: "vulnerability",
    status: "active",
    timestamp: "2025-03-30T10:30:00Z",
    description:
      "Critical reentrancy vulnerability discovered in vault contracts. Users advised to withdraw funds immediately.",
    url: "https://medium.com/example",
  },
  {
    id: "alert-003",
    title: "Phishing Campaign Targeting MetaMask Users",
    protocol: "Multiple",
    severity: "high",
    category: "phishing",
    status: "active",
    timestamp: "2025-03-30T09:45:00Z",
    description:
      "Sophisticated phishing campaign using Google Ads to target MetaMask users. Fake websites requesting seed phrases.",
    url: "https://twitter.com/example",
  },
  {
    id: "alert-004",
    title: "Governance Attack: Malicious Proposal Submitted",
    protocol: "Lending DAO",
    severity: "high",
    category: "governance",
    status: "investigating",
    timestamp: "2025-03-30T08:20:00Z",
    description:
      "Potentially malicious governance proposal submitted that would allow draining of treasury funds. Emergency review in progress.",
    url: "https://forum.example.com",
  },
  {
    id: "alert-005",
    title: "Rugpull: New Token Exit Scam",
    protocol: "MoonRocket Token",
    severity: "medium",
    category: "rugpull",
    status: "resolved",
    timestamp: "2025-03-30T07:15:00Z",
    description: "Team has removed liquidity and disappeared. Estimated $2.5M lost. Contract verified as malicious.",
    affectedAddresses: ["0x7890...1234"],
    url: "https://etherscan.io/example",
  },
  {
    id: "alert-006",
    title: "Scam: Fake Airdrop Campaign",
    protocol: "Multiple",
    severity: "medium",
    category: "scam",
    status: "active",
    timestamp: "2025-03-30T06:30:00Z",
    description:
      "Fake airdrop campaign asking users to connect wallets and approve token transfers. Multiple victims reported.",
    url: "https://twitter.com/example2",
  },
  {
    id: "alert-007",
    title: "Exploit: Oracle Manipulation Attack",
    protocol: "Perpetual DEX",
    severity: "high",
    category: "exploit",
    status: "resolved",
    timestamp: "2025-03-29T22:45:00Z",
    description:
      "Oracle manipulation attack resulted in $5M loss. Protocol paused and funds secured. Post-mortem in progress.",
    affectedAddresses: ["0xdef0...9876"],
    url: "https://medium.com/example2",
  },
]

export function SecurityAlerts() {
  const { theme } = useTheme()
  const [filter, setFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredAlerts =
    filter === "all"
      ? mockSecurityAlerts
      : mockSecurityAlerts.filter(
          (alert) => alert.severity === filter || alert.category === filter || alert.status === filter,
        )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return theme === "hacker" ? "text-red-500" : "text-red-400"
      case "investigating":
        return theme === "hacker" ? "text-yellow-500" : "text-yellow-400"
      case "resolved":
        return theme === "hacker" ? "text-green-500" : "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 border-b border-gray-800">
        <div className="flex items-center">
          <button
            className={`px-2 py-1 text-xs rounded mr-2 ${theme === "hacker" ? "bg-red-900/30 text-red-500" : "bg-red-900/30 text-red-400"}`}
          >
            {filteredAlerts.filter((a) => a.status === "active").length} Active Alerts
          </button>
          <button className="text-gray-400 hover:text-gray-300" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={14} />
          </button>
        </div>
        <div className="text-xs text-gray-400">Real-time security monitoring across DeFi</div>
      </div>

      {showFilters && (
        <div className="p-2 bg-gray-900 border-b border-gray-800 flex flex-wrap gap-1">
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
              filter === "exploit"
                ? theme === "hacker"
                  ? "bg-red-900/30 text-red-500"
                  : "bg-red-900/30 text-red-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("exploit")}
          >
            Exploits
          </button>
          <button
            className={`px-2 py-1 text-xs rounded ${
              filter === "vulnerability"
                ? theme === "hacker"
                  ? "bg-orange-900/30 text-orange-500"
                  : "bg-orange-900/30 text-orange-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("vulnerability")}
          >
            Vulnerabilities
          </button>
          <button
            className={`px-2 py-1 text-xs rounded ${
              filter === "active"
                ? theme === "hacker"
                  ? "bg-red-900/30 text-red-500"
                  : "bg-red-900/30 text-red-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`px-2 py-1 text-xs rounded ${
              filter === "resolved"
                ? theme === "hacker"
                  ? "bg-green-900/30 text-green-500"
                  : "bg-green-900/30 text-green-400"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setFilter("resolved")}
          >
            Resolved
          </button>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-gray-800">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 ${alert.status === "active" && alert.severity === "critical" ? "bg-red-900/10" : ""}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {alert.severity === "critical" && alert.status === "active" && (
                    <AlertTriangle size={16} className="text-red-500 mr-2 animate-pulse" />
                  )}
                  {alert.severity !== "critical" && alert.status === "active" && (
                    <AlertTriangle
                      size={16}
                      className={`${theme === "hacker" ? "text-yellow-500" : "text-yellow-400"} mr-2`}
                    />
                  )}
                  {alert.status === "resolved" && (
                    <Shield size={16} className={`${theme === "hacker" ? "text-green-500" : "text-green-400"} mr-2`} />
                  )}
                  <span className={`font-bold ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                    {alert.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-0.5 rounded mr-2 ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className={`text-xs ${getStatusColor(alert.status)}`}>{alert.status.toUpperCase()}</span>
                </div>
              </div>

              <div className="mt-1 flex justify-between">
                <span className={`${theme === "hacker" ? "text-blue-500" : "text-blue-400"}`}>{alert.protocol}</span>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock size={12} className="mr-1" />
                  {formatTime(alert.timestamp)}
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-300">{alert.description}</div>

              {alert.affectedAddresses && alert.affectedAddresses.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-gray-400">Affected addresses: </span>
                  {alert.affectedAddresses.map((address, idx) => (
                    <span key={idx} className="text-xs font-mono text-gray-500">
                      {address}
                      {idx < alert.affectedAddresses!.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}

              {alert.url && (
                <div className="mt-2">
                  <a
                    href={alert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center text-xs ${theme === "hacker" ? "text-red-500 hover:text-red-400" : "text-blue-400 hover:text-blue-300"}`}
                  >
                    <ExternalLink size={12} className="mr-1" />
                    More details
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

