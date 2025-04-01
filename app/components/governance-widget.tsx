"use client"

import { useTheme } from "../contexts/theme-context"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface GovernanceProposal {
  id: string
  protocol: string
  title: string
  description: string
  status: "active" | "passed" | "rejected" | "pending"
  votesFor: number
  votesAgainst: number
  riskLevel: "high" | "medium" | "low" | "none"
  endTime: string
}

const mockProposals: GovernanceProposal[] = [
  {
    id: "prop-001",
    protocol: "Uniswap",
    title: "UIP-42: Deploy Uniswap v4 on zkSync Era",
    description: "Proposal to deploy Uniswap v4 on zkSync Era with fee structure adjustments.",
    status: "active",
    votesFor: 45000000,
    votesAgainst: 12000000,
    riskLevel: "low",
    endTime: "2025-04-02T15:00:00Z",
  },
  {
    id: "prop-002",
    protocol: "Aave",
    title: "AIP-89: Adjust Risk Parameters for ETH and stETH",
    description: "Proposal to adjust liquidation thresholds and LTVs for ETH and stETH markets.",
    status: "active",
    votesFor: 320000,
    votesAgainst: 180000,
    riskLevel: "medium",
    endTime: "2025-04-01T12:00:00Z",
  },
  {
    id: "prop-003",
    protocol: "Compound",
    title: "Proposal 135: Add Support for ARB as Collateral",
    description: "Add support for ARB as collateral with initial parameters.",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
    riskLevel: "high",
    endTime: "2025-04-05T18:00:00Z",
  },
  {
    id: "prop-004",
    protocol: "MakerDAO",
    title: "Executive Vote: Multiple Parameter Updates",
    description: "Updates to stability fees, debt ceilings, and liquidation ratios across multiple vaults.",
    status: "passed",
    votesFor: 65000,
    votesAgainst: 12000,
    riskLevel: "medium",
    endTime: "2025-03-28T09:00:00Z",
  },
]

interface GovernanceWidgetProps {
  onClose?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
  id?: string
  onDragStart?: () => void
  onDragEnd?: (x: number, y: number) => void
  onResize?: (width: number, height: number) => void
}

export function GovernanceWidget({
  onClose,
  onMaximize,
  isMaximized,
  id,
  onDragStart,
  onDragEnd,
  onResize,
}: GovernanceWidgetProps) {
  const { theme } = useTheme()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return theme === "hacker" ? "text-green-500 bg-green-900/20" : "text-green-400 bg-green-900/30"
      case "passed":
        return theme === "hacker" ? "text-blue-500 bg-blue-900/20" : "text-blue-400 bg-blue-900/30"
      case "rejected":
        return theme === "hacker" ? "text-red-500 bg-red-900/20" : "text-red-400 bg-red-900/30"
      case "pending":
        return theme === "hacker" ? "text-yellow-500 bg-yellow-900/20" : "text-yellow-400 bg-yellow-900/30"
      default:
        return "text-gray-400 bg-gray-800"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high":
        return <AlertTriangle size={14} className={theme === "hacker" ? "text-red-500" : "text-red-400"} />
      case "medium":
        return <AlertTriangle size={14} className={theme === "hacker" ? "text-yellow-500" : "text-yellow-400"} />
      case "low":
        return <CheckCircle size={14} className={theme === "hacker" ? "text-green-500" : "text-green-400"} />
      default:
        return <CheckCircle size={14} className="text-gray-400" />
    }
  }

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime)
    const now = new Date()
    const diff = end.getTime() - now.getTime()

    if (diff < 0) return "Ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) {
      return `${days}d ${hours}h`
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours}h ${minutes}m`
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="p-2 space-y-2">
          {mockProposals.map((proposal) => (
            <div key={proposal.id} className="border border-gray-800 p-2 rounded">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className={`${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
                    {proposal.protocol}
                  </span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded uppercase ${getStatusColor(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>
                <div className="flex items-center">
                  {getRiskIcon(proposal.riskLevel)}
                  <span className="text-gray-400 text-xs ml-1">Risk: {proposal.riskLevel}</span>
                </div>
              </div>

              <div className="mt-1">
                <div className="text-sm text-gray-300 font-medium">{proposal.title}</div>
                <div className="text-xs text-gray-500 line-clamp-1">{proposal.description}</div>
              </div>

              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>For: {(proposal.votesFor / 1000000).toFixed(2)}M</span>
                  <span>Against: {(proposal.votesAgainst / 1000000).toFixed(2)}M</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  {proposal.votesFor + proposal.votesAgainst > 0 && (
                    <div
                      className={theme === "hacker" ? "bg-green-500" : "bg-blue-500"}
                      style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                    />
                  )}
                </div>
              </div>

              <div className="mt-2 flex justify-end items-center">
                <Clock size={14} className="text-gray-500 mr-1" />
                <span className="text-gray-400 text-xs">{formatTimeRemaining(proposal.endTime)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

