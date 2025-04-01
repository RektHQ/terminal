"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal, type TerminalRef } from "./components/terminal"
import { TerminalHeader } from "./components/terminal-header"
import { TerminalFooter } from "./components/terminal-footer"
import { LaunchButton } from "./components/launch-button"
import { MarketTicker } from "./components/market-ticker"
import { SubscriptionBanner } from "./components/subscription-banner"
import DashboardLayout from "./components/dashboard-layout"
import { BloombergDashboard } from "./components/bloomberg-dashboard"
import { useIsMobile } from "./hooks/use-mobile"
import { RektAIAssistant } from "./components/rekt-ai-assistant"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  // Set isFullscreen to true by default
  const [isFullscreen, setIsFullscreen] = useState(true)
  const [isTerminalActive, setIsTerminalActive] = useState(true)
  // Change the default view to "terminal" instead of "bloomberg"
  const [activeView, setActiveView] = useState<"terminal" | "dashboard" | "bloomberg" | "ai">("terminal")
  const terminalRef = useRef<TerminalRef>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

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

  // Determine container classes based on fullscreen state and mobile
  const containerClasses = isFullscreen
    ? "fixed inset-0 z-50 flex flex-col"
    : isMobile
      ? "w-full h-[80vh] flex flex-col"
      : "w-full max-w-5xl h-[80vh] flex flex-col"

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center bg-black p-4 ${isFullscreen ? "p-0" : "p-8"}`}
    >
      <div
        className={`${containerClasses} rounded-md border border-red-500/50 shadow-lg shadow-red-500/20 overflow-hidden`}
      >
        {activeView === "terminal" ? (
          <>
            <TerminalHeader
              onExecuteCommand={handleExecuteCommand}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
              onClose={closeTerminal}
              onOpenAIConsole={openAIConsole}
            />
            <MarketTicker />
            <SubscriptionBanner />
            <Terminal ref={terminalRef} onOpenAIConsole={openAIConsole} onExecuteCommand={handleExecuteCommand} />
            <TerminalFooter />
          </>
        ) : activeView === "dashboard" ? (
          <DashboardLayout
            onClose={() => setActiveView("terminal")}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        ) : activeView === "ai" ? (
          <>
            <TerminalHeader
              onExecuteCommand={handleExecuteCommand}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
              onClose={closeTerminal}
            />
            <MarketTicker />
            <SubscriptionBanner />
            <div className="flex-1">
              <RektAIAssistant onBackToDashboard={() => setActiveView("terminal")} isFullscreen={true} />
            </div>
            <TerminalFooter />
          </>
        ) : (
          <BloombergDashboard
            onClose={() => setActiveView("terminal")}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        )}
      </div>
    </main>
  )
}

