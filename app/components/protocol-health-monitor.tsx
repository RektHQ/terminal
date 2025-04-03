"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "../contexts/theme-context"
import { TrendingDown, TrendingUp, Activity } from "lucide-react"

interface ProtocolHealth {
  id: string
  name: string
  category: string
  tvl: number
  tvlChange24h: number
  healthScore: number
  healthTrend: "improving" | "stable" | "declining"
  riskFactors: {
    type: string
    score: number
    description: string
  }[]
  lastIncident?: {
    date: string
    type: string
    severity: "critical" | "high" | "medium" | "low"
    description: string
  }
}

const mockProtocolData: ProtocolHealth[] = [
  {
    id: "aave",
    name: "Aave",
    category: "Lending",
    tvl: 5200000000,
    tvlChange24h: 1.2,
    healthScore: 92,
    healthTrend: "stable",
    riskFactors: [
      { type: "Smart Contract Risk", score: 8, description: "Multiple audits, bug bounty program" },
      { type: "Centralization Risk", score: 12, description: "Governance somewhat concentrated" },
      { type: "Collateral Risk", score: 5, description: "Diverse collateral types with conservative parameters" },
    ],
  },
  {
    id: "uniswap",
    name: "Uniswap",
    category: "DEX",
    tvl: 3800000000,
    tvlChange24h: -2.5,
    healthScore: 95,
    healthTrend: "stable",
    riskFactors: [
      { type: "Smart Contract Risk", score: 5, description: "Extensively audited, mature codebase" },
      { type: "Centralization Risk", score: 8, description: "Governance fairly decentralized" },
      { type: "Oracle Risk", score: 3, description: "Time-weighted average prices reduce manipulation risk" },
    ],
  },
  {
    id: "curve",
    name: "Curve",
    category: "DEX",
    tvl: 3100000000,
    tvlChange24h: -1.8,
    healthScore: 88,
    healthTrend: "declining",
    riskFactors: [
      { type: "Smart Contract Risk", score: 10, description: "Complex codebase, recent incidents in ecosystem" },
      { type: "Centralization Risk", score: 15, description: "veCRV voting power concentrated" },
      { type: "Oracle Risk", score: 12, description: "Some pools susceptible to manipulation" },
    ],
    lastIncident: {
      date: "2024-12-15",
      type: "Oracle Manipulation",
      severity: "high",
      description: "Price oracle manipulation in a factory pool led to $2.8M loss",
    },
  },
  {
    id: "maker",
    name: "MakerDAO",
    category: "Lending",
    tvl: 5800000000,
    tvlChange24h: 0.5,
    healthScore: 94,
    healthTrend: "improving",
    riskFactors: [
      { type: "Smart Contract Risk", score: 6, description: "Battle-tested, multiple audits" },
      { type: "Centralization Risk", score: 10, description: "Governance somewhat concentrated" },
      { type: "Collateral Risk", score: 8, description: "Diverse collateral types, some riskier assets" },
    ],
  },
  {
    id: "compound",
    name: "Compound",
    category: "Lending",
    tvl: 2800000000,
    tvlChange24h: -0.8,
    healthScore: 90,
    healthTrend: "stable",
    riskFactors: [
      { type: "Smart Contract Risk", score: 7, description: "Well-audited, mature protocol" },
      { type: "Centralization Risk", score: 12, description: "Some concentration in governance" },
      { type: "Collateral Risk", score: 9, description: "Conservative parameters, but limited collateral types" },
    ],
  },
  {
    id: "lido",
    name: "Lido",
    category: "Staking",
    tvl: 15200000000,
    tvlChange24h: 2.1,
    healthScore: 82,
    healthTrend: "stable",
    riskFactors: [
      { type: "Smart Contract Risk", score: 12, description: "Complex system spanning multiple chains" },
      { type: "Centralization Risk", score: 25, description: "Validator set somewhat concentrated" },
      {
        type: "Regulatory Risk",
        score: 18,
        description: "Potential regulatory concerns around staking centralization",
      },
    ],
  },
  {
    id: "gmx",
    name: "GMX",
    category: "Derivatives",
    tvl: 920000000,
    tvlChange24h: 3.2,
    healthScore: 85,
    healthTrend: "improving",
    riskFactors: [
      { type: "Smart Contract Risk", score: 15, description: "Complex perpetuals system" },
      { type: "Oracle Risk", score: 18, description: "Price feeds critical for liquidations" },
      { type: "Market Risk", score: 12, description: "Exposed to market volatility" },
    ],
  },
  {
    id: "balancer",
    name: "Balancer",
    category: "DEX",
    tvl: 980000000,
    tvlChange24h: -1.2,
    healthScore: 87,
    healthTrend: "stable",
    riskFactors: [
      { type: "Smart Contract Risk", score: 12, description: "Complex pool types" },
      { type: "Centralization Risk", score: 10, description: "Governance fairly decentralized" },
      { type: "Oracle Risk", score: 8, description: "Internal oracles for some functions" },
    ],
  },
  {
    id: "synthetix",
    name: "Synthetix",
    category: "Derivatives",
    tvl: 720000000,
    tvlChange24h: 1.5,
    healthScore: 78,
    healthTrend: "declining",
    riskFactors: [
      { type: "Smart Contract Risk", score: 15, description: "Complex system with frequent updates" },
      { type: "Oracle Risk", score: 20, description: "Heavy reliance on price oracles" },
      { type: "Debt Pool Risk", score: 25, description: "Shared debt pool creates systemic risk" },
    ],
    lastIncident: {
      date: "2025-01-22",
      type: "Oracle Delay",
      severity: "medium",
      description: "Oracle delay caused temporary mispricing of synthetic assets",
    },
  },
  {
    id: "yearn",
    name: "Yearn Finance",
    category: "Yield",
    tvl: 1200000000,
    tvlChange24h: -0.5,
    healthScore: 86,
    healthTrend: "stable",
    riskFactors: [
      { type: "Smart Contract Risk", score: 12, description: "Complex vault strategies" },
      { type: "Centralization Risk", score: 8, description: "Fairly decentralized governance" },
      { type: "Strategy Risk", score: 18, description: "Complex yield strategies across protocols" },
    ],
  },
]

export function ProtocolHealthMonitor() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof ProtocolHealth>("healthScore")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const chartRef = useRef<HTMLCanvasElement>(null)

  const protocols = [
    {
      name: "Aave v3",
      tvl: "$4.2B",
      health: "healthy",
      change: "+2.3%",
    },
    {
      name: "Compound v3",
      tvl: "$1.8B",
      health: "warning",
      change: "-0.5%",
    },
    {
      name: "MakerDAO",
      tvl: "$7.1B",
      health: "healthy",
      change: "+1.2%",
    },
  ]

  const filteredProtocols = mockProtocolData
    .filter(
      (protocol) =>
        protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
      }

      return 0
    })

  const handleSort = (field: keyof ProtocolHealth) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) {
      return theme === "hacker" ? "text-green-500" : "text-green-400"
    } else if (score >= 80) {
      return theme === "hacker" ? "text-yellow-500" : "text-yellow-400"
    } else if (score >= 70) {
      return theme === "hacker" ? "text-orange-500" : "text-orange-400"
    } else {
      return theme === "hacker" ? "text-red-500" : "text-red-400"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp size={14} className={theme === "hacker" ? "text-green-500" : "text-green-400"} />
      case "declining":
        return <TrendingDown size={14} className={theme === "hacker" ? "text-red-500" : "text-red-400"} />
      default:
        return <Activity size={14} className="text-gray-400" />
    }
  }

  const formatTVL = (tvl: number) => {
    if (tvl >= 1000000000) {
      return `$${(tvl / 1000000000).toFixed(1)}B`
    } else if (tvl >= 1000000) {
      return `$${(tvl / 1000000).toFixed(1)}M`
    } else {
      return `$${tvl.toLocaleString()}`
    }
  }

  // Draw risk radar chart for selected protocol
  useEffect(() => {
    if (!chartRef.current || !selectedProtocol) return

    const protocol = mockProtocolData.find((p) => p.id === selectedProtocol)
    if (!protocol) return

    const canvas = chartRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up radar chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 30

    // Draw radar background
    const riskFactors = protocol.riskFactors
    const numFactors = riskFactors.length
    const angleStep = (Math.PI * 2) / numFactors

    // Draw radar grid
    ctx.strokeStyle = theme === "hacker" ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"
    ctx.fillStyle = theme === "hacker" ? "rgba(0, 255, 0, 0.05)" : "rgba(255, 255, 255, 0.05)"

    // Draw concentric circles
    for (let r = 0.2; r <= 1; r += 0.2) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * r, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw radar axes
    for (let i = 0; i < numFactors; i++) {
      const angle = i * angleStep - Math.PI / 2 // Start from top
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
      ctx.stroke()

      // Draw axis labels
      const labelX = centerX + (radius + 15) * Math.cos(angle)
      const labelY = centerY + (radius + 15) * Math.sin(angle)

      ctx.fillStyle = theme === "hacker" ? "#00ff00" : "#ffffff"
      ctx.font = "10px monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(riskFactors[i].type, labelX, labelY)
    }

    // Draw risk data
    ctx.beginPath()
    for (let i = 0; i < numFactors; i++) {
      const angle = i * angleStep - Math.PI / 2
      const riskValue = riskFactors[i].score / 30 // Normalize to 0-1 (assuming max score is 30)
      const x = centerX + radius * riskValue * Math.cos(angle)
      const y = centerY + radius * riskValue * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fillStyle = theme === "hacker" ? "rgba(255, 0, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"
    ctx.fill()
    ctx.strokeStyle = theme === "hacker" ? "#ff0000" : "#ff6666"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw risk points
    for (let i = 0; i < numFactors; i++) {
      const angle = i * angleStep - Math.PI / 2
      const riskValue = riskFactors[i].score / 30
      const x = centerX + radius * riskValue * Math.cos(angle)
      const y = centerY + radius * riskValue * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = theme === "hacker" ? "#ff0000" : "#ff6666"
      ctx.fill()
    }

    // Draw title
    ctx.fillStyle = theme === "hacker" ? "#ff3333" : "#ffffff"
    ctx.font = "bold 12px monospace"
    ctx.textAlign = "center"
    ctx.fillText(`${protocol.name} Risk Assessment`, centerX, 15)

    // Draw health score
    ctx.fillStyle = getHealthScoreColor(protocol.healthScore)
    ctx.font = "bold 24px monospace"
    ctx.textAlign = "center"
    ctx.fillText(`${protocol.healthScore}`, centerX, centerY - 10)

    ctx.fillStyle = theme === "hacker" ? "#00ff00" : "#ffffff"
    ctx.font = "10px monospace"
    ctx.fillText("Health Score", centerX, centerY + 10)
  }, [selectedProtocol, theme])

  return (
    // <div className="flex flex-col h-full">
    //   <div className="p-2 border-b border-gray-800">
    //     <div className="relative">
    //       <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
    //       <input
    //         type="text"
    //         placeholder="Search protocols..."
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         className="w-full bg-gray-900 border border-gray-800 rounded px-8 py-1 text-sm text-white focus:outline-none focus:border-gray-700"
    //       />
    //     </div>
    //   </div>

    //   <div className="flex-1 flex">
    //     {/* Protocol list */}
    //     <div className="w-2/3 overflow-auto border-r border-gray-800">
    //       <table className="w-full text-sm">
    //         <thead>
    //           <tr className={`sticky top-0 bg-black ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
    //             <th className="text-left p-2 cursor-pointer" onClick={() => handleSort("name")}>
    //               Protocol
    //             </th>
    //             <th className="text-left p-2">Category</th>
    //             <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("tvl")}>
    //               TVL
    //             </th>
    //             <th className="text-right p-2">TVL</th>
    //             <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("tvlChange24h")}>
    //               24h Change
    //             </th>
    //             <th className="text-right p-2 cursor-pointer" onClick={() => handleSort("healthScore")}>
    //               Health Score
    //             </th>
    //             <th className="text-center p-2">Trend</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {filteredProtocols.map((protocol) => (
    //             <tr
    //               key={protocol.id}
    //               className={`border-b border-gray-800 hover:bg-gray-900 cursor-pointer ${selectedProtocol === protocol.id ? "bg-gray-900" : ""}`}
    //               onClick={() => setSelectedProtocol(protocol.id)}
    //             >
    //               <td className={`p-2 ${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
    //                 {protocol.name}
    //               </td>
    //               <td className="p-2 text-gray-300">{protocol.category}</td>
    //               <td className="p-2 text-right font-mono">{formatTVL(protocol.tvl)}</td>
    //               <td
    //                 className={`p-2 text-right ${protocol.tvlChange24h >= 0 ? (theme === "hacker" ? "text-green-500" : "text-green-400") : theme === "hacker" ? "text-red-500" : "text-red-400"}`}
    //               >
    //                 {protocol.tvlChange24h > 0 ? "+" : ""}
    //                 {protocol.tvlChange24h.toFixed(1)}%
    //               </td>
    //               <td className={`p-2 text-right font-bold ${getHealthScoreColor(protocol.healthScore)}`}>
    //                 {protocol.healthScore}
    //               </td>
    //               <td className="p-2 text-center">{getTrendIcon(protocol.healthTrend)}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>

    //     {/* Risk visualization */}
    //     <div className="w-1/3 p-4 flex flex-col">
    //       {selectedProtocol ? (
    //         <>
    //           <div className="mb-4">
    //             <h3 className={`text-lg font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
    //               {mockProtocolData.find((p) => p.id === selectedProtocol)?.name} Risk Analysis
    //             </h3>
    //             <div className="flex items-center mt-1">
    //               <span className="text-gray-400 text-sm mr-2">Category:</span>
    //               <span className={`${theme === "hacker" ? "text-green-500" : "text-white"}`}>
    //                 {mockProtocolData.find((p) => p.id === selectedProtocol)?.category}
    //               </span>
    //             </div>
    //           </div>
    //           <div className="flex-1 bg-black/30 border border-gray-800 rounded">
    //             <canvas ref={chartRef} width={400} height={300} className="w-full h-full" />
    //           </div>

    //           {/* Risk factors */}
    //           <div className="mt-4">
    //             <h4 className={`text-sm font-bold ${theme === "hacker" ? "text-red-500" : "text-white"} mb-2`}>
    //               Risk Factors
    //             </h4>
    //             <div className="space-y-2">
    //               {mockProtocolData
    //                 .find((p) => p.id === selectedProtocol)
    //                 ?.riskFactors.map((factor, idx) => (
    //                   <div key={idx} className="flex justify-between items-center">
    //                     <span className="text-sm text-gray-300">{factor.type}:</span>
    //                     <div className="flex items-center">
    //                       <div className="w-24 h-2 bg-gray-800 rounded-full mr-2">
    //                         <div
    //                           className={`h-full rounded-full ${factor.score > 20 ? "bg-red-500" : factor.score > 10 ? "bg-yellow-500" : "bg-green-500"}`}
    //                           style={{ width: `${(factor.score / 30) * 100}%` }}
    //                         />
    //                       </div>
    //                       <span className="text-xs text-gray-400">{factor.score}/30</span>
    //                     </div>
    //                   </div>
    //                 ))}
    //             </div>
    //           </div>

    //           {/* Last incident */}
    //           {mockProtocolData.find((p) => p.id === selectedProtocol)?.lastIncident && (
    //             <div className="mt-4 p-2 border border-gray-800 rounded bg-red-900/10">
    //               <h4
    //                 className={`text-sm font-bold ${theme === "hacker" ? "text-red-500" : "text-red-400"} flex items-center`}
    //               >
    //                 <AlertTriangle size={14} className="mr-1" />
    //                 Last Security Incident
    //               </h4>
    //               <div className="mt-1 text-sm">
    //                 <div className="flex justify-between">
    //                   <span className="text-gray-300">
    //                     {mockProtocolData.find((p) => p.id === selectedProtocol)?.lastIncident?.type}
    //                   </span>
    //                   <span className="text-gray-400">
    //                     {mockProtocolData.find((p) => p.id === selectedProtocol)?.lastIncident?.date}
    //                   </span>
    //                 </div>
    //                 <p className="text-gray-400 text-xs mt-1">
    //                   {mockProtocolData.find((p) => p.id === selectedProtocol)?.lastIncident?.description}
    //                 </p>
    //               </div>
    //             </div>
    //           )}
    //         </>
    //       ) : (
    //         <div className="flex items-center justify-center h-full text-gray-500">
    //           Select a protocol to view risk analysis
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="p-2 h-full bg-black text-white">
      <div className="space-y-2">
        {protocols.map((protocol, index) => (
          <div
            key={index}
            className={`p-2 border rounded flex items-center justify-between ${
              theme === "bw"
                ? "border-white/30 bg-white/5"
                : protocol.health === "healthy"
                  ? "border-green-500/30 bg-green-900/10"
                  : protocol.health === "warning"
                    ? "border-yellow-500/30 bg-yellow-900/10"
                    : "border-red-500/30 bg-red-900/10"
            }`}
          >
            <div className="flex items-center">
              <div className="mr-2">
                {theme === "bw" ? (
                  <Activity size={16} className="text-white" />
                ) : protocol.health === "healthy" ? (
                  <Activity size={16} className="text-green-500" />
                ) : protocol.health === "warning" ? (
                  <Activity size={16} className="text-yellow-500" />
                ) : (
                  <Activity size={16} className="text-red-500" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium">{protocol.name}</div>
                <div className="text-xs text-gray-400">TVL: {protocol.tvl}</div>
              </div>
            </div>
            <div className="flex items-center">
              {protocol.change.startsWith("+") ? (
                <TrendingUp size={14} className={theme === "bw" ? "text-white mr-1" : "text-green-500 mr-1"} />
              ) : (
                <TrendingDown size={14} className={theme === "bw" ? "text-white mr-1" : "text-red-500 mr-1"} />
              )}
              <span
                className={
                  theme === "bw"
                    ? "text-white text-xs"
                    : protocol.change.startsWith("+")
                      ? "text-green-500 text-xs"
                      : "text-red-500 text-xs"
                }
              >
                {protocol.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

