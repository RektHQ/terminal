"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Zap, Moon, Sun, Monitor } from "lucide-react"
import { SecurityReport } from "./security-report"
import { NewsFeed } from "./news-feed"
import { DailyRecap } from "./daily-recap"
import { ReferralBanner } from "./referral-banner"
import { SubscriptionBanner } from "./subscription-banner"
import { MarketTicker } from "./market-ticker"
import { RektAIAssistant } from "./rekt-ai-assistant"
import { useTheme } from "../contexts/theme-context"

interface BloombergDashboardProps {
  onBackToTerminal: () => void
}

const BloombergDashboard: React.FC<BloombergDashboardProps> = ({ onBackToTerminal }) => {
  const [showAIConsole, setShowAIConsole] = useState(false)
  const [aiFullscreen, setAIFullscreen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleAIConsoleClick = () => {
    setShowAIConsole(!showAIConsole)
  }

  const handleExecuteCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase().trim()

    if (normalizedCommand === "ai" || normalizedCommand === "rektgpt") {
      setShowAIConsole(true)
      setAIFullscreen(true)
      return true
    }

    return false
  }

  return (
    <div className="bloomberg-dashboard">
      <div className="bloomberg-header">
        <div className="flex items-center">
          <button
            onClick={onBackToTerminal}
            className="mr-4 p-1 hover:bg-secondary rounded-md"
            aria-label="Back to Terminal"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-primary font-bold mr-2">REKT</span>
          <span className="text-muted-foreground">Bloomberg Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAIConsoleClick}
            className="p-1 hover:bg-secondary rounded-md"
            aria-label="Toggle AI Console"
          >
            <Zap className="h-5 w-5 text-primary" />
          </button>
          <button onClick={toggleTheme} className="p-1 hover:bg-secondary rounded-md" aria-label="Toggle Theme">
            {theme === "hacker" && <Moon className="h-5 w-5" />}
            {theme === "rekt" && <Sun className="h-5 w-5" />}
            {theme === "bw" && <Monitor className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MarketTicker />

      <div className="bloomberg-body">
        <div className="p-4">
          <SubscriptionBanner />
        </div>

        <div className="bloomberg-grid">
          <SecurityReport />
          <NewsFeed />
          <DailyRecap />
          <ReferralBanner />
        </div>
      </div>

      {showAIConsole && (
        <RektAIAssistant
          onClose={() => setShowAIConsole(false)}
          fullscreen={aiFullscreen}
          onToggleFullscreen={() => setAIFullscreen(!aiFullscreen)}
          onExecuteCommand={handleExecuteCommand}
        />
      )}
    </div>
  )
}

export default BloombergDashboard

