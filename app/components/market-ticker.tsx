"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../contexts/theme-context"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useIsMobile } from "../hooks/use-mobile"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

const mockMarketData: MarketData[] = [
  { symbol: "BTC", name: "Bitcoin", price: 62481.34, change: 1243.21, changePercent: 2.03 },
  { symbol: "ETH", name: "Ethereum", price: 3045.67, change: -89.32, changePercent: -2.85 },
  { symbol: "SOL", name: "Solana", price: 142.78, change: 7.65, changePercent: 5.67 },
  { symbol: "AVAX", name: "Avalanche", price: 35.21, change: -1.43, changePercent: -3.9 },
  { symbol: "ARB", name: "Arbitrum", price: 1.23, change: 0.08, changePercent: 6.95 },
  { symbol: "OP", name: "Optimism", price: 2.87, change: 0.12, changePercent: 4.36 },
  { symbol: "LINK", name: "Chainlink", price: 18.45, change: -0.32, changePercent: -1.71 },
  { symbol: "UNI", name: "Uniswap", price: 10.78, change: 0.45, changePercent: 4.35 },
  { symbol: "AAVE", name: "Aave", price: 92.34, change: -3.21, changePercent: -3.36 },
  { symbol: "MKR", name: "Maker", price: 1876.54, change: 45.67, changePercent: 2.49 },
]

export function MarketTicker() {
  const { theme } = useTheme()
  const [scrollPosition, setScrollPosition] = useState(0)
  const isMobile = useIsMobile()

  // For mobile, we'll show fewer items
  const displayData = isMobile ? mockMarketData.slice(0, 5) : mockMarketData

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (displayData.length * 200))
    }, 50)
    return () => clearInterval(interval)
  }, [displayData.length])

  const getColorClass = (value: number) => {
    if (value > 0) {
      return theme === "hacker" ? "text-green-500" : "text-green-400"
    } else if (value < 0) {
      return theme === "hacker" ? "text-red-500" : "text-red-400"
    }
    return "text-gray-400"
  }

  return (
    <div
      className={`w-full bg-black border-b ${theme === "hacker" ? "border-red-500/30" : "border-white/30"} py-1 px-2 overflow-hidden`}
    >
      <div className="flex items-center whitespace-nowrap" style={{ transform: `translateX(-${scrollPosition}px)` }}>
        {displayData.concat(displayData).map((item, index) => (
          <div key={index} className="flex items-center mr-8">
            <span className={`font-bold ${theme === "hacker" ? "text-blue-500" : "text-white"} mr-1`}>
              {item.symbol}
            </span>
            <span className={`${getColorClass(item.change)} font-mono`}>
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`ml-1 flex items-center ${getColorClass(item.change)} text-xs`}>
              {item.change > 0 ? (
                <TrendingUp size={12} className="mr-1" />
              ) : (
                <TrendingDown size={12} className="mr-1" />
              )}
              {item.changePercent > 0 ? "+" : ""}
              {item.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

