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
  id?: string
  onDragStart?: () => void
  onDragEnd?: (x: number, y: number) => void
  onResize?: (width: number, height: number) => void
}

export function RiskAlertWidget({
  onClose,
  onMaximize,
  isMaximized,
  id,
  onDragStart,
  onDragEnd,
  onResize,
}: RiskAlertWidgetProps) {
  const { theme } = useTheme()

  const getRiskLevelColor = (level: string) => {
    switch (level) {
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

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  return (
    <DashboardWidget
      title="RISK ALERTS"
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      id={id}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onResize={onResize}
    >
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
              <span className="text-gray-500 text-xs">{formatTime(alert.timestamp)}</span>
            </div>
            <p className="mt-1 text-sm text-gray-300">{alert.description}</p>
            <div className="mt-1 flex items-center text-xs text-gray-400">
              {getCategoryIcon(alert.category)}
              <span className="uppercase">{alert.category}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  )
}

