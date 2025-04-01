"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "../contexts/theme-context"
import type { HackVisualization as HackVisualizationType } from "../types/hack-visualization"

interface HackVisualizationProps {
  data: HackVisualizationType
}

export function HackVisualization({ data }: HackVisualizationProps) {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"

  // This is a simplified visualization - in a real app, you'd use a proper graph visualization library
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up colors based on theme
    const nodeColors: Record<string, string> = {
      source: theme === "hacker" ? "#ff3333" : "#ff6666",
      attacker: theme === "hacker" ? "#ff0000" : "#ff4444",
      mixer: theme === "hacker" ? "#ff9900" : "#ffaa33",
      exchange: theme === "hacker" ? "#00ccff" : "#66ddff",
      wallet: theme === "hacker" ? "#00ff00" : "#66ff66",
      bridge: theme === "hacker" ? "#cc00ff" : "#dd66ff",
      defi: theme === "hacker" ? "#ffff00" : "#ffff66",
    }

    const lineColor = theme === "hacker" ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"
    const textColor = theme === "hacker" ? "#00ff00" : "#ffffff"

    // Calculate node positions (simplified layout)
    const nodePositions: Record<string, { x: number; y: number }> = {}
    const nodeRadius = 20

    // Simple circular layout
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - nodeRadius - 20

    data.nodes.forEach((node, i) => {
      const angle = (i / data.nodes.length) * 2 * Math.PI
      nodePositions[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    })

    // Draw connections
    data.connections.forEach((conn) => {
      const fromPos = nodePositions[conn.from]
      const toPos = nodePositions[conn.to]

      if (!fromPos || !toPos) return

      ctx.beginPath()
      ctx.moveTo(fromPos.x, fromPos.y)
      ctx.lineTo(toPos.x, toPos.y)
      ctx.strokeStyle = lineColor
      ctx.lineWidth = Math.max(1, conn.value / 2)
      ctx.stroke()

      // Draw connection label
      if (conn.label) {
        const midX = (fromPos.x + toPos.x) / 2
        const midY = (fromPos.y + toPos.y) / 2

        ctx.fillStyle = textColor
        ctx.font = "10px monospace"
        ctx.textAlign = "center"
        ctx.fillText(conn.label, midX, midY - 5)
      }
    })

    // Draw nodes
    data.nodes.forEach((node) => {
      const pos = nodePositions[node.id]
      if (!pos) return

      ctx.beginPath()
      ctx.arc(pos.x, pos.y, nodeRadius, 0, 2 * Math.PI)
      ctx.fillStyle = nodeColors[node.group || "wallet"]
      ctx.fill()

      // Highlight hovered node
      if (hoveredNode === node.id) {
        ctx.strokeStyle = theme === "hacker" ? "#ffffff" : "#000000"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw node label
      ctx.fillStyle = "#000000"
      ctx.font = "bold 10px monospace"
      ctx.textAlign = "center"
      ctx.fillText(node.label, pos.x, pos.y + 3)
    })

    // Add event listeners for hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let hoveredId: string | null = null

      // Check if mouse is over any node
      for (const node of data.nodes) {
        const pos = nodePositions[node.id]
        if (!pos) continue

        const dx = pos.x - x
        const dy = pos.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance <= nodeRadius) {
          hoveredId = node.id
          break
        }
      }

      setHoveredNode(hoveredId)
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [data, theme, hoveredNode])

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <h3 className={`${headerClass} text-lg font-bold mb-2`}>{data.title}</h3>
      <p className={`${textClass} mb-4`}>{data.description}</p>

      <div className="relative">
        <canvas ref={canvasRef} width={600} height={400} className="w-full h-[400px] bg-black/30" />

        {hoveredNode && (
          <div className="absolute bottom-2 left-2 bg-black/80 p-2 rounded">
            <div className={textClass}>{data.nodes.find((n) => n.id === hoveredNode)?.label || "Unknown"}</div>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Object.entries({
          source: "Source Contract",
          attacker: "Attacker",
          mixer: "Mixer",
          exchange: "Exchange",
          wallet: "Wallet",
          bridge: "Bridge",
          defi: "DeFi Protocol",
        }).map(([key, label]) => (
          <div key={key} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{
                backgroundColor:
                  theme === "hacker"
                    ? key === "source"
                      ? "#ff3333"
                      : key === "attacker"
                        ? "#ff0000"
                        : key === "mixer"
                          ? "#ff9900"
                          : key === "exchange"
                            ? "#00ccff"
                            : key === "wallet"
                              ? "#00ff00"
                              : key === "bridge"
                                ? "#cc00ff"
                                : "#ffff00"
                    : key === "source"
                      ? "#ff6666"
                      : key === "attacker"
                        ? "#ff4444"
                        : key === "mixer"
                          ? "#ffaa33"
                          : key === "exchange"
                            ? "#66ddff"
                            : key === "wallet"
                              ? "#66ff66"
                              : key === "bridge"
                                ? "#dd66ff"
                                : "#ffff66",
              }}
            />
            <span className="text-xs text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          Note: This is a simplified visualization. Actual fund flows may be more complex.
        </p>
      </div>
    </div>
  )
}

