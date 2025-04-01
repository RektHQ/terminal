"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal, type TerminalRef } from "./components/terminal"
import { TerminalHeader } from "./components/terminal-header"
import { TerminalFooter } from "./components/terminal-footer"
import { LaunchButton } from "./components/launch-button"
import { MarketTicker } from "./components/market-ticker"
import { SubscriptionBanner } from "./components/subscription-banner"
import { BloombergDashboard } from "./components/bloomberg-dashboard"
import { useIsMobile } from "./hooks/use-mobile"
import { RektAIAssistant } from "./components/rekt-ai-assistant"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(true)
  const [isTerminalActive, setIsTerminalActive] = useState(true)
  const [activeView, setActiveView] = useState<"terminal" | "dashboard" | "bloomberg" | "ai">("bloomberg")
  const terminalRef = useRef<TerminalRef>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset scroll position when view changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [activeView])

  const handleExecuteCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()

    // Handle special view-switching commands
    if (lowerCommand === "dashboard") {
      setActiveView("dashboard")
      return
    }

    if (lowerCommand === "bloomberg") {
      setActiveView("bloomberg")
      return
    }

    if (lowerCommand === "terminal") {
      setActiveView("terminal")
      return
    }

    if (lowerCommand === "ai" || lowerCommand === "rektgpt") {
      setActiveView("ai")
      return
    }

    // For all other commands, pass to the terminal
    if (terminalRef.current) {
      terminalRef.current.handleCommand(command)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    // Ensure terminal scrolls to bottom after resize
    setTimeout(() => {
      if (terminalRef.current && activeView === "terminal") {
        terminalRef.current.scrollToBottom()
      }
    }, 100)
  }

  const closeTerminal = () => {
    setIsTerminalActive(false)
    setIsFullscreen(false)
    setActiveView("terminal")
  }

  const launchTerminal = () => {
    setIsTerminalActive(true)
  }

  const openAIConsole = () => {
    setActiveView("ai")
  }

  if (!mounted) return null

  if (!isTerminalActive) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
        <LaunchButton onLaunch={launchTerminal} />
      </main>
    )
  }

  return (
    <main className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <TerminalHeader
          onExecuteCommand={handleExecuteCommand}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          onClose={closeTerminal}
          onOpenAIConsole={openAIConsole}
        />
        <MarketTicker />
        <SubscriptionBanner />
      </div>

      {/* Scrollable Content */}
      <div ref={contentRef} className="flex-grow overflow-auto">
        {activeView === "terminal" ? (
          <Terminal ref={terminalRef} onOpenAIConsole={openAIConsole} onExecuteCommand={handleExecuteCommand} />
        ) : activeView === "dashboard" ? (
          <div className="h-full">Dashboard Content</div>
        ) : activeView === "ai" ? (
          <div className="h-full">
            <RektAIAssistant onBackToDashboard={() => setActiveView("terminal")} isFullscreen={true} />
          </div>
        ) : (
          <BloombergDashboard
            onClose={() => setActiveView("terminal")}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        )}
      </div>

      {/* Fixed Footer */}
      <div className="flex-shrink-0">
        <TerminalFooter />
      </div>
    </main>
  )
}

