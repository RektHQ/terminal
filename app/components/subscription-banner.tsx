"use client"

import { useTheme } from "../contexts/theme-context"
import { Crown, X } from "lucide-react"
import { useState } from "react"

export function SubscriptionBanner() {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      className={`w-full ${
        theme === "hacker"
          ? "bg-gradient-to-r from-black via-red-950 to-black border-b border-red-500/30"
          : "bg-gradient-to-r from-black via-gray-900 to-black border-b border-white/30"
      } py-2 px-4`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Crown className={theme === "hacker" ? "text-yellow-500 mr-2" : "text-yellow-400 mr-2"} size={18} />
          <span className={theme === "hacker" ? "text-red-500 font-bold" : "text-white font-bold"}>
            Upgrade to Rekt Pro
          </span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-300 text-sm">
            Get real-time alerts, custom dashboards, and AI-powered risk analysis
          </span>
        </div>
        <div className="flex items-center">
          <button
            className={`mr-2 px-3 py-1 rounded text-sm ${
              theme === "hacker"
                ? "bg-red-900/50 text-red-500 hover:bg-red-900/70"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Upgrade Now
          </button>
          <button
            className={`mr-4 px-3 py-1 rounded text-sm ${
              theme === "hacker"
                ? "bg-green-900/50 text-green-500 hover:bg-green-900/70"
                : "bg-blue-900/20 text-blue-400 hover:bg-blue-900/30"
            }`}
          >
            Refer Friend
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
            aria-label="Close banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

