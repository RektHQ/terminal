"use client"

import { useTheme } from "../contexts/theme-context"
import { DashboardWidget } from "./dashboard-widget"

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
}

export function GovernanceWidget({ onClose, onMaximize, isMaximized }: GovernanceWidgetProps) {
  const { theme } = useTheme()

  const getStatusColor = (status: string) => {
    if (theme === "bw") {
      // In black and white mode, use only grayscale
      switch (status) {
        case "active":
          return "text-white bg-white/20"
        case "passed":
          return "text-white bg-white/15"
        case "rejected":
          return "text-white bg-white/10"
        case "pending":
          return "text-white bg-white/5"
        default:
          return "text-gray-400 bg-gray-800"
      }
    } else {
      // In other themes, use colors
      switch (status) {
        case "active":
          return "text-green-500 bg-green-900/20"
        case "passed":
          return "text-blue-500 bg-blue-900/20"
        case "rejected":
          return "text-red-500 bg-red-900/20"
        case "pending":
          return "text-yellow-500 bg-yellow-900/20"
        default:
          return "text-gray-400 bg-gray-800"
      }
    }
  }

  return (
    <DashboardWidget title="GOVERNANCE" onClose={onClose} onMaximize={onMaximize} isMaximized={isMaximized}>
      <div className="p-2 space-y-2">
        {mockProposals.map((proposal) => (
          <div key={proposal.id} className="border border-gray-800 p-2 rounded">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <span className="text-white font-bold">{proposal.protocol}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded uppercase ${getStatusColor(proposal.status)}`}>
                  {proposal.status}
                </span>
              </div>
            </div>

            <div className="mt-1">
              <div className="text-sm text-gray-300 font-medium">{proposal.title}</div>
            </div>

            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>For: {(proposal.votesFor / 1000000).toFixed(2)}M</span>
                <span>Against: {(proposal.votesAgainst / 1000000).toFixed(2)}M</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                {proposal.votesFor + proposal.votesAgainst > 0 && (
                  <div
                    className="bg-green-500"
                    style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  )
}

