"use client"

import React from "react"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { MarketDataVisualization } from "./market-data-visualization"
import { LiveNewsFeed } from "./live-news-feed"
import { SecurityAlerts } from "./security-alerts"
import { ProtocolHealthMonitor } from "./protocol-health-monitor"
import { WalletWatchlistWidget } from "./wallet-watchlist-widget"
import { TokenUnlockWidget } from "./token-unlock-widget"
import { GovernanceWidget } from "./governance-widget"
import { RektAIAssistant } from "./rekt-ai-assistant"
import { ExploitStats } from "./exploit-stats"
import { RektRadar } from "./rekt-radar"
import { X, Menu } from "lucide-react"
import { useIsMobile } from "../hooks/use-mobile"

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
    { id: "rektRadar", title: "REKT RADAR", closable: false, content: <RektRadar /> },
    { id: "market", title: "MARKET DATA", closable: false, content: <MarketDataVisualization /> },
    { id: "news", title: "LIVE NEWS", closable: false, content: <LiveNewsFeed /> },
    { id: "security", title: "SECURITY ALERTS", closable: false, content: <SecurityAlerts /> },
    { id: "health", title: "PROTOCOL HEALTH", closable: false, content: <ProtocolHealthMonitor /> },
    { id: "stats", title: "EXPLOIT STATS", closable: true, content: <ExploitStats /> },
  ])
  const [activeTab, setActiveTab] = useState("rektRadar")
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
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
      <div className="h-full">
        <RektAIAssistant
          onMaximize={toggleAiFullscreen}
          onBackToDashboard={() => setAiFullscreen(false)}
          isFullscreen={true}
        />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
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
        <div className="bg-black border-b border-gray-800 p-2 z-50">
          <div className="flex flex-col space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`text-left p-2 rounded ${
                  activeTab === tab.id
                    ? theme === "hacker"
                      ? "bg-green-900/30 text-green-500"
                      : "bg-gray-800 text-white"
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
        {/* Main tab area - takes 70% of the height */}
        <div className="h-[70%] overflow-hidden">
          <div className="flex border-b border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? theme === "hacker"
                      ? "bg-green-900/20 text-green-500 border-b-2 border-green-500"
                      : "bg-gray-900 text-white border-b-2 border-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="h-[calc(100%-40px)] overflow-auto">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
        </div>

        {/* Mini windows area - takes 30% of the height */}
        <div className="h-[30%] border-t border-gray-800 flex flex-col md:flex-row">
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
                <div className="bg-black p-1 border-b border-gray-800 flex justify-between items-center">
                  <span className={`text-xs font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
                    REKT AI ASSISTANT
                  </span>
                  <button className="text-gray-500 hover:text-white" onClick={toggleAiFullscreen}>
                    <X size={12} />
                  </button>
                </div>
                <div className="flex-1 overflow-auto">
                  <RektAIAssistant onMaximize={toggleAiFullscreen} onBackToDashboard={() => {}} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

