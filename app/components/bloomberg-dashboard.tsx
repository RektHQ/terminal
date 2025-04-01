"use client"

import React from "react"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { TabSystem } from "./tab-system"
import { MarketDataVisualization } from "./market-data-visualization"
import { LiveNewsFeed } from "./live-news-feed"
import { SecurityAlerts } from "./security-alerts"
import { ProtocolHealthMonitor } from "./protocol-health-monitor"
import { RiskAlertWidget } from "./risk-alert-widget"
import { WalletWatchlistWidget } from "./wallet-watchlist-widget"
import { TokenUnlockWidget } from "./token-unlock-widget"
import { GovernanceWidget } from "./governance-widget"
import { RektAIAssistant } from "./rekt-ai-assistant"
import { ExploitStats } from "./exploit-stats"
import { AICapabilitiesWidget } from "./ai-capabilities-widget"
import { X, Menu } from "lucide-react"
import { TerminalFooter } from "./terminal-footer"
import { TerminalHeader } from "./terminal-header"
import { MarketTicker } from "./market-ticker"
import { SubscriptionBanner } from "./subscription-banner"
import { useIsMobile } from "./hooks/use-mobile"

interface BloombergDashboardProps {
  onClose?: () => void
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

export function BloombergDashboard({
  onClose,
  isFullscreen = false,
  onToggleFullscreen = () => {},
}: BloombergDashboardProps) {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const [tabs, setTabs] = useState([
    { id: "market", title: "MARKET DATA", closable: false },
    { id: "news", title: "LIVE NEWS", closable: false },
    { id: "security", title: "SECURITY ALERTS", closable: false },
    { id: "health", title: "PROTOCOL HEALTH", closable: false },
    { id: "risk", title: "RISK DASHBOARD", closable: true },
    { id: "stats", title: "EXPLOIT STATS", closable: true },
    { id: "capabilities", title: "AI CAPABILITIES", closable: true },
  ])
  const [activeTab, setActiveTab] = useState("market")
  const [showTabMenu, setShowTabMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [aiFullscreen, setAiFullscreen] = useState(false)

  // Add a state for the mini-windows that will be shown at the bottom
  const [miniWindows, setMiniWindows] = useState([
    { id: "governance", title: "GOVERNANCE", component: GovernanceWidget },
    { id: "wallet", title: "WALLET WATCHLIST", component: WalletWatchlistWidget },
    { id: "unlock", title: "TOKEN UNLOCKS", component: TokenUnlockWidget },
  ])

  // For mobile, we'll show only one mini window at a time
  const [activeMiniWindow, setActiveMiniWindow] = useState(0)

  const handleTabClose = (tabId: string) => {
    setTabs(tabs.filter((tab) => tab.id !== tabId))
    if (activeTab === tabId) {
      setActiveTab(tabs[0].id)
    }
  }

  const addTab = (id: string, title: string) => {
    if (!tabs.some((tab) => tab.id === id)) {
      setTabs([...tabs, { id, title, closable: true }])
      setActiveTab(id)
    } else {
      setActiveTab(id)
    }
    setShowTabMenu(false)
  }

  const getTabContent = (tabId: string) => {
    switch (tabId) {
      case "market":
        return <MarketDataVisualization />
      case "news":
        return <LiveNewsFeed />
      case "security":
        return <SecurityAlerts />
      case "health":
        return <ProtocolHealthMonitor />
      case "risk":
        return (
          <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
            <RiskAlertWidget />
            <WalletWatchlistWidget />
          </div>
        )
      case "governance":
        return (
          <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
            <GovernanceWidget />
            <TokenUnlockWidget />
          </div>
        )
      case "ai":
        return <RektAIAssistant />
      case "stats":
        return <ExploitStats />
      case "capabilities":
        return <AICapabilitiesWidget />
      default:
        return <div>Tab content not found</div>
    }
  }

  const handleExecuteCommand = (command: string) => {
    if (command === "terminal" && onClose) {
      onClose()
    }
  }

  // Handle next/previous mini window for mobile
  const nextMiniWindow = () => {
    setActiveMiniWindow((prev) => (prev + 1) % miniWindows.length)
  }

  const prevMiniWindow = () => {
    setActiveMiniWindow((prev) => (prev - 1 + miniWindows.length) % miniWindows.length)
  }

  // Toggle AI assistant fullscreen mode
  const toggleAiFullscreen = () => {
    setAiFullscreen(!aiFullscreen)
  }

  // If AI is in fullscreen mode, show only the AI assistant
  if (aiFullscreen) {
    return (
      <div className="flex flex-col h-full w-full">
        <TerminalHeader
          onExecuteCommand={handleExecuteCommand}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
          onClose={onClose || (() => {})}
        />
        <div className="flex-1">
          <RektAIAssistant
            onMaximize={toggleAiFullscreen}
            onBackToDashboard={() => setAiFullscreen(false)}
            isFullscreen={true}
          />
        </div>
        <TerminalFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header components */}
      <TerminalHeader
        onExecuteCommand={handleExecuteCommand}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        onClose={onClose || (() => {})}
      />
      <MarketTicker />
      <SubscriptionBanner />

      {/* Mobile menu button */}
      {isMobile && (
        <div className="p-2 border-b border-gray-800 flex justify-between items-center">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`p-2 rounded ${theme === "hacker" ? "text-green-500" : "text-white"}`}
          >
            <Menu size={20} />
          </button>
          <span className={`font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
            {tabs.find((tab) => tab.id === activeTab)?.title || "DASHBOARD"}
          </span>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      )}

      {/* Mobile menu */}
      {isMobile && showMobileMenu && (
        <div className="bg-black border-b border-gray-800 p-2">
          <div className="flex flex-col space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`text-left p-2 rounded ${
                  activeTab === tab.id
                    ? theme === "hacker"
                      ? "bg-green-900/30 text-green-500"
                      : "bg-blue-900/30 text-white"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  setActiveTab(tab.id)
                  setShowMobileMenu(false)
                }}
              >
                {tab.title}
              </button>
            ))}
            <button
              className={`text-left p-2 rounded ${theme === "hacker" ? "text-red-500" : "text-white"}`}
              onClick={() => {
                if (onClose) onClose()
                setShowMobileMenu(false)
              }}
            >
              TERMINAL VIEW
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* Main tab area - takes 30% of the height to show more content in mini windows */}
        <div className={`${isMobile ? "h-[30%]" : "h-[30%]"}`}>
          <TabSystem
            tabs={tabs.map((tab) => ({
              ...tab,
              content: getTabContent(tab.id),
            }))}
            defaultActiveTab={activeTab}
            onTabClose={handleTabClose}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Mini windows area - takes 70% of the height to show more content */}
        <div
          className={`${isMobile ? "h-[70%]" : "h-[70%]"} border-t border-gray-800 flex flex-col md:flex-row flex-grow`}
        >
          {isMobile ? (
            // Mobile view - show one mini window at a time with navigation
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="bg-black p-1 border-b border-gray-800 flex justify-between items-center">
                <button className="text-gray-500 hover:text-white px-2" onClick={prevMiniWindow}>
                  ◀
                </button>
                <span className={`text-xs font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                  {miniWindows[activeMiniWindow].title}
                </span>
                <button className="text-gray-500 hover:text-white px-2" onClick={nextMiniWindow}>
                  ▶
                </button>
              </div>
              <div className="flex-1 overflow-auto">{React.createElement(miniWindows[activeMiniWindow].component)}</div>
            </div>
          ) : (
            // Desktop view - show all mini windows side by side
            <>
              {miniWindows.map((window) => (
                <div key={window.id} className="flex-1 border-r border-gray-800 overflow-hidden flex flex-col">
                  <div className="bg-black p-1 border-b border-gray-800 flex justify-between items-center">
                    <span className={`text-xs font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                      {window.title}
                    </span>
                    <button
                      className="text-gray-500 hover:text-white"
                      onClick={() => setMiniWindows(miniWindows.filter((w) => w.id !== window.id))}
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <window.component />
                  </div>
                </div>
              ))}

              {/* Add RektGPT Assistant as a fixed mini window */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-auto">
                  <RektAIAssistant onMaximize={toggleAiFullscreen} onBackToDashboard={() => {}} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add the footer back */}
      <TerminalFooter />
    </div>
  )
}

