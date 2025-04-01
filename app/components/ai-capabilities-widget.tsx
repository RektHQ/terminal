"use client"

import { useTheme } from "../contexts/theme-context"
import { DashboardWidget } from "./dashboard-widget"
import { Brain, Shield, Lock, Database, Zap, Network } from "lucide-react"

interface AICapabilitiesWidgetProps {
  onClose?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
  id?: string
  onDragStart?: () => void
  onDragEnd?: (x: number, y: number) => void
  onResize?: (width: number, height: number) => void
}

export function AICapabilitiesWidget({
  onClose,
  onMaximize,
  isMaximized,
  id,
  onDragStart,
  onDragEnd,
  onResize,
}: AICapabilitiesWidgetProps) {
  const { theme } = useTheme()

  const capabilities = [
    {
      name: "Zero-Knowledge Proofs",
      icon: Shield,
      description: "Privacy-preserving verification of on-chain activity without revealing sensitive data",
      color: theme === "hacker" ? "text-green-500" : "text-green-400",
      bgColor: theme === "hacker" ? "bg-green-900/20" : "bg-green-900/30",
    },
    {
      name: "Fully Homomorphic Encryption",
      icon: Lock,
      description: "Secure computation on encrypted data for confidential contract analysis",
      color: theme === "hacker" ? "text-blue-500" : "text-blue-400",
      bgColor: theme === "hacker" ? "bg-blue-900/20" : "bg-blue-900/30",
    },
    {
      name: "Multi-Party Computation",
      icon: Network,
      description: "Distributed security analysis across trusted nodes without exposing inputs",
      color: theme === "hacker" ? "text-purple-500" : "text-purple-400",
      bgColor: theme === "hacker" ? "bg-purple-900/20" : "bg-purple-900/30",
    },
    {
      name: "On-Chain Intelligence",
      icon: Database,
      description: "Real-time monitoring of blockchain activity with anomaly detection",
      color: theme === "hacker" ? "text-yellow-500" : "text-yellow-400",
      bgColor: theme === "hacker" ? "bg-yellow-900/20" : "bg-yellow-900/30",
    },
    {
      name: "AI Risk Modeling",
      icon: Brain,
      description: "Predictive analytics for protocol risk assessment and vulnerability detection",
      color: theme === "hacker" ? "text-red-500" : "text-red-400",
      bgColor: theme === "hacker" ? "bg-red-900/20" : "bg-red-900/30",
    },
    {
      name: "Real-Time Alerts",
      icon: Zap,
      description: "Instant notifications for security incidents and suspicious activity",
      color: theme === "hacker" ? "text-orange-500" : "text-orange-400",
      bgColor: theme === "hacker" ? "bg-orange-900/20" : "bg-orange-900/30",
    },
  ]

  return (
    <DashboardWidget
      title="SECURITY & AI CAPABILITIES"
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      id={id}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onResize={onResize}
    >
      <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {capabilities.map((capability) => (
          <div key={capability.name} className={`p-3 rounded-md border border-gray-800 ${capability.bgColor}`}>
            <div className="flex items-center mb-2">
              <capability.icon className={`${capability.color} mr-2`} size={18} />
              <h3 className={`${capability.color} font-bold`}>{capability.name}</h3>
            </div>
            <p className="text-sm text-gray-400">{capability.description}</p>
          </div>
        ))}
      </div>
      <div className="p-3 text-center">
        <p className="text-xs text-gray-500">
          Powered by Stake Capital Group's security infrastructure • Protecting over $5B in TVL
        </p>
      </div>
    </DashboardWidget>
  )
}

