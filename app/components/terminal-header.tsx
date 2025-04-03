"use client"

import { X, Maximize, Minimize, Moon, Sun, LayoutGrid, FileText, Menu, Users, Bot, Monitor } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import { mockUserPoints } from "../data/mock-user-points"
import { useState } from "react"
import { useIsMobile } from "../hooks/use-mobile"

interface TerminalHeaderProps {
  onExecuteCommand?: (command: string) => void
  isFullscreen: boolean
  onToggleFullscreen: () => void
  onClose: () => void
  onOpenAIConsole?: () => void
}

export function TerminalHeader({
  onExecuteCommand,
  isFullscreen = false,
  onToggleFullscreen = () => {},
  onClose = () => {},
  onOpenAIConsole,
}: TerminalHeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const points = mockUserPoints.totalPoints
  const isMobile = useIsMobile()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handlePointsClick = () => {
    if (onExecuteCommand) {
      onExecuteCommand("points")
    }
  }

  const handleDashboardClick = () => {
    if (onExecuteCommand) {
      onExecuteCommand("bloomberg")
    }
  }

  // Update the handleAIConsoleClick function to ensure it works in all views
  const handleAIConsoleClick = () => {
    if (onOpenAIConsole) {
      onOpenAIConsole()
    } else if (onExecuteCommand) {
      // Make sure we're using lowercase for consistency
      onExecuteCommand("ai")
    }
  }

  // Get the appropriate theme icon based on current theme
  const getThemeIcon = () => {
    if (theme === "hacker") return <Moon size={16} />
    if (theme === "soft") return <Sun size={16} />
    return <Monitor size={16} />
  }

  // Get theme text for mobile menu
  const getThemeText = () => {
    if (theme === "hacker") return "Hacker Mode"
    if (theme === "soft") return "Soft Mode"
    return "B&W Mode"
  }

  return (
    <div className="w-full z-10">
      <div
        className={`flex items-center justify-between bg-black border-b ${theme === "bw" ? "border-white/30" : theme === "hacker" ? "border-red-500/30" : "border-white/30"} p-2`}
      >
        <div className="flex items-center">
          <span
            className={`${theme === "bw" ? "text-white" : theme === "hacker" ? "text-red-500" : "text-white"} font-bold text-sm`}
          >
            REKT AI
          </span>

          {/* Subscriber count */}
          <div
            className={`ml-4 flex items-center ${theme === "bw" ? "text-white" : theme === "hacker" ? "text-green-500" : "text-blue-400"} text-xs`}
          >
            <Users size={14} className="mr-1" />
            <span>40,000+ subscribers</span>
          </div>

          {!isMobile && (
            <a
              href="https://www.rekt.news"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-6 flex items-center ${theme === "bw" ? "text-white hover:text-gray-300" : theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-blue-400 hover:text-blue-300"}`}
            >
              <FileText size={14} className="mr-1" />
              Articles
            </a>
          )}
        </div>
        <div className="flex-1 text-center">{/* Removed the REKT AI TERMINAL v1.0 text */}</div>
        <div className="flex items-center space-x-2 md:space-x-4">
          {isMobile ? (
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`${theme === "bw" ? "text-white" : theme === "hacker" ? "text-green-500" : "text-white"} p-1`}
            >
              <Menu size={20} />
            </button>
          ) : (
            <>
              <button
                onClick={handlePointsClick}
                className={`${theme === "bw" ? "text-white hover:text-gray-300" : theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-white hover:text-gray-300"} text-sm font-mono cursor-pointer flex items-center`}
              >
                <span className="mr-1">💎</span>
                {points.toLocaleString()} points
              </button>
              {/* Increase the click area for the AI Console button by adding more padding */}
              <button
                onClick={handleAIConsoleClick}
                className={`${
                  theme === "bw"
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : theme === "hacker"
                      ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                      : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
                } px-3 py-2 rounded text-sm flex items-center`}
              >
                <Bot size={14} className="mr-1.5" />
                AI Console
              </button>
              <button
                onClick={handleDashboardClick}
                className={`${
                  theme === "bw"
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : theme === "hacker"
                      ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                      : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
                } px-2 py-1 rounded text-xs flex items-center`}
              >
                <LayoutGrid size={14} className="mr-1" />
                Rekt Dashboard
              </button>
              <button
                onClick={toggleTheme}
                className={`${theme === "bw" ? "text-white hover:text-gray-300" : theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-white hover:text-gray-300"} p-1`}
                aria-label="Toggle theme"
              >
                {getThemeIcon()}
              </button>
              <button
                onClick={onToggleFullscreen}
                className="text-gray-400 hover:text-white"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close terminal">
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && showMobileMenu && (
        <div className="bg-black border-b border-gray-800 p-2 z-50">
          <div className="flex flex-col space-y-3">
            <a
              href="https://www.rekt.news"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center ${theme === "bw" ? "text-white" : theme === "hacker" ? "text-green-500" : "text-blue-400"}`}
            >
              <FileText size={16} className="mr-2" />
              Articles
            </a>
            <button
              onClick={handlePointsClick}
              className={`flex items-center ${theme === "bw" ? "text-white" : theme === "hacker" ? "text-green-500" : "text-white"} text-left`}
            >
              <span className="mr-2">💎</span>
              {points.toLocaleString()} points
            </button>
            <button
              onClick={handleAIConsoleClick}
              className={`flex items-center ${theme === "bw" ? "text-white" : theme === "hacker" ? "text-green-500" : "text-blue-400"} text-left`}
            >
              <Bot size={16} className="mr-2" />
              AI Console
            </button>
            <button
              onClick={handleDashboardClick}
              className={`flex items-center ${theme === "bw" ? "text-white" : theme === "hacker" ? "text-green-500" : "text-blue-400"} text-left`}
            >
              <LayoutGrid size={16} className="mr-2" />
              Dashboard View
            </button>
            <button
              onClick={toggleTheme}
              className={`flex items-center ${theme === "bw" ? "text-white" : theme === "hacker" ? "text-green-500" : "text-white"} text-left`}
            >
              {getThemeIcon()}
              <span className="ml-2">{getThemeText()}</span>
            </button>
            <button onClick={onToggleFullscreen} className="flex items-center text-gray-400 text-left">
              {isFullscreen ? <Minimize size={16} className="mr-2" /> : <Maximize size={16} className="mr-2" />}
              {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            </button>
            <button onClick={onClose} className="flex items-center text-gray-400 text-left">
              <X size={16} className="mr-2" />
              Close Terminal
            </button>
            <button
              onClick={() => setShowMobileMenu(false)}
              className={`mt-2 w-full py-2 text-center rounded ${
                theme === "bw"
                  ? "bg-white/20 text-white"
                  : theme === "hacker"
                    ? "bg-red-900/30 text-red-500"
                    : "bg-gray-800 text-white"
              }`}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

