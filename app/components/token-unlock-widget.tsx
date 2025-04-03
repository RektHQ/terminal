"use client"

import { useTheme } from "../contexts/theme-context"
import { Lock, Unlock } from "lucide-react"
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

export function TokenUnlockWidget({ onClose, onMaximize, isMaximized }: TokenUnlockWidgetProps) {
  const { theme } = useTheme()

  return (
    <DashboardWidget title="TOKEN UNLOCKS" onClose={onClose} onMaximize={onMaximize} isMaximized={isMaximized}>
      <div className="p-2 space-y-2">
        {mockUnlocks.map((unlock) => (
          <div key={unlock.id} className="border border-gray-800 p-2 rounded">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <span className="text-white font-bold">{unlock.project}</span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded uppercase bg-purple-900/20 text-purple-400">
                  {unlock.category}
                </span>
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-300">{unlock.amount.toLocaleString()} tokens</div>
                <div className="text-xs text-yellow-400">~${unlock.amountUsd.toLocaleString()}</div>
              </div>

              <div className="flex items-center">
                {unlock.daysRemaining <= 7 ? (
                  <Unlock size={14} className="text-red-400" />
                ) : (
                  <Lock size={14} className="text-gray-500" />
                )}
                <span className="ml-1 text-red-400">{unlock.daysRemaining} days</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  )
}

