"use client"

import { X, Maximize, Minimize, Moon, Sun, LayoutGrid, FileText, Menu, Users, Bot } from "lucide-react"
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
  isFullscreen,
  onToggleFullscreen,
  onClose,
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

  const handleAIConsoleClick = () => {
    if (onOpenAIConsole) {
      onOpenAIConsole()
    } else if (onExecuteCommand) {
      onExecuteCommand("ai")
    }
  }

  return (
    <div className="w-full z-10">
      <div className="flex items-center justify-between bg-black border-b border-red-500/30 p-2">
        <div className="flex items-center">
          <span className={`${theme === "hacker" ? "text-red-500" : "text-white"} font-bold text-sm`}>REKT</span>

          {/* Subscriber count */}
          <div className={`ml-4 flex items-center ${theme === "hacker" ? "text-green-500" : "text-white"} text-xs`}>
            <Users size={14} className="mr-1" />
            <span>40,000+ subscribers</span>
          </div>

          {!isMobile && (
            <a
              href="https://www.rekt.news"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-6 flex items-center ${
                theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-white hover:text-gray-300"
              }`}
            >
              <FileText size={14} className="mr-1" />
              Articles
            </a>
          )}
        </div>
        <div className="flex-1 text-center">
          <h1
            className={`${theme === "hacker" ? "text-red-500 glitch-text" : "text-white"} font-bold text-lg hidden md:block`}
            data-text="REKT AI TERMINAL v1.0"
          >
            REKT AI TERMINAL v1.0
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          {isMobile ? (
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`${theme === "hacker" ? "text-green-500" : "text-white"} p-1`}
            >
              <Menu size={20} />
            </button>
          ) : (
            <>
              <button
                onClick={handlePointsClick}
                className={`${theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-white hover:text-gray-300"} text-sm font-mono cursor-pointer flex items-center`}
              >
                <span className="mr-1">💎</span>
                {points.toLocaleString()} points
              </button>
              <button
                onClick={handleAIConsoleClick}
                className={`${
                  theme === "hacker"
                    ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                } px-2 py-1 rounded text-xs flex items-center`}
              >
                <Bot size={14} className="mr-1" />
                AI Console
              </button>
              <button
                onClick={handleDashboardClick}
                className={`${
                  theme === "hacker"
                    ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                } px-2 py-1 rounded text-xs flex items-center`}
              >
                <LayoutGrid size={14} className="mr-1" />
                Dashboard View
              </button>
              <button
                onClick={toggleTheme}
                className={`${theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-white hover:text-gray-300"} p-1`}
                aria-label="Toggle theme"
              >
                {theme === "hacker" ? <Moon size={16} /> : <Sun size={16} />}
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
              className={`flex items-center ${theme === "hacker" ? "text-green-500" : "text-white"}`}
            >
              <FileText size={16} className="mr-2" />
              Articles
            </a>
            <button
              onClick={handlePointsClick}
              className={`flex items-center ${theme === "hacker" ? "text-green-500" : "text-white"} text-left`}
            >
              <span className="mr-2">💎</span>
              {points.toLocaleString()} points
            </button>
            <button
              onClick={handleAIConsoleClick}
              className={`flex items-center ${theme === "hacker" ? "text-green-500" : "text-white"} text-left`}
            >
              <Bot size={16} className="mr-2" />
              AI Console
            </button>
            <button
              onClick={handleDashboardClick}
              className={`flex items-center ${theme === "hacker" ? "text-green-500" : "text-white"} text-left`}
            >
              <LayoutGrid size={16} className="mr-2" />
              Dashboard View
            </button>
            <button
              onClick={toggleTheme}
              className={`flex items-center ${theme === "hacker" ? "text-green-500" : "text-white"} text-left`}
            >
              {theme === "hacker" ? <Moon size={16} className="mr-2" /> : <Sun size={16} className="mr-2" />}
              Toggle Theme
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
              className={`mt-2 w-full py-2 text-center rounded ${theme === "hacker" ? "bg-red-900/30 text-red-500" : "bg-gray-800 text-white"}`}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

