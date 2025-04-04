// SPDX-License-Identifier: MIT
"use client"

import { useState } from "react"
import { Terminal } from "./components/terminal"
import DashboardLayout from "./components/dashboard-layout"
import { RektAIAssistant } from "./components/rekt-ai-assistant"
import { ThemeProvider } from "./contexts/theme-context"

export default function Home() {
  // Change default view to "bloomberg" (dashboard)
  const [view, setView] = useState<"terminal" | "bloomberg">("bloomberg")
  const [showAIConsole, setShowAIConsole] = useState(false)
  const [aiFullscreen, setAIFullscreen] = useState(false)
  const [aiMinimized, setAIMinimized] = useState(false)

  const handleViewChange = (newView: "terminal" | "bloomberg") => {
    setView(newView)
  }

  const handleAIConsoleClick = () => {
    setShowAIConsole(!showAIConsole)
    if (showAIConsole && aiFullscreen) {
      setAIFullscreen(false)
    }
  }

  const openAIConsole = (fullscreen = false) => {
    setShowAIConsole(true)
    setAIFullscreen(fullscreen)
    setAIMinimized(false)
  }

  const handleExecuteCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase().trim()

    if (normalizedCommand === "bloomberg") {
      setView("bloomberg")
      return true
    } else if (normalizedCommand === "terminal") {
      setView("terminal")
      return true
    } else if (normalizedCommand === "ai" || normalizedCommand === "rektgpt") {
      openAIConsole(true)
      return true
    }

    return false
  }

  return (
    <ThemeProvider>
      <main className="flex flex-col h-screen w-full overflow-hidden">
        {view === "terminal" ? (
          <Terminal
            onViewChange={handleViewChange}
            onAIConsoleClick={handleAIConsoleClick}
            onExecuteCommand={handleExecuteCommand}
          />
        ) : (
          <DashboardLayout onClose={() => handleViewChange("terminal")} onExecuteCommand={handleExecuteCommand} />
        )}

        {showAIConsole && view === "terminal" && (
          <RektAIAssistant
            onClose={() => setShowAIConsole(false)}
            fullscreen={aiFullscreen}
            onToggleFullscreen={() => setAIFullscreen(!aiFullscreen)}
            minimized={aiMinimized}
            onToggleMinimized={() => setAIMinimized(!aiMinimized)}
            onExecuteCommand={handleExecuteCommand}
          />
        )}
      </main>
    </ThemeProvider>
  )
}

