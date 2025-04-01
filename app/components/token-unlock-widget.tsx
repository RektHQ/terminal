"use client"

import { useTheme } from "../contexts/theme-context"
import { Calendar, Lock, Unlock } from "lucide-react"
import { DashboardWidget } from "./dashboard-widget"

interface TokenUnlock {
  id: string
  project: string
  date: string
  amount: number
  amountUsd: number
  category: "team" | "investors" | "treasury" | "community"
  daysRemaining: number
}

interface TokenUnlockWidgetProps {
  onClose?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
  id?: string
  onDragStart?: () => void
  onDragEnd?: (x: number, y: number) => void
  onResize?: (width: number, height: number) => void
}

const mockUnlocks: TokenUnlock[] = [
  {
    id: "unlock-001",
    project: "Arbitrum",
    date: "2025-04-15",
    amount: 25000000,
    amountUsd: 30750000,
    category: "investors",
    daysRemaining: 17,
  },
  {
    id: "unlock-002",
    project: "Optimism",
    date: "2025-04-02",
    amount: 12500000,
    amountUsd: 35875000,
    category: "team",
    daysRemaining: 4,
  },
  {
    id: "unlock-003",
    project: "Aptos",
    date: "2025-04-10",
    amount: 18750000,
    amountUsd: 28125000,
    category: "investors",
    daysRemaining: 12,
  },
  {
    id: "unlock-004",
    project: "Sui",
    date: "2025-03-31",
    amount: 15000000,
    amountUsd: 21000000,
    category: "treasury",
    daysRemaining: 2,
  },
]

export function TokenUnlockWidget({
  onClose,
  onMaximize,
  isMaximized,
  id,
  onDragStart,
  onDragEnd,
  onResize,
}: TokenUnlockWidgetProps) {
  const { theme } = useTheme()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "team":
        return theme === "hacker" ? "text-blue-500 bg-blue-900/20" : "text-blue-400 bg-blue-900/30"
      case "investors":
        return theme === "hacker" ? "text-purple-500 bg-purple-900/20" : "text-purple-400 bg-purple-900/30"
      case "treasury":
        return theme === "hacker" ? "text-green-500 bg-green-900/20" : "text-green-400 bg-green-900/30"
      case "community":
        return theme === "hacker" ? "text-yellow-500 bg-yellow-900/20" : "text-yellow-400 bg-yellow-900/30"
      default:
        return "text-gray-400 bg-gray-800"
    }
  }

  const getUrgencyColor = (days: number) => {
    if (days <= 3) {
      return theme === "hacker" ? "text-red-500" : "text-red-400"
    } else if (days <= 7) {
      return theme === "hacker" ? "text-orange-500" : "text-orange-400"
    } else if (days <= 14) {
      return theme === "hacker" ? "text-yellow-500" : "text-yellow-400"
    } else {
      return theme === "hacker" ? "text-green-500" : "text-green-400"
    }
  }

  return (
    <DashboardWidget
      title="TOKEN UNLOCK CALENDAR"
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      id={id}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onResize={onResize}
    >
      <div className="p-2 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-start space-y-2">
          {mockUnlocks.map((unlock) => (
            <div key={unlock.id} className="border border-gray-800 p-2 rounded">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className={`${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
                    {unlock.project}
                  </span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded uppercase ${getCategoryColor(unlock.category)}`}>
                    {unlock.category}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <span className="text-gray-400 text-xs">{unlock.date}</span>
                </div>
              </div>

              <div className="mt-2 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-300">{unlock.amount.toLocaleString()} tokens</div>
                  <div className={`text-xs ${theme === "hacker" ? "terminal-text-yellow" : "text-gray-300"}`}>
                    ~${unlock.amountUsd.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center">
                  {unlock.daysRemaining <= 7 ? (
                    <Unlock size={14} className={getUrgencyColor(unlock.daysRemaining)} />
                  ) : (
                    <Lock size={14} className="text-gray-500" />
                  )}
                  <span className={`ml-1 ${getUrgencyColor(unlock.daysRemaining)}`}>{unlock.daysRemaining} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardWidget>
  )
}

