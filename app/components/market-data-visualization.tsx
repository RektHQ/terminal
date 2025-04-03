"use client"

import { useTheme } from "../contexts/theme-context"
import { ArrowDown, ArrowUp } from "lucide-react"

export function MarketDataVisualization() {
  const { theme } = useTheme()

  const marketData = [
    {
      name: "ETH",
      price: "$3,245.67",
      change: "+2.4%",
      volume: "$12.5B",
    },
    {
      name: "BTC",
      price: "$52,345.89",
      change: "+1.2%",
      volume: "$24.8B",
    },
    {
      name: "SOL",
      price: "$124.56",
      change: "-3.1%",
      volume: "$4.2B",
    },
    {
      name: "AVAX",
      price: "$35.21",
      change: "+5.7%",
      volume: "$2.1B",
    },
    {
      name: "ARB",
      price: "$1.23",
      change: "+6.9%",
      volume: "$1.5B",
    },
  ]

  return (
    <div className="p-2 h-full bg-black text-white">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between text-xs text-gray-500 px-2 mb-1">
          <span>Asset</span>
          <span>Price</span>
          <span>24h Change</span>
          <span>Volume</span>
        </div>

        {marketData.map((asset, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border border-gray-800 rounded hover:bg-gray-900"
          >
            <div className="flex items-center">
              <span className="text-sm font-medium">{asset.name}</span>
            </div>
            <div className="text-sm">{asset.price}</div>
            <div
              className={`flex items-center ${
                asset.change.startsWith("+")
                  ? theme === "bw"
                    ? "text-white"
                    : "text-green-500"
                  : theme === "bw"
                    ? "text-white"
                    : "text-red-500"
              }`}
            >
              {asset.change.startsWith("+") ? (
                <ArrowUp size={14} className="mr-1" />
              ) : (
                <ArrowDown size={14} className="mr-1" />
              )}
              <span className="text-sm">{asset.change}</span>
            </div>
            <div className="text-sm text-gray-400">{asset.volume}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

