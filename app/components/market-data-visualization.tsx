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

interface CandleData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
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
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1M")
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

  // Generate mock candle data for the selected asset
  const generateCandleData = (asset: MarketData, days: number): CandleData[] => {
    const data: CandleData[] = []
    const basePrice = asset.price
    const volatility = basePrice * 0.02 // 2% volatility
    const trend = asset.changePercent / 100 // Use the asset's change percent as the trend

    const now = new Date()

    for (let i = days; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // Generate random but realistic OHLC data
      const dayTrend = trend * (Math.random() * 0.8 + 0.6) // Randomize the trend a bit
      const dayVolatility = volatility * (Math.random() * 0.8 + 0.6)

      const open = i === days ? basePrice : data[data.length - 1].close
      const change = open * dayTrend
      const randomFactor = (Math.random() - 0.5) * dayVolatility

      const close = open + change + randomFactor
      const high = Math.max(open, close) + Math.random() * dayVolatility
      const low = Math.min(open, close) - Math.random() * dayVolatility

      // Generate volume that correlates somewhat with price movement
      const volume = asset.volume * (0.7 + Math.random() * 0.6) * (1 + Math.abs(dayTrend) * 5)

      data.push({
        time: date.toISOString().split("T")[0],
        open,
        high,
        low,
        close,
        volume,
      })
    }

    return data
  }

  // Draw price chart for selected asset
  useEffect(() => {
    if (!chartRef.current || !selectedAsset) return

    const canvas = chartRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Get selected asset data
    const selectedAssetData = mockMarketData.find((asset) => asset.symbol === selectedAsset)
    if (!selectedAssetData) return

    // Generate candle data based on timeframe
    let days = 30 // Default to 1M
    switch (timeframe) {
      case "1D":
        days = 1
        break
      case "1W":
        days = 7
        break
      case "1M":
        days = 30
        break
      case "3M":
        days = 90
        break
      case "1Y":
        days = 365
        break
    }

    const candleData = generateCandleData(selectedAssetData, days)

    // Chart dimensions
    const chartMargin = { top: 30, right: 60, bottom: 80, left: 60 }
    const chartWidth = canvas.width - chartMargin.left - chartMargin.right
    const chartHeight = canvas.height - chartMargin.top - chartMargin.bottom - 60 // Reserve space for volume
    const volumeHeight = 50 // Height for volume bars

    // Find min and max for scaling
    const minPrice = Math.min(...candleData.map((d) => d.low)) * 0.995
    const maxPrice = Math.max(...candleData.map((d) => d.high)) * 1.005
    const priceRange = maxPrice - minPrice

    const maxVolume = Math.max(...candleData.map((d) => d.volume))

    // Background
    ctx.fillStyle = theme === "hacker" ? "#000000" : "#121212"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = theme === "hacker" ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 0.5

    // Horizontal price grid lines
    for (let i = 0; i <= 5; i++) {
      const y = chartMargin.top + (i / 5) * chartHeight
      ctx.beginPath()
      ctx.moveTo(chartMargin.left, y)
      ctx.lineTo(chartMargin.left + chartWidth, y)
      ctx.stroke()

      // Price labels
      const price = maxPrice - (i / 5) * priceRange
      ctx.fillStyle = theme === "hacker" ? "#00ff00" : "#ffffff"
      ctx.font = "10px monospace"
      ctx.textAlign = "right"
      ctx.fillText(`$${price.toFixed(2)}`, chartMargin.left - 5, y + 3)
    }

    // Vertical time grid lines
    const timeLabels = candleData.filter((_, i) => i % Math.max(1, Math.floor(candleData.length / 6)) === 0)
    timeLabels.forEach((data, i) => {
      const x = chartMargin.left + (i / (timeLabels.length - 1)) * chartWidth

      ctx.beginPath()
      ctx.moveTo(x, chartMargin.top)
      ctx.lineTo(x, chartMargin.top + chartHeight + volumeHeight + 10)
      ctx.stroke()

      // Time labels
      ctx.fillStyle = theme === "hacker" ? "#00ff00" : "#ffffff"
      ctx.font = "10px monospace"
      ctx.textAlign = "center"
      ctx.fillText(data.time.slice(5), x, chartMargin.top + chartHeight + volumeHeight + 25)
    })

    // Draw candles
    const candleWidth = Math.min(15, (chartWidth / candleData.length) * 0.8)
    const candleSpacing = chartWidth / candleData.length

    candleData.forEach((candle, i) => {
      const x = chartMargin.left + i * candleSpacing

      // Calculate y positions
      const openY = chartMargin.top + chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight
      const closeY = chartMargin.top + chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight
      const highY = chartMargin.top + chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight
      const lowY = chartMargin.top + chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight

      // Draw candle wick
      ctx.beginPath()
      ctx.moveTo(x + candleWidth / 2, highY)
      ctx.lineTo(x + candleWidth / 2, lowY)
      ctx.strokeStyle =
        candle.close >= candle.open
          ? theme === "hacker"
            ? "#00ff00"
            : "#4ade80"
          : theme === "hacker"
            ? "#ff0000"
            : "#f87171"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw candle body
      ctx.fillStyle =
        candle.close >= candle.open
          ? theme === "hacker"
            ? "#00ff00"
            : "#4ade80"
          : theme === "hacker"
            ? "#ff0000"
            : "#f87171"
      ctx.fillRect(x, Math.min(openY, closeY), candleWidth, Math.max(1, Math.abs(closeY - openY)))

      // Draw volume bars
      const volumeY = chartMargin.top + chartHeight + 10
      const volumeBarHeight = (candle.volume / maxVolume) * volumeHeight

      ctx.fillStyle =
        candle.close >= candle.open
          ? theme === "hacker"
            ? "rgba(0, 255, 0, 0.5)"
            : "rgba(74, 222, 128, 0.5)"
          : theme === "hacker"
            ? "rgba(255, 0, 0, 0.5)"
            : "rgba(248, 113, 113, 0.5)"
      ctx.fillRect(x, volumeY + volumeHeight - volumeBarHeight, candleWidth, volumeBarHeight)
    })

    // Draw volume label
    ctx.fillStyle = theme === "hacker" ? "#00ff00" : "#ffffff"
    ctx.font = "10px monospace"
    ctx.textAlign = "left"
    ctx.fillText("Volume", chartMargin.left, chartMargin.top + chartHeight + 20)

    // Draw current price line
    const currentPrice = selectedAssetData.price
    const currentPriceY = chartMargin.top + chartHeight - ((currentPrice - minPrice) / priceRange) * chartHeight

    ctx.beginPath()
    ctx.moveTo(chartMargin.left, currentPriceY)
    ctx.lineTo(chartMargin.left + chartWidth, currentPriceY)
    ctx.strokeStyle = theme === "hacker" ? "#ffff00" : "#facc15"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 3])
    ctx.stroke()
    ctx.setLineDash([])

    // Draw current price label
    ctx.fillStyle = theme === "hacker" ? "#ffff00" : "#facc15"
    ctx.font = "bold 10px monospace"
    ctx.textAlign = "right"
    ctx.fillText(`$${currentPrice.toFixed(2)}`, chartMargin.left + chartWidth + 55, currentPriceY + 4)

    // Draw title
    ctx.fillStyle = theme === "hacker" ? "#ff3333" : "#ffffff"
    ctx.font = "bold 12px monospace"
    ctx.textAlign = "center"
    ctx.fillText(`${selectedAsset} - ${timeframe} Chart`, canvas.width / 2, 15)

    // Draw last candle info
    const lastCandle = candleData[candleData.length - 1]
    ctx.fillStyle = theme === "hacker" ? "#00ff00" : "#ffffff"
    ctx.font = "10px monospace"
    ctx.textAlign = "left"
    ctx.fillText(
      `O: $${lastCandle.open.toFixed(2)}  H: $${lastCandle.high.toFixed(2)}  L: $${lastCandle.low.toFixed(2)}  C: $${lastCandle.close.toFixed(2)}`,
      chartMargin.left,
      15,
    )
  }, [selectedAsset, theme, timeframe])

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
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                    {mockMarketData.find((a) => a.symbol === selectedAsset)?.name} ({selectedAsset})
                  </h3>

                  <div className="flex items-center space-x-1 bg-gray-900 rounded-md p-1">
                    {["1D", "1W", "1M", "3M", "1Y"].map((tf) => (
                      <button
                        key={tf}
                        className={`px-2 py-0.5 text-xs rounded ${
                          timeframe === tf
                            ? theme === "hacker"
                              ? "bg-green-900 text-green-500"
                              : "bg-blue-900 text-white"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                        onClick={() => setTimeframe(tf as any)}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-gray-400 text-sm mr-2">Current Price:</span>
                  <span className={`font-mono text-lg ${theme === "hacker" ? "text-green-500" : "text-white"}`}>
                    $
                    {mockMarketData
                      .find((a) => a.symbol === selectedAsset)
                      ?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`ml-2 text-sm ${getColorClass(mockMarketData.find((a) => a.symbol === selectedAsset)?.changePercent || 0)}`}
                  >
                    {mockMarketData.find((a) => a.symbol === selectedAsset)?.changePercent! > 0 ? "+" : ""}
                    {mockMarketData.find((a) => a.symbol === selectedAsset)?.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex-1 bg-black/30 border border-gray-800 rounded">
                <canvas ref={chartRef} width={400} height={300} className="w-full h-full" />
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Info size={14} className="mr-1" />
                  <span>TradingView-style chart with OHLC and volume data</span>
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

