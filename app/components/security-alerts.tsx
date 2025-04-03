"use client"

import { useTheme } from "../contexts/theme-context"
import { AlertTriangle, Shield, ShieldAlert } from "lucide-react"

export function SecurityAlerts() {
  const { theme } = useTheme()

  const alerts = [
    {
      severity: "critical",
      protocol: "Aave",
      message: "Unusual price oracle activity detected",
      time: "10 min ago",
    },
    {
      severity: "high",
      protocol: "Uniswap",
      message: "Large liquidity removal from ETH/USDC pool",
      time: "25 min ago",
    },
    {
      severity: "medium",
      protocol: "Compound",
      message: "Governance proposal with unusual parameters",
      time: "1 hour ago",
    },
  ]

  return (
    <div className="p-2 h-full bg-black text-white">
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-2 border rounded flex items-start ${
              theme === "bw"
                ? "border-white/30 bg-white/10"
                : alert.severity === "critical"
                  ? "border-red-500 bg-red-900/20"
                  : alert.severity === "high"
                    ? "border-orange-500 bg-orange-900/20"
                    : "border-yellow-500 bg-yellow-900/20"
            }`}
          >
            <div className="mr-2 mt-1">
              {theme === "bw" ? (
                alert.severity === "critical" ? (
                  <ShieldAlert size={16} className="text-white" />
                ) : alert.severity === "high" ? (
                  <AlertTriangle size={16} className="text-white" />
                ) : (
                  <Shield size={16} className="text-white" />
                )
              ) : alert.severity === "critical" ? (
                <ShieldAlert size={16} className="text-red-500" />
              ) : alert.severity === "high" ? (
                <AlertTriangle size={16} className="text-orange-500" />
              ) : (
                <Shield size={16} className="text-yellow-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span
                  className={`text-xs font-bold uppercase ${
                    theme === "bw"
                      ? "text-white"
                      : alert.severity === "critical"
                        ? "text-red-500"
                        : alert.severity === "high"
                          ? "text-orange-500"
                          : "text-yellow-500"
                  }`}
                >
                  {alert.severity}
                </span>
                <span className="text-xs text-gray-400">{alert.time}</span>
              </div>
              <div className="text-sm font-medium">{alert.protocol}</div>
              <div className="text-xs text-gray-300">{alert.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

