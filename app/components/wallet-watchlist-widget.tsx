"use client"

import { useTheme } from "../contexts/theme-context"
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

export function WalletWatchlistWidget({ onClose, onMaximize, isMaximized }: WalletWatchlistWidgetProps) {
  const { theme } = useTheme()

  return (
    <DashboardWidget title="WALLET WATCHLIST" onClose={onClose} onMaximize={onMaximize} isMaximized={isMaximized}>
      <div className="p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-800">
              <th className="text-left pb-2">LABEL</th>
              <th className="text-right pb-2">BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {mockWallets.map((wallet) => (
              <tr key={wallet.id} className="border-b border-gray-800">
                <td className="py-2">
                  <div className="flex flex-col">
                    <span className="text-white">{wallet.label}</span>
                    <span className="text-gray-500 text-xs truncate max-w-[120px]">
                      {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                    </span>
                  </div>
                </td>
                <td className="text-right py-2">
                  <span className="text-white font-mono">${wallet.balance.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardWidget>
  )
}

