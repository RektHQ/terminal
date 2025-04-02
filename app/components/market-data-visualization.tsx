"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "../contexts/theme-context"
import { TrendingUp, TrendingDown, AlertCircle, Info } from "lucide-react"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  marketCap: number
  volume: number
  tvl?: number
  exploits?: number
}

const mockMarketData: MarketData[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 62481.34,
    change: 1243.21,
    changePercent: 2.03,
    marketCap: 1230000000000,
    volume: 28500000000,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3045.67,
    change: -89.32,
    changePercent: -2.85,
    marketCap: 365000000000,
    volume: 15700000000,
    tvl: 42000000000,
    exploits: 12,
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 142.78,
    change: 7.65,
    changePercent: 5.67,
    marketCap: 62500000000,
    volume: 3800000000,
    tvl: 8500000000,
    exploits: 4,
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    price: 35.21,
    change: -1.43,
    changePercent: -3.9,
    marketCap: 13200000000,
    volume: 980000000,
    tvl: 3200000000,
    exploits: 3,
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    price: 1.23,
    change: 0.08,
    changePercent: 6.95,
    marketCap: 3900000000,
    volume: 450000000,
    tvl: 2100000000,
    exploits: 1,
  },
  {
    symbol: "OP",
    name: "Optimism",
    price: 2.87,
    change: 0.12,
    changePercent: 4.36,
    marketCap: 2800000000,
    volume: 320000000,
    tvl: 1800000000,
    exploits: 0,
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    price: 18.45,
    change: -0.32,
    changePercent: -1.71,
    marketCap: 10700000000,
    volume: 780000000,
    tvl: 0,
    exploits: 2,
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    price: 10.78,
    change: 0.45,
    changePercent: 4.35,
    marketCap: 6500000000,
    volume: 520000000,
    tvl: 3900000000,
    exploits: 5,
  },
  {
    symbol: "AAVE",
    name: "Aave",
    price: 92.34,
    change: -3.21,
    changePercent: -3.36,
    marketCap: 1350000000,
    volume: 210000000,
    tvl: 4800000000,
    exploits: 3,
  },
  {
    symbol: "MKR",
    name: "Maker",
    price: 1876.54,
    change: 45.67,
    changePercent: 2.49,
    marketCap: 1680000000,
    volume: 180000000,
    tvl: 5200000000,
    exploits: 2,
  },
  {
    symbol: "CRV",
    name: "Curve",
    price: 0.56,
    change: -0.04,
    changePercent: -6.67,
    marketCap: 620000000,
    volume: 320000000,
    tvl: 3100000000,
    exploits: 7,
  },
  {
    symbol: "SNX",
    name: "Synthetix",
    price: 3.21,
    change: 0.18,
    changePercent: 5.94,
    marketCap: 980000000,
    volume: 145000000,
    tvl: 720000000,
    exploits: 2,
  },
  {
    symbol: "COMP",
    name: "Compound",
    price: 58.76,
    change: -2.34,
    changePercent: -3.83,
    marketCap: 470000000,
    volume: 98000000,
    tvl: 2800000000,
    exploits: 4,
  },
  {
    symbol: "YFI",
    name: "Yearn",
    price: 7890.45,
    change: 234.56,
    changePercent: 3.06,
    marketCap: 260000000,
    volume: 75000000,
    tvl: 1200000000,
    exploits: 3,
  },
  {
    symbol: "BAL",
    name: "Balancer",
    price: 4.32,
    change: 0.21,
    changePercent: 5.11,
    marketCap: 230000000,
    volume: 65000000,
    tvl: 980000000,
    exploits: 2,
  },
]

export function MarketDataVisualization() {
  const { theme } = useTheme()
  const [sortField, setSortField] = useState<keyof MarketData>("marketCap")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const chartRef = useRef<HTMLCanvasElement>(null)

  const sortedData = [...mockMarketData].sort((a, b) => {
    if (sortDirection === "asc") {
      return (a[sortField] as number) - (b[sortField] as number)
    } else {
      return (b[sortField] as number) - (a[sortField] as number)
    }
  })

  const handleSort = (field: keyof MarketData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getColorClass = (value: number) => {
    if (value > 0) {
      return theme === "hacker" ? "text-green-500" : "text-green-400"
    } else if (value < 0) {
      return theme === "hacker" ? "text-red-500" : "text-red-400"
    }
    return "text-gray-400"
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else {
      return `$${num.toLocaleString()}`
    }
  }

  // Draw price chart for selected asset
  useEffect(() => {
    if (!chartRef.current || !selectedAsset) return

    const canvas = chartRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Generate mock price data for the selected asset
    const selectedAssetData = mockMarketData.find((asset) => asset.symbol === selectedAsset)
    if (!selectedAssetData) return

    const basePrice = selectedAssetData.price
    const priceHistory = Array(30)
      .fill(0)
      .map((_, i) => {
        // Generate a somewhat realistic price curve with some volatility
        const dayOffset = i - 29 // -29 to 0
        const trendFactor = selectedAssetData.changePercent > 0 ? 1 : -1
        const volatility = basePrice * 0.02 // 2% volatility
        const trend = basePrice * (selectedAssetData.changePercent / 100) * (dayOffset / 10)
        const random = (Math.random() - 0.5) * volatility
        return basePrice + trend + random
      })

    // Find min and max for scaling
    const minPrice = Math.min(...priceHistory) * 0.99
    const maxPrice = Math.max(...priceHistory) * 1.01
    const priceRange = maxPrice - minPrice

    // Draw grid
    ctx.strokeStyle = theme === "hacker" ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = canvas.height - (i / 4) * canvas.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()

      // Price labels
      const price = minPrice + (i / 4) * priceRange
      ctx.fillStyle = theme === "hacker" ? "#00ff00" : "#ffffff"
      ctx.font = "10px monospace"
      ctx.textAlign = "left"
      ctx.fillText(`$${price.toFixed(2)}`, 5, y - 5)
    }

    // Draw price line
    ctx.strokeStyle =
      selectedAssetData.changePercent >= 0
        ? theme === "hacker"
          ? "#00ff00"
          : "#4ade80"
        : theme === "hacker"
          ? "#ff0000"
          : "#f87171"
    ctx.lineWidth = 2
    ctx.beginPath()

    priceHistory.forEach((price, i) => {
      const x = (i / (priceHistory.length - 1)) * canvas.width
      const y = canvas.height - ((price - minPrice) / priceRange) * canvas.height

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw title
    ctx.fillStyle = theme === "hacker" ? "#ff3333" : "#ffffff"
    ctx.font = "bold 12px monospace"
    ctx.textAlign = "center"
    ctx.fillText(`${selectedAsset} - 30 Day Price History`, canvas.width / 2, 15)
  }, [selectedAsset, theme])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex">
        {/* Market data table */}
        <div className="w-2/3 overflow-auto border-r border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className={`sticky top-0 bg-black ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                <th className="text-left p-2 cursor-pointer" onClick={() => handleSort("symbol")}>
                  Symbol
                </th>
                <th className="text-left p-2 cursor-pointer" onClick={() => handleSort("name")}>
                  Name
                </th>
                <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("price")}>
                  Price
                </th>
                <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("changePercent")}>
                  24h %
                </th>
                <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("marketCap")}>
                  Market Cap
                </th>
                <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("volume")}>
                  Volume
                </th>
                <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("tvl")}>
                  TVL
                </th>
                <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("exploits")}>
                  Exploits
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((asset) => (
                <tr
                  key={asset.symbol}
                  className={`border-b border-gray-800 hover:bg-gray-900 cursor-pointer ${selectedAsset === asset.symbol ? "bg-gray-900" : ""}`}
                  onClick={() => setSelectedAsset(asset.symbol)}
                >
                  <td className={`p-2 ${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
                    {asset.symbol}
                  </td>
                  <td className="p-2 text-gray-300">{asset.name}</td>
                  <td className="p-2 text-right font-mono">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`p-2 text-right ${getColorClass(asset.changePercent)}`}>
                    <div className="flex items-center justify-end">
                      {asset.changePercent > 0 ? (
                        <TrendingUp size={14} className="mr-1" />
                      ) : asset.changePercent < 0 ? (
                        <TrendingDown size={14} className="mr-1" />
                      ) : null}
                      {asset.changePercent > 0 ? "+" : ""}
                      {asset.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-2 text-right text-gray-300">{formatNumber(asset.marketCap)}</td>
                  <td className="p-2 text-right text-gray-300">{formatNumber(asset.volume)}</td>
                  <td className="p-2 text-right text-gray-300">{asset.tvl ? formatNumber(asset.tvl) : "-"}</td>
                  <td className="p-2 text-right">
                    {asset.exploits !== undefined ? (
                      <div
                        className={`flex items-center justify-end ${asset.exploits > 3 ? "text-red-500" : "text-gray-300"}`}
                      >
                        {asset.exploits > 3 && <AlertCircle size={14} className="mr-1" />}
                        {asset.exploits}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart area */}
        <div className="w-1/3 p-4 flex flex-col">
          {selectedAsset ? (
            <>
              <div className="mb-4">
                <h3 className={`text-lg font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                  {mockMarketData.find((a) => a.symbol === selectedAsset)?.name} ({selectedAsset})
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-gray-400 text-sm mr-2">Current Price:</span>
                  <span className={`font-mono text-lg ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                    $
                    {mockMarketData
                      .find((a) => a.symbol === selectedAsset)
                      ?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <div className="flex-1 bg-black/30 border border-gray-800 rounded">
                <canvas ref={chartRef} width={400} height={300} className="w-full h-full" />
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Info size={14} className="mr-1" />
                  <span>Click on any asset in the table to view its chart</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select an asset to view its chart
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

