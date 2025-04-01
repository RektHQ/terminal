"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "../contexts/theme-context"
import { RiskAlertWidget } from "./risk-alert-widget"
import { WalletWatchlistWidget } from "./wallet-watchlist-widget"
import { TokenUnlockWidget } from "./token-unlock-widget"
import { GovernanceWidget } from "./governance-widget"
import { RektAIAssistant } from "./rekt-ai-assistant"
import { NewsFeed } from "./news-feed"
import { ExploitStats } from "./exploit-stats"
import { AICapabilitiesWidget } from "./ai-capabilities-widget"
import { mockFeedItems } from "../data/mock-news-feed"
import { Plus, LayoutGrid, Grid, FileText, TerminalIcon, Menu } from "lucide-react"
import { DashboardWidget } from "./dashboard-widget"
import { TerminalFooter } from "./terminal-footer"
import { TerminalHeader } from "./terminal-header"
import { MarketTicker } from "./market-ticker"
import { SubscriptionBanner } from "./subscription-banner"
import { useIsMobile } from "../hooks/use-mobile"

type WidgetType = "risk" | "wallet" | "unlock" | "governance" | "ai" | "news" | "stats" | "capabilities"

interface WidgetConfig {
  id: string
  type: WidgetType
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMaximized: boolean
}

interface DashboardLayoutProps {
  onClose?: () => void
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

export default function DashboardLayout({
  onClose,
  isFullscreen = false,
  onToggleFullscreen = () => {},
}: DashboardLayoutProps) {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  // Start with more widgets by default for a Bloomberg-style layout
  const [widgetConfigs, setWidgetConfigs] = useState<WidgetConfig[]>([
    { id: "risk-1", type: "risk", position: { x: 0, y: 0 }, size: { width: 500, height: 400 }, isMaximized: false },
    {
      id: "wallet-1",
      type: "wallet",
      position: { x: 510, y: 0 },
      size: { width: 600, height: 400 },
      isMaximized: false,
    },
    {
      id: "unlock-1",
      type: "unlock",
      position: { x: 0, y: 410 },
      size: { width: 500, height: 400 },
      isMaximized: false,
    },
    {
      id: "governance-1",
      type: "governance",
      position: { x: 510, y: 410 },
      size: { width: 600, height: 400 },
      isMaximized: false,
    },
    { id: "news-1", type: "news", position: { x: 1120, y: 0 }, size: { width: 500, height: 400 }, isMaximized: false },
    {
      id: "stats-1",
      type: "stats",
      position: { x: 1120, y: 410 },
      size: { width: 500, height: 200 },
      isMaximized: false,
    },
    { id: "ai-1", type: "ai", position: { x: 0, y: 820 }, size: { width: 1000, height: 300 }, isMaximized: false },
    {
      id: "capabilities-1",
      type: "capabilities",
      position: { x: 0, y: 1130 },
      size: { width: 1000, height: 300 },
      isMaximized: false,
    },
  ])
  const [showWidgetMenu, setShowWidgetMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [maximizedWidget, setMaximizedWidget] = useState<string | null>(null)
  const [isGridView, setIsGridView] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-arrange widgets in a grid on mount
  useEffect(() => {
    if (isGridView) {
      arrangeWidgetsInGrid()
    }
  }, [isGridView])

  const arrangeWidgetsInGrid = () => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    // Define a custom layout for better organization
    const layout = [
      // First row
      { id: "risk-1", col: 0, row: 0, colSpan: 1, rowSpan: 1 },
      { id: "wallet-1", col: 1, row: 0, colSpan: 1, rowSpan: 1 },
      { id: "news-1", col: 2, row: 0, colSpan: 1, rowSpan: 1 },

      // Second row
      { id: "unlock-1", col: 0, row: 1, colSpan: 1, rowSpan: 1 },
      { id: "governance-1", col: 1, row: 1, colSpan: 1, rowSpan: 1 },
      { id: "stats-1", col: 2, row: 1, colSpan: 1, rowSpan: 0.5 },

      // Third row
      { id: "ai-1", col: 0, row: 2, colSpan: 2, rowSpan: 1 },

      // Fourth row
      { id: "capabilities-1", col: 0, row: 3, colSpan: 3, rowSpan: 1 },
    ]

    const columns = isMobile ? 1 : 3
    const rows = isMobile ? 7 : 4

    const baseWidgetWidth = containerWidth / columns
    const baseWidgetHeight = containerHeight / rows

    const newConfigs = widgetConfigs.map((config) => {
      const layoutItem = layout.find((item) => item.id === config.id)

      if (!layoutItem) return config

      const x = layoutItem.col * baseWidgetWidth
      const y = layoutItem.row * baseWidgetHeight
      const width = layoutItem.colSpan * baseWidgetWidth - 10
      const height = layoutItem.rowSpan * baseWidgetHeight - 10

      return {
        ...config,
        position: { x, y },
        size: { width, height },
        isMaximized: false,
      }
    })

    setWidgetConfigs(newConfigs)
    setMaximizedWidget(null)
  }

  const addWidget = (type: WidgetType) => {
    const id = `${type}-${Date.now()}`

    // Default position in the center
    const position = { x: 100, y: 100 }

    // Default size based on widget type
    let size = { width: 400, height: 300 }

    if (type === "stats" || type === "news") {
      size = { width: 500, height: 400 }
    } else if (type === "ai") {
      size = { width: 800, height: 300 }
    } else if (type === "capabilities") {
      size = { width: 800, height: 400 }
    }

    setWidgetConfigs([...widgetConfigs, { id, type, position, size, isMaximized: false }])
    setShowWidgetMenu(false)
  }

  const removeWidget = (id: string) => {
    setWidgetConfigs(widgetConfigs.filter((config) => config.id !== id))
    if (maximizedWidget === id) {
      setMaximizedWidget(null)
    }
  }

  const maximizeWidget = (id: string) => {
    if (maximizedWidget === id) {
      // Restore the widget
      setWidgetConfigs(widgetConfigs.map((config) => (config.id === id ? { ...config, isMaximized: false } : config)))
      setMaximizedWidget(null)
    } else {
      // Maximize the widget
      setWidgetConfigs(widgetConfigs.map((config) => (config.id === id ? { ...config, isMaximized: true } : config)))
      setMaximizedWidget(id)
    }
  }

  const handleWidgetDragStart = (id: string) => {
    // Bring the widget to the front by updating its z-index
    setWidgetConfigs(
      widgetConfigs.map((config) => (config.id === id ? { ...config, zIndex: 10 } : { ...config, zIndex: 1 })),
    )
  }

  const handleWidgetDragEnd = (id: string, x: number, y: number) => {
    setWidgetConfigs(widgetConfigs.map((config) => (config.id === id ? { ...config, position: { x, y } } : config)))
  }

  const handleWidgetResize = (id: string, width: number, height: number) => {
    setWidgetConfigs(
      widgetConfigs.map((config) => (config.id === id ? { ...config, size: { width, height } } : config)),
    )
  }

  const renderWidget = (config: WidgetConfig) => {
    const { id, type, isMaximized, position, size } = config

    const widgetStyle: React.CSSProperties = {
      position: isMaximized ? "fixed" : "absolute",
      left: position.x,
      top: position.y,
      width: size.width,
      height: size.height,
      zIndex: isMaximized ? 50 : 1,
    }

    const widgetProps = {
      id,
      onClose: () => removeWidget(id),
      onMaximize: () => maximizeWidget(id),
      isMaximized,
      onDragStart: () => handleWidgetDragStart(id),
      onDragEnd: (x: number, y: number) => handleWidgetDragEnd(id, x, y),
      onResize: (width: number, height: number) => handleWidgetResize(id, width, height),
      style: widgetStyle,
    }

    switch (type) {
      case "risk":
        return (
          <div style={widgetStyle}>
            <RiskAlertWidget key={id} {...widgetProps} />
          </div>
        )
      case "wallet":
        return (
          <div style={widgetStyle}>
            <WalletWatchlistWidget key={id} {...widgetProps} />
          </div>
        )
      case "unlock":
        return (
          <div style={widgetStyle}>
            <TokenUnlockWidget key={id} {...widgetProps} />
          </div>
        )
      case "governance":
        return (
          <div style={widgetStyle}>
            <GovernanceWidget key={id} {...widgetProps} />
          </div>
        )
      case "news":
        return (
          <div style={widgetStyle}>
            <DashboardWidget key={id} title="LIVE NEWS FEED" {...widgetProps}>
              <div className="h-full overflow-auto">
                <NewsFeed items={mockFeedItems} title="" />
              </div>
            </DashboardWidget>
          </div>
        )
      case "stats":
        return (
          <div style={widgetStyle}>
            <DashboardWidget key={id} title="EXPLOIT STATISTICS" {...widgetProps}>
              <div className="h-full overflow-auto">
                <ExploitStats />
              </div>
            </DashboardWidget>
          </div>
        )
      case "ai":
        return (
          <div style={widgetStyle}>
            <RektAIAssistant key={id} onClose={() => removeWidget(id)} />
          </div>
        )
      case "capabilities":
        return (
          <div style={widgetStyle}>
            <AICapabilitiesWidget key={id} {...widgetProps} />
          </div>
        )
      default:
        return null
    }
  }

  const handleExecuteCommand = (command: string) => {
    if (command === "terminal" && onClose) {
      onClose()
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Include the header, market ticker, and subscription banner */}
      <TerminalHeader
        onExecuteCommand={handleExecuteCommand}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        onClose={onClose || (() => {})}
      />
      <MarketTicker />
      <SubscriptionBanner />

      <div className="flex justify-between items-center p-2 border-b border-gray-800">
        <div className="flex items-center">
          <LayoutGrid size={16} className={theme === "hacker" ? "text-red-500 mr-2" : "text-white mr-2"} />
          <h2 className={theme === "hacker" ? "text-red-500 font-bold" : "text-white font-bold"}>
            REKT AI INTELLIGENCE DASHBOARD
          </h2>
          {!isMobile && (
            <a
              href="https://www.rekt.news"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-6 flex items-center ${theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-blue-400 hover:text-blue-300"}`}
            >
              <FileText size={14} className="mr-1" />
              Articles
            </a>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isMobile && (
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`p-1 rounded ${theme === "hacker" ? "text-green-500" : "text-white"}`}
            >
              <Menu size={20} />
            </button>
          )}
          <button
            onClick={() => setIsGridView(!isGridView)}
            className={`p-1 rounded ${
              theme === "hacker"
                ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
            }`}
            title={isGridView ? "Free Arrange" : "Grid View"}
          >
            <Grid size={14} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowWidgetMenu(!showWidgetMenu)}
              className={`flex items-center px-2 py-1 rounded text-xs ${
                theme === "hacker"
                  ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                  : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
              }`}
            >
              <Plus size={14} className="mr-1" />
              Add Widget
            </button>

            {showWidgetMenu && (
              <div className="absolute right-0 top-full mt-1 bg-black border border-gray-800 rounded shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => addWidget("risk")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
                  >
                    Risk Alerts
                  </button>
                  <button
                    onClick={() => addWidget("wallet")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
                  >
                    Wallet Watchlist
                  </button>
                  <button
                    onClick={() => addWidget("unlock")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
                  >
                    Token Unlocks
                  </button>
                  <button
                    onClick={() => addWidget("governance")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
                  >
                    Governance Tracker
                  </button>
                  <button
                    onClick={() => addWidget("news")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
                  >
                    News Feed
                  </button>
                  <button
                    onClick={() => addWidget("stats")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
                  >
                    Exploit Statistics
                  </button>
                  <button
                    onClick={() => addWidget("ai")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
                  >
                    RektGPT Assistant
                  </button>
                  <button
                    onClick={() => addWidget("capabilities")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
                  >
                    AI Capabilities
                  </button>
                </div>
              </div>
            )}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center text-gray-400 hover:text-white px-2 py-1 rounded text-xs"
              title="Switch to Terminal View"
            >
              <TerminalIcon size={14} className="mr-1" />
              Terminal
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && showMobileMenu && (
        <div className="bg-black border-b border-gray-800 p-2 z-50">
          <div className="flex flex-col space-y-2">
            <a
              href="https://www.rekt.news"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center ${theme === "hacker" ? "text-green-500" : "text-blue-400"}`}
            >
              <FileText size={16} className="mr-2" />
              Articles
            </a>
            <button
              onClick={() => setIsGridView(!isGridView)}
              className={`flex items-center text-left ${theme === "hacker" ? "text-green-500" : "text-white"}`}
            >
              <Grid size={16} className="mr-2" />
              {isGridView ? "Free Arrange" : "Grid View"}
            </button>
            <button onClick={onClose} className="flex items-center text-gray-400 text-left">
              <TerminalIcon size={16} className="mr-2" />
              Terminal View
            </button>
            <button
              onClick={() => setShowMobileMenu(false)}
              className={`mt-2 w-full py-2 text-center rounded ${theme === "hacker" ? "bg-red-900/30 text-red-500" : "bg-gray-800 text-white"}`}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 relative"
        style={{ height: "calc(100vh - 320px)", position: "relative" }}
      >
        {widgetConfigs.map((config) => renderWidget(config))}
      </div>

      {/* Add the footer back */}
      <TerminalFooter />
    </div>
  )
}

