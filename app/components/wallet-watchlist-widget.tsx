"use client"

import { useTheme } from "../contexts/theme-context"
import { ExternalLink, Eye, AlertCircle } from "lucide-react"
import { DashboardWidget } from "./dashboard-widget"

interface WatchedWallet {
  id: string
  label: string
  address: string
  balance: number
  change24h: number
  lastActivity: string
  riskScore: number
}

interface WalletWatchlistWidgetProps {
  onClose?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
  id?: string
  onDragStart?: () => void
  onDragEnd?: (x: number, y: number) => void
  onResize?: (width: number, height: number) => void
}

const mockWallets: WatchedWallet[] = [
  {
    id: "wallet-001",
    label: "Wintermute Exploiter",
    address: "0x4b5922abf25858d012d12bb1184e5d3d0b6d6be4",
    balance: 18456.34,
    change24h: -1250.5,
    lastActivity: "2h ago",
    riskScore: 92,
  },
  {
    id: "wallet-002",
    label: "Euler Hacker",
    address: "0x5f259d0b76d7569e13c39c9278d8f8f26c889dd9",
    balance: 7834.21,
    change24h: 0,
    lastActivity: "3d ago",
    riskScore: 87,
  },
  {
    id: "wallet-003",
    label: "Tornado Cash User #42",
    address: "0x8589427373d6d84e98730d7795d8f6f8731fda16",
    balance: 1245.67,
    change24h: 1245.67,
    lastActivity: "5m ago",
    riskScore: 76,
  },
  {
    id: "wallet-004",
    label: "Suspicious Bridge User",
    address: "0x3d2f8ae0344d38084a3d6e2cbbd214236821432a",
    balance: 4567.89,
    change24h: 2345.67,
    lastActivity: "1h ago",
    riskScore: 68,
  },
]

export function WalletWatchlistWidget({
  onClose,
  onMaximize,
  isMaximized,
  id,
  onDragStart,
  onDragEnd,
  onResize,
}: WalletWatchlistWidgetProps) {
  const { theme } = useTheme()

  const getRiskColor = (score: number) => {
    if (score > 80) {
      return theme === "hacker" ? "text-red-500" : "text-red-400"
    } else if (score > 60) {
      return theme === "hacker" ? "text-orange-500" : "text-orange-400"
    } else if (score > 40) {
      return theme === "hacker" ? "text-yellow-500" : "text-yellow-400"
    } else {
      return theme === "hacker" ? "text-green-500" : "text-green-400"
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) {
      return theme === "hacker" ? "text-green-500" : "text-green-400"
    } else if (change < 0) {
      return theme === "hacker" ? "text-red-500" : "text-red-400"
    }
    return "text-gray-400"
  }

  return (
    <DashboardWidget
      title="WALLET WATCHLIST"
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      id={id}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onResize={onResize}
    >
      <div className="p-2 h-full flex flex-col">
        <table className="w-full text-sm h-full">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-800">
              <th className="text-left pb-2">LABEL</th>
              <th className="text-right pb-2">BALANCE</th>
              <th className="text-right pb-2">CHANGE (24H)</th>
              <th className="text-center pb-2">ACTIVITY</th>
              <th className="text-center pb-2">RISK</th>
              <th className="text-right pb-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {mockWallets.map((wallet) => (
              <tr key={wallet.id}>
                <td className="py-2">
                  <div className="flex flex-col">
                    <span className={theme === "hacker" ? "text-green-500" : "text-white"}>{wallet.label}</span>
                    <span className="text-gray-500 text-xs truncate max-w-[120px]">
                      {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                    </span>
                  </div>
                </td>
                <td className="text-right py-2">
                  <span className={theme === "hacker" ? "terminal-text" : "text-white font-mono"}>
                    ${wallet.balance.toLocaleString()}
                  </span>
                </td>
                <td className="text-right py-2">
                  <span className={getChangeColor(wallet.change24h)}>
                    {wallet.change24h > 0 ? "+" : ""}
                    {wallet.change24h.toLocaleString()}
                  </span>
                </td>
                <td className="text-center py-2">
                  <span className="text-gray-400">{wallet.lastActivity}</span>
                </td>
                <td className="text-center py-2">
                  <span className={`${getRiskColor(wallet.riskScore)} font-bold`}>{wallet.riskScore}</span>
                </td>
                <td className="text-right py-2">
                  <div className="flex justify-end space-x-1">
                    <button className="text-gray-400 hover:text-white">
                      <Eye size={14} />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <AlertCircle size={14} />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardWidget>
  )
}

