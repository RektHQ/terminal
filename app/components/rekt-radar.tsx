"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { AlertTriangle, Skull, TrendingDown, Shield, Eye, FileWarning, MessageSquare, BarChart3 } from "lucide-react"

interface Protocol {
  name: string
  symbol: string
  riskScore: number
  redFlags: string[]
  wouldYouTouchScore: number
  recentActivity: string
  sentiment: "bearish" | "neutral" | "bullish"
  rektTake: string
  tvl: number
  tvlChange: number
}

interface ExploitVictim {
  protocol: string
  date: string
  amount: number
  type: string
  status: "ongoing" | "confirmed" | "suspected"
  rektTake: string
  riskFactors: string[]
  tvl: number
  tvlImpact: number
  recoveryChance: "Low" | "Medium" | "High"
  similarExploits: number
}

interface RugAlert {
  protocol: string
  signal: "high" | "medium" | "low"
  evidence: string[]
  timeframe: string
}

const mockProtocols: Protocol[] = [
  {
    name: "Hyperliquid",
    symbol: "HYP",
    riskScore: 78,
    redFlags: ["Oracle dependencies", "Concentrated governance", "Complex liquidation logic"],
    wouldYouTouchScore: 4,
    recentActivity: "Major governance proposal to change oracle sources",
    sentiment: "bearish",
    rektTake:
      "Hyperliquid's oracle dependency creates a single point of failure that's just waiting to be exploited. Their recent governance proposal is putting lipstick on a pig.",
    tvl: 450000000,
    tvlChange: -5.2,
  },
  {
    name: "Morpho",
    symbol: "MORPHO",
    riskScore: 42,
    redFlags: ["Upgradeability risk"],
    wouldYouTouchScore: 7,
    recentActivity: "Increased lending volumes across multiple markets",
    sentiment: "bullish",
    rektTake:
      "Morpho's architecture is solid, but their upgradeability pattern gives too much power to a small group. One rogue dev could turn this into a nightmare.",
    tvl: 780000000,
    tvlChange: 12.5,
  },
  {
    name: "Symbiotic",
    symbol: "SYM",
    riskScore: 63,
    redFlags: ["Cross-chain messaging risks", "Unaudited components"],
    wouldYouTouchScore: 5,
    recentActivity: "Deployed on two new chains with minimal security review",
    sentiment: "neutral",
    rektTake:
      "Symbiotic is expanding too fast for their security to keep up. Their cross-chain architecture is clever, but one bug in their messaging layer and it's game over.",
    tvl: 320000000,
    tvlChange: 8.7,
  },
  {
    name: "Mellow Finance",
    symbol: "MELL",
    riskScore: 81,
    redFlags: ["Anonymous team", "Complex vault strategies", "Minimal auditing"],
    wouldYouTouchScore: 3,
    recentActivity: "Launched high-yield vault with 300% APY claims",
    sentiment: "bearish",
    rektTake:
      "300% APY and an anonymous team? We've seen this movie before, and it ends with a 'we've been exploited' tweet and vanishing founders.",
    tvl: 95000000,
    tvlChange: 45.3,
  },
  {
    name: "Stake Capital DAO",
    symbol: "SCT",
    riskScore: 35,
    redFlags: [],
    wouldYouTouchScore: 8,
    recentActivity: "Implemented additional security measures after community audit",
    sentiment: "bullish",
    rektTake:
      "One of the few projects taking security seriously. Their recent upgrades show they're learning from others' mistakes instead of making their own.",
    tvl: 550000000,
    tvlChange: 3.2,
  },
]

const mockExploitVictims: ExploitVictim[] = [
  {
    protocol: "FlashLender Protocol",
    date: "2025-03-29",
    amount: 18500000,
    type: "Flash loan attack",
    status: "ongoing",
    rektTake:
      "Another day, another DeFi protocol that didn't understand how their own code works. The attacker is currently draining funds while the team 'investigates'.",
    riskFactors: ["No circuit breaker", "Unaudited code", "Complex flash loan logic"],
    tvl: 65000000,
    tvlImpact: 28.5,
    recoveryChance: "Low",
    similarExploits: 7,
  },
  {
    protocol: "YieldBooster",
    date: "2025-03-27",
    amount: 7200000,
    type: "Oracle manipulation",
    status: "confirmed",
    rektTake:
      "YieldBooster's team was warned about their oracle vulnerability three months ago on their forum. They ignored it. Now they're paying the price.",
    riskFactors: ["Single oracle dependency", "Ignored security warnings", "No price deviation checks"],
    tvl: 42000000,
    tvlImpact: 17.1,
    recoveryChance: "Medium",
    similarExploits: 12,
  },
  {
    protocol: "MetaVault",
    date: "2025-03-25",
    amount: 4500000,
    type: "Access control failure",
    status: "confirmed",
    rektTake:
      "Rookie mistake. Their admin function had no access control. It's like leaving your front door wide open with a sign saying 'valuables inside'.",
    riskFactors: ["Missing access controls", "No multi-sig", "Inadequate testing"],
    tvl: 28000000,
    tvlImpact: 16.1,
    recoveryChance: "High",
    similarExploits: 23,
  },
]

const mockRugAlerts: RugAlert[] = [
  {
    protocol: "MoonYield Finance",
    signal: "high",
    evidence: [
      "Team wallets moving tokens to exchanges",
      "Delayed audit reports",
      "Suspicious governance proposal to unlock team tokens early",
    ],
    timeframe: "Imminent (24-48 hours)",
  },
  {
    protocol: "AlphaDAO",
    signal: "medium",
    evidence: [
      "Social media accounts inactive for 7+ days",
      "Major token unlock in 3 days",
      "Developer GitHub commits stopped",
    ],
    timeframe: "Watch closely (3-7 days)",
  },
  {
    protocol: "Quantum Finance",
    signal: "low",
    evidence: ["Unusual token movements between team wallets", "Delayed roadmap deliverables"],
    timeframe: "Monitor (1-2 weeks)",
  },
]

export function RektRadar() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState<"protocols" | "shameboard" | "rugalerts">("shameboard")

  const getRiskColor = (score: number) => {
    if (theme === "hacker") {
      if (score >= 70) {
        return "text-red-500"
      } else if (score >= 50) {
        return "text-yellow-500"
      } else {
        return "text-green-500"
      }
    } else {
      // In rekt theme, use only black and white
      if (score >= 70) {
        return "text-white font-bold"
      } else if (score >= 50) {
        return "text-gray-300"
      } else {
        return "text-gray-400"
      }
    }
  }

  const getWouldYouTouchColor = (score: number) => {
    if (theme === "hacker") {
      if (score <= 3) {
        return "text-red-500"
      } else if (score <= 6) {
        return "text-yellow-500"
      } else {
        return "text-green-500"
      }
    } else {
      // In rekt theme, use only black and white
      if (score <= 3) {
        return "text-white font-bold"
      } else if (score <= 6) {
        return "text-gray-300"
      } else {
        return "text-gray-400"
      }
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    if (theme === "hacker") {
      switch (sentiment) {
        case "bearish":
          return <TrendingDown size={16} className="text-red-500" />
        case "bullish":
          return <TrendingDown size={16} className="text-green-500" transform="rotate(180)" />
        default:
          return <TrendingDown size={16} className="text-gray-400" transform="rotate(90)" />
      }
    } else {
      // In rekt theme, use only black and white
      switch (sentiment) {
        case "bearish":
          return <TrendingDown size={16} className="text-white" />
        case "bullish":
          return <TrendingDown size={16} className="text-white" transform="rotate(180)" />
        default:
          return <TrendingDown size={16} className="text-gray-400" transform="rotate(90)" />
      }
    }
  }

  const formatMoney = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else {
      return `$${amount.toLocaleString()}`
    }
  }

  return (
    <div className="h-full overflow-auto bg-black text-white">
      <div className="sticky top-0 z-10 bg-black p-2 border-b border-gray-800 flex space-x-2">
        <button
          className={`px-3 py-1 rounded text-xs flex items-center ${
            activeSection === "shameboard"
              ? theme === "hacker"
                ? "bg-red-900/30 text-red-500"
                : "bg-gray-800 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveSection("shameboard")}
        >
          <Skull size={14} className="mr-1" />
          SHAMEBOARD
        </button>
        <button
          className={`px-3 py-1 rounded text-xs flex items-center ${
            activeSection === "protocols"
              ? theme === "hacker"
                ? "bg-green-900/30 text-green-500"
                : "bg-gray-800 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveSection("protocols")}
        >
          <Shield size={14} className="mr-1" />
          PROTOCOL RISK
        </button>
        <button
          className={`px-3 py-1 rounded text-xs flex items-center ${
            activeSection === "rugalerts"
              ? theme === "hacker"
                ? "bg-yellow-900/30 text-yellow-500"
                : "bg-gray-800 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveSection("rugalerts")}
        >
          <AlertTriangle size={14} className="mr-1" />
          RUG ALERTS
        </button>
      </div>

      <div className="p-4">
        {activeSection === "shameboard" && (
          <>
            <div className="flex items-center mb-4">
              <Skull size={18} className={theme === "hacker" ? "text-red-500 mr-2" : "text-white mr-2"} />
              <h2 className={`text-base font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                RECENT EXPLOIT VICTIMS
              </h2>
            </div>

            <div className="space-y-4">
              {mockExploitVictims.map((victim, index) => (
                <div key={index} className="border border-gray-800 rounded-md p-4 bg-black/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-xl font-bold ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                        {victim.protocol}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span
                          className={`px-2 py-0.5 rounded text-xs uppercase ${
                            victim.status === "ongoing"
                              ? theme === "hacker"
                                ? "bg-red-900/30 text-red-500"
                                : "bg-gray-900 text-red-400"
                              : "bg-gray-900 text-gray-400"
                          }`}
                        >
                          {victim.status}
                        </span>
                        <span className="text-gray-400 text-xs ml-2">{victim.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${theme === "hacker" ? "text-red-500" : "text-red-400"}`}>
                        {formatMoney(victim.amount)}
                      </div>
                      <div className="text-gray-400 text-xs">{victim.type}</div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">RISK FACTORS:</div>
                      <div className="flex flex-wrap gap-1">
                        {victim.riskFactors.map((factor, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md text-xs bg-gray-900 text-gray-300">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">TVL IMPACT:</div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-800 rounded-full h-1.5 mr-2">
                          <div
                            className={`${theme === "hacker" ? "bg-red-500" : "bg-white"} h-1.5 rounded-full`}
                            style={{ width: `${victim.tvlImpact}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                          {victim.tvlImpact}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {formatMoney(victim.amount)} of {formatMoney(victim.tvl)} TVL
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">RECOVERY CHANCE:</div>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-1 ${
                            victim.recoveryChance === "Low"
                              ? "bg-red-500"
                              : victim.recoveryChance === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        ></div>
                        <span className={`text-xs ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                          {victim.recoveryChance} ({victim.similarExploits} similar cases)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-gray-800 pt-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <MessageSquare
                          size={14}
                          className={theme === "hacker" ? "text-red-500 mr-2" : "text-gray-400 mr-2"}
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">REKT TAKE:</div>
                        <div className={`${theme === "hacker" ? "text-green-500" : "text-white"} text-sm italic`}>
                          "{victim.rektTake}"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-800 pt-4">
              <div className="flex items-center mb-4">
                <BarChart3 size={18} className={theme === "hacker" ? "text-yellow-500 mr-2" : "text-gray-300 mr-2"} />
                <h2 className={`text-base font-bold ${theme === "hacker" ? "text-yellow-500" : "text-white"}`}>
                  EXPLOIT BREAKDOWN
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-800 rounded-md p-4 bg-black/30">
                  <h3 className="text-xs text-gray-400 mb-2">EXPLOIT TYPES (LAST 30 DAYS)</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme === "hacker" ? "text-green-500" : "text-white"}>Flash Loan Attacks</span>
                        <span className="text-gray-400">42%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`${theme === "hacker" ? "bg-red-500" : "bg-white"} h-1.5 rounded-full`}
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme === "hacker" ? "text-green-500" : "text-white"}>
                          Oracle Manipulation
                        </span>
                        <span className="text-gray-400">27%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`${theme === "hacker" ? "bg-red-500" : "bg-white"} h-1.5 rounded-full`}
                          style={{ width: "27%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme === "hacker" ? "text-green-500" : "text-white"}>
                          Access Control Failures
                        </span>
                        <span className="text-gray-400">15%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`${theme === "hacker" ? "bg-red-500" : "bg-white"} h-1.5 rounded-full`}
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme === "hacker" ? "text-green-500" : "text-white"}>Reentrancy</span>
                        <span className="text-gray-400">10%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`${theme === "hacker" ? "bg-red-500" : "bg-white"} h-1.5 rounded-full`}
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme === "hacker" ? "text-green-500" : "text-white"}>Other</span>
                        <span className="text-gray-400">6%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`${theme === "hacker" ? "bg-red-500" : "bg-white"} h-1.5 rounded-full`}
                          style={{ width: "6%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-800 rounded-md p-4 bg-black/30">
                  <h3 className="text-xs text-gray-400 mb-2">FUNDS LOST (LAST 30 DAYS)</h3>
                  <div className="text-2xl font-bold mb-2 flex items-baseline">
                    <span className={theme === "hacker" ? "text-red-500" : "text-white"}>$142.7M</span>
                    <span className="text-xs text-gray-400 ml-2">+23% from previous month</span>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme === "hacker" ? "text-green-500" : "text-white"}>Recovered</span>
                        <span className="text-gray-400">$18.2M (12.8%)</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`${theme === "hacker" ? "bg-green-500" : "bg-white"} h-1.5 rounded-full`}
                          style={{ width: "12.8%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme === "hacker" ? "text-green-500" : "text-white"}>Frozen on CEXs</span>
                        <span className="text-gray-400">$31.4M (22%)</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`${theme === "hacker" ? "bg-yellow-500" : "bg-gray-300"} h-1.5 rounded-full`}
                          style={{ width: "22%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={theme === "hacker" ? "text-green-500" : "text-white"}>Lost</span>
                        <span className="text-gray-400">$93.1M (65.2%)</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`${theme === "hacker" ? "bg-red-500" : "bg-white"} h-1.5 rounded-full`}
                          style={{ width: "65.2%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === "protocols" && (
          <>
            <div className="flex items-center mb-4">
              <Shield size={18} className={theme === "hacker" ? "text-green-500 mr-2" : "text-white mr-2"} />
              <h2 className={`text-base font-bold ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                PROTOCOL RISK RADAR
              </h2>
            </div>

            <div className="space-y-4">
              {mockProtocols.map((protocol, index) => (
                <div key={index} className="border border-gray-800 rounded-md p-4 bg-black/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className={`text-xl font-bold ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                          {protocol.name}
                        </h3>
                        <span className="ml-2 text-gray-400 text-xs">({protocol.symbol})</span>
                      </div>

                      <div className="flex items-center mt-2 space-x-4">
                        <div>
                          <div className="text-xs text-gray-400">RISK SCORE</div>
                          <div className={`text-sm font-bold ${getRiskColor(protocol.riskScore)}`}>
                            {protocol.riskScore}/100
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">WOULD YOU TOUCH?</div>
                          <div className={`text-sm font-bold ${getWouldYouTouchColor(protocol.wouldYouTouchScore)}`}>
                            {protocol.wouldYouTouchScore}/10
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">SENTIMENT</div>
                          <div className="flex items-center text-sm">
                            {getSentimentIcon(protocol.sentiment)}
                            <span className="ml-1 capitalize">{protocol.sentiment}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-400">TVL</div>
                      <div className={`text-base font-bold ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                        {formatMoney(protocol.tvl)}
                      </div>
                      <div
                        className={`text-xs ${
                          protocol.tvlChange >= 0
                            ? theme === "hacker"
                              ? "text-green-500"
                              : "text-white"
                            : theme === "hacker"
                              ? "text-red-500"
                              : "text-gray-300"
                        }`}
                      >
                        {protocol.tvlChange >= 0 ? "+" : ""}
                        {protocol.tvlChange}%
                      </div>
                    </div>
                  </div>

                  {protocol.redFlags.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-400 mb-1">RED FLAGS:</div>
                      <div className="flex flex-wrap gap-1">
                        {protocol.redFlags.map((flag, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md text-xs bg-gray-900 text-gray-300">
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3">
                    <div className="text-xs text-gray-400 mb-1">RECENT ACTIVITY:</div>
                    <div className="text-xs text-gray-300">{protocol.recentActivity}</div>
                  </div>

                  <div className="mt-3 border-t border-gray-800 pt-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <MessageSquare
                          size={14}
                          className={theme === "hacker" ? "text-red-500 mr-2" : "text-gray-400 mr-2"}
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">REKT TAKE:</div>
                        <div className={`${theme === "hacker" ? "text-green-500" : "text-white"} text-sm italic`}>
                          "{protocol.rektTake}"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === "rugalerts" && (
          <>
            <div className="flex items-center mb-4">
              <AlertTriangle size={18} className={theme === "hacker" ? "text-yellow-500 mr-2" : "text-gray-300 mr-2"} />
              <h2 className={`text-base font-bold ${theme === "hacker" ? "text-yellow-500" : "text-white"}`}>
                RUG ALERT SYSTEM
              </h2>
            </div>

            <div className="space-y-4">
              {mockRugAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`border rounded-md p-4 bg-black/30 ${
                    alert.signal === "high"
                      ? theme === "hacker"
                        ? "border-red-500"
                        : "border-gray-500"
                      : alert.signal === "medium"
                        ? "border-gray-600"
                        : "border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className={`text-xl font-bold ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                          {alert.protocol}
                        </h3>
                        <span
                          className={`ml-2 px-2 py-0.5 rounded text-xs uppercase ${
                            alert.signal === "high"
                              ? theme === "hacker"
                                ? "bg-red-900/30 text-red-500"
                                : "bg-gray-900 text-red-400"
                              : alert.signal === "medium"
                                ? "bg-gray-900 text-gray-300"
                                : "bg-gray-900 text-gray-400"
                          }`}
                        >
                          {alert.signal} risk
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-400">TIMEFRAME</div>
                      <div
                        className={`text-xs ${
                          alert.signal === "high"
                            ? theme === "hacker"
                              ? "text-red-500"
                              : "text-red-400"
                            : alert.signal === "medium"
                              ? theme === "hacker"
                                ? "text-yellow-500"
                                : "text-gray-300"
                              : theme === "hacker"
                                ? "text-blue-500"
                                : "text-gray-400"
                        }`}
                      >
                        {alert.timeframe}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs text-gray-400 mb-1">EVIDENCE:</div>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {alert.evidence.map((item, i) => (
                        <li key={i} className="text-xs text-gray-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <button
                      className={`flex items-center text-xs px-2 py-0.5 rounded ${
                        theme === "hacker"
                          ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      <Eye size={10} className="mr-1" />
                      Watch Wallet Activity
                    </button>

                    <button
                      className={`flex items-center text-xs px-2 py-0.5 rounded ${
                        theme === "hacker"
                          ? "bg-red-900/30 text-red-500 hover:bg-red-900/50"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      <FileWarning size={10} className="mr-1" />
                      Submit Evidence
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border border-gray-800 rounded-md p-4 bg-black/30">
              <h3 className={`text-sm font-bold mb-2 ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                COMMON RUG PATTERNS
              </h3>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                    <span className={`text-xs font-medium ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                      Team Token Movements to CEXs
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 ml-3.5">
                    Team wallets moving large amounts of tokens to exchanges before announcements
                  </p>
                </div>

                <div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                    <span className={`text-xs font-medium ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                      Governance Takeovers
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 ml-3.5">
                    Sudden proposals to change multisig signers or treasury control with minimal notice
                  </p>
                </div>

                <div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                    <span className={`text-xs font-medium ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                      Social Media Disappearance
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 ml-3.5">
                    Team stops responding in Discord/Telegram and delays AMAs before major token events
                  </p>
                </div>

                <div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                    <span className={`text-xs font-medium ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                      Liquidity Removal Patterns
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 ml-3.5">
                    Gradual reduction in liquidity before major announcements or token unlocks
                  </p>
                </div>
              </div>

              <div className="mt-3 text-center">
                <button
                  className={`text-xs px-2 py-0.5 rounded ${
                    theme === "hacker"
                      ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  Submit Anonymous Tip
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

