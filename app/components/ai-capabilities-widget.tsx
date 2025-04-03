"use client"

import { useTheme } from "../contexts/theme-context"
import { DashboardWidget } from "./dashboard-widget"
import { Shield, Lock, Network } from "lucide-react"

interface AICapabilitiesWidgetProps {
  onClose?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
}

export function AICapabilitiesWidget({ onClose, onMaximize, isMaximized }: AICapabilitiesWidgetProps) {
  const { theme } = useTheme()

  const capabilities = [
    {
      name: "Zero-Knowledge Proofs",
      icon: Shield,
      description: "Privacy-preserving verification of on-chain activity without revealing sensitive data",
      color: theme === "bw" ? "text-white" : "text-green-500",
      bgColor: theme === "bw" ? "bg-white/10" : "bg-green-900/20",
    },
    {
      name: "Fully Homomorphic Encryption",
      icon: Lock,
      description: "Secure computation on encrypted data for confidential contract analysis",
      color: theme === "bw" ? "text-white" : "text-blue-500",
      bgColor: theme === "bw" ? "bg-white/10" : "bg-blue-900/20",
    },
    {
      name: "Multi-Party Computation",
      icon: Network,
      description: "Distributed security analysis across trusted nodes without exposing inputs",
      color: theme === "bw" ? "text-white" : "text-purple-500",
      bgColor: theme === "bw" ? "bg-white/10" : "bg-purple-900/20",
    },
  ]

  return (
    <DashboardWidget
      title="SECURITY & AI CAPABILITIES"
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
    >
      <div className="p-3 grid grid-cols-3 gap-3">
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
    </DashboardWidget>
  )
}

