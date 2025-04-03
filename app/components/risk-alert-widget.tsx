"use client"

import { useTheme } from "../contexts/theme-context"
import { AlertTriangle, Shield, TrendingUp } from "lucide-react"
import { DashboardWidget } from "./dashboard-widget"

interface RiskAlert {
  id: string
  protocol: string
  riskLevel: "critical" | "high" | "medium" | "low"
  description: string
  timestamp: string
  category: "exploit" | "governance" | "market" | "regulatory"
}

const mockRiskAlerts: RiskAlert[] = [
  {
    id: "risk-001",
    protocol: "Hyperliquid",
    riskLevel: "critical",
    description: "Unusual liquidation patterns detected. Potential oracle manipulation in progress.",
    timestamp: "2025-03-29T15:23:00Z",
    category: "exploit",
  },
  {
    id: "risk-002",
    protocol: "Morpho DAO",
    riskLevel: "high",
    description: "Controversial governance proposal gaining traction. Could impact protocol security model.",
    timestamp: "2025-03-29T14:15:00Z",
    category: "governance",
  },
  {
    id: "risk-003",
    protocol: "Mellow Finance",
    riskLevel: "medium",
    description: "Unusual token movements from treasury wallet. Monitoring for potential insider selling.",
    timestamp: "2025-03-29T12:45:00Z",
    category: "market",
  },
  {
    id: "risk-004",
    protocol: "Symbiotic",
    riskLevel: "low",
    description: "New regulatory guidance may impact cross-chain messaging implementation.",
    timestamp: "2025-03-29T10:30:00Z",
    category: "regulatory",
  },
]

interface RiskAlertWidgetProps {
  onClose?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
}

export function RiskAlertWidget({ onClose, onMaximize, isMaximized }: RiskAlertWidgetProps) {
  const { theme } = useTheme()

  const getRiskLevelColor = (level: string) => {
    if (theme === "bw") {
      // In black and white mode, use only grayscale
      switch (level) {
        case "critical":
          return "text-white bg-white/20"
        case "high":
          return "text-white bg-white/15"
        case "medium":
          return "text-white bg-white/10"
        case "low":
          return "text-white bg-white/5"
        default:
          return "text-gray-400 bg-gray-800"
      }
    } else {
      // In other themes, use colors
      switch (level) {
        case "critical":
          return "text-red-500 bg-red-900/20"
        case "high":
          return "text-orange-500 bg-orange-900/20"
        case "medium":
          return "text-yellow-500 bg-yellow-900/20"
        case "low":
          return "text-blue-500 bg-blue-900/20"
        default:
          return "text-gray-400 bg-gray-800"
      }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "exploit":
        return <AlertTriangle size={14} className="mr-1" />
      case "governance":
        return <Shield size={14} className="mr-1" />
      case "market":
        return <TrendingUp size={14} className="mr-1" />
      case "regulatory":
        return <Shield size={14} className="mr-1" />
      default:
        return <AlertTriangle size={14} className="mr-1" />
    }
  }

  return (
    <DashboardWidget title="RISK ALERTS" onClose={onClose} onMaximize={onMaximize} isMaximized={isMaximized}>
      <div className="p-2 space-y-2">
        {mockRiskAlerts.map((alert) => (
          <div key={alert.id} className="border border-gray-800 p-2 rounded">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <span
                  className={`text-xs px-2 py-0.5 rounded uppercase font-bold ${getRiskLevelColor(alert.riskLevel)}`}
                >
                  {alert.riskLevel}
                </span>
                <span className={`ml-2 ${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
                  {alert.protocol}
                </span>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-300">{alert.description}</p>
          </div>
        ))}
      </div>
    </DashboardWidget>
  )
}

