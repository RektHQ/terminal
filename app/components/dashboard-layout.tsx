"use client"

import { useState, useRef } from "react"
import { useTheme } from "../contexts/theme-context"
import { RiskAlertWidget } from "./risk-alert-widget"
import { WalletWatchlistWidget } from "./wallet-watchlist-widget"
import { TokenUnlockWidget } from "./token-unlock-widget"
import { GovernanceWidget } from "./governance-widget"
import { RektAIAssistant } from "./rekt-ai-assistant"
import { NewsFeed } from "./news-feed"
import { AICapabilitiesWidget } from "./ai-capabilities-widget"
import { mockFeedItems } from "../data/mock-news-feed"
import { LayoutGrid, FileText, TerminalIcon, Menu } from "lucide-react"
import { DashboardWidget } from "./dashboard-widget"
import { TerminalFooter } from "./terminal-footer"
import { TerminalHeader } from "./terminal-header"
import { MarketTicker } from "./market-ticker"
import { useIsMobile } from "../hooks/use-mobile"
import { SecurityAlerts } from "./security-alerts"
import { ProtocolHealthMonitor } from "./protocol-health-monitor"
import { MarketDataVisualization } from "./market-data-visualization"

interface DashboardLayoutProps {
  onClose?: () => void
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
  onExecuteCommand?: (command: string) => void
  onBackToTerminal?: () => void
}

export default function DashboardLayout({
  onClose,
  isFullscreen = false,
  onToggleFullscreen = () => {},
  onExecuteCommand,
  onBackToTerminal,
}: DashboardLayoutProps) {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleExecuteCommand = (command: string) => {
    if (command === "terminal" && onClose) {
      onClose()
    }

    if (onExecuteCommand) {
      onExecuteCommand(command)
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-black">
      {/* Main layout with header, content, and footer */}
      <div className="flex flex-col h-full">
        {/* Header and market ticker */}
        <TerminalHeader
          onExecuteCommand={onExecuteCommand || handleExecuteCommand}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
          onClose={onClose || (() => {})}
        />
        <MarketTicker />

        {/* Dashboard title bar */}
        <div className="flex justify-between items-center p-2 border-b border-gray-800 bg-black">
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

        {/* Main content area with two columns */}
        <div className="flex flex-1 overflow-hidden w-full">
          {/* Left column: Dashboard widgets in a fixed grid */}
          <div
            ref={containerRef}
            className="flex-1 overflow-auto p-2 bg-black"
            style={{
              height: "calc(100vh - 150px)",
              overflowY: "auto",
              overflowX: "hidden",
              width: "calc(100% - 384px)", // Subtract the AI assistant width
            }}
          >
            <div className="grid grid-cols-2 gap-2 h-full">
              {/* First row */}
              <div className="border border-gray-800 bg-black">
                <RiskAlertWidget />
              </div>
              <div className="border border-gray-800 bg-black">
                <WalletWatchlistWidget />
              </div>

              {/* Second row */}
              <div className="border border-gray-800 bg-black col-span-2">
                <DashboardWidget title="LIVE NEWS FEED">
                  <div className="h-full overflow-auto">
                    <NewsFeed items={mockFeedItems} title="" />
                  </div>
                </DashboardWidget>
              </div>

              {/* Third row */}
              <div className="border border-gray-800 bg-black">
                <TokenUnlockWidget />
              </div>
              <div className="border border-gray-800 bg-black">
                <GovernanceWidget />
              </div>

              {/* Fourth row (previously fifth) */}
              <div className="border border-gray-800 bg-black">
                <DashboardWidget title="SECURITY ALERTS">
                  <div className="h-full overflow-auto">
                    <SecurityAlerts />
                  </div>
                </DashboardWidget>
              </div>
              <div className="border border-gray-800 bg-black">
                <DashboardWidget title="PROTOCOL HEALTH">
                  <div className="h-full overflow-auto">
                    <ProtocolHealthMonitor />
                  </div>
                </DashboardWidget>
              </div>

              {/* Fifth row (previously sixth) */}
              <div className="border border-gray-800 bg-black col-span-2">
                <DashboardWidget title="MARKET DATA">
                  <div className="h-full overflow-auto">
                    <MarketDataVisualization />
                  </div>
                </DashboardWidget>
              </div>

              {/* Sixth row (previously seventh) */}
              <div className="border border-gray-800 bg-black col-span-2">
                <AICapabilitiesWidget />
              </div>
            </div>
          </div>

          {/* Right column: AI Assistant */}
          <div className="w-96 border-l border-gray-800 bg-black">
            <RektAIAssistant onExecuteCommand={onExecuteCommand || handleExecuteCommand} isFullscreen={false} />
          </div>
        </div>

        {/* Footer */}
        <TerminalFooter />
      </div>
    </div>
  )
}

