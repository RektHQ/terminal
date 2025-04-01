"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import type { HackBounty, AuditBounty } from "../types/bounty"
import { AlertTriangle, ExternalLink, DollarSign } from "lucide-react"

interface BountiesDisplayProps {
  hackBounties: HackBounty[]
  auditBounties: AuditBounty[]
}

export function BountiesDisplay({ hackBounties, auditBounties }: BountiesDisplayProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<"hack" | "audit">("hack")
  const [expandedBounty, setExpandedBounty] = useState<string | null>(null)

  const toggleBounty = (id: string) => {
    if (expandedBounty === id) {
      setExpandedBounty(null)
    } else {
      setExpandedBounty(id)
    }
  }

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"
  const subheaderClass = theme === "hacker" ? "terminal-text-blue" : "text-gray-300"
  const activeTabClass =
    theme === "hacker" ? "bg-red-900/30 text-red-400 border-red-500" : "bg-gray-800 text-white border-white"
  const inactiveTabClass =
    theme === "hacker"
      ? "bg-transparent text-green-500 hover:bg-red-900/10 border-transparent"
      : "bg-transparent text-gray-400 hover:bg-gray-800 border-transparent"

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <h3 className={`${headerClass} text-lg font-bold mb-4`}>DeFi Bounties</h3>

      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`px-4 py-2 border-b-2 -mb-px ${activeTab === "hack" ? activeTabClass : inactiveTabClass}`}
          onClick={() => setActiveTab("hack")}
        >
          <div className="flex items-center">
            <AlertTriangle size={16} className="mr-2" />
            Hack Recovery Bounties
          </div>
        </button>
        <button
          className={`px-4 py-2 border-b-2 -mb-px ${activeTab === "audit" ? activeTabClass : inactiveTabClass}`}
          onClick={() => setActiveTab("audit")}
        >
          <div className="flex items-center">
            <DollarSign size={16} className="mr-2" />
            Audit Bounties
          </div>
        </button>
      </div>

      {activeTab === "hack" ? (
        <div className="space-y-4">
          {hackBounties.map((bounty) => (
            <div
              key={bounty.id}
              className={`p-3 border ${borderClass} ${bounty.status === "expired" ? "opacity-60" : ""}`}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleBounty(bounty.id)}>
                <div>
                  <div className={`${headerClass} font-bold`}>{bounty.protocol}</div>
                  <div className="text-sm text-gray-400">{bounty.incident}</div>
                </div>
                <div className="text-right">
                  <div className={theme === "hacker" ? "terminal-text-yellow" : "text-white"}>
                    ${bounty.amount.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs ${
                      bounty.status === "active"
                        ? theme === "hacker"
                          ? "text-green-500"
                          : "text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    {bounty.status.toUpperCase()}
                  </div>
                </div>
              </div>

              {expandedBounty === bounty.id && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-gray-500 text-xs">INCIDENT DATE</div>
                      <div className={textClass}>{bounty.date}</div>
                    </div>
                    {bounty.deadline && (
                      <div>
                        <div className="text-gray-500 text-xs">DEADLINE</div>
                        <div className={textClass}>{bounty.deadline}</div>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="text-gray-500 text-xs">CONTACT</div>
                    <div className={textClass}>{bounty.contactInfo}</div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs">DETAILS</div>
                    <div className="text-gray-400">{bounty.details}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {auditBounties.map((bounty) => (
            <div
              key={bounty.id}
              className={`p-3 border ${borderClass} ${bounty.status === "ended" ? "opacity-60" : ""}`}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleBounty(bounty.id)}>
                <div>
                  <div className={`${headerClass} font-bold`}>{bounty.protocol}</div>
                  <div className="text-sm text-gray-400">{bounty.platform}</div>
                </div>
                <div className="text-right">
                  <div className={theme === "hacker" ? "terminal-text-yellow" : "text-white"}>
                    ${bounty.amount.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs ${
                      bounty.status === "active"
                        ? theme === "hacker"
                          ? "text-green-500"
                          : "text-green-400"
                        : bounty.status === "upcoming"
                          ? theme === "hacker"
                            ? "text-blue-500"
                            : "text-blue-400"
                          : "text-gray-500"
                    }`}
                  >
                    {bounty.status.toUpperCase()}
                  </div>
                </div>
              </div>

              {expandedBounty === bounty.id && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-gray-500 text-xs">START DATE</div>
                      <div className={textClass}>{bounty.startDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">END DATE</div>
                      <div className={textClass}>{bounty.endDate}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-gray-500 text-xs">DETAILS</div>
                    <div className="text-gray-400">{bounty.details}</div>
                  </div>

                  <div className="mb-3">
                    <div className="text-gray-500 text-xs">TAGS</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {bounty.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`text-xs px-2 py-1 rounded ${
                            theme === "hacker" ? "bg-green-900/20 text-green-500" : "bg-gray-800 text-gray-300"
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <a
                      href={bounty.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center ${
                        theme === "hacker" ? "text-red-500 hover:text-red-400" : "text-white hover:text-gray-300"
                      }`}
                    >
                      <ExternalLink size={14} className="mr-1" />
                      View on {bounty.platform}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}. Bounty amounts and availability subject to change.
        </p>
      </div>
    </div>
  )
}

