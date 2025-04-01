"use client"

import { TerminalIcon } from "lucide-react"
import { useTheme } from "../contexts/theme-context"

interface LaunchButtonProps {
  onLaunch: () => void
}

export function LaunchButton({ onLaunch }: LaunchButtonProps) {
  const { theme } = useTheme()

  return (
    <button
      onClick={onLaunch}
      className={`
        flex items-center justify-center gap-2 px-6 py-3 rounded-md
        transition-all transform hover:scale-105 focus:outline-none focus:ring-2
        ${
          theme === "hacker"
            ? "bg-black border border-red-500 text-red-500 hover:bg-red-900/10 focus:ring-red-500"
            : "bg-black border border-white text-white hover:bg-white/10 focus:ring-white"
        }
      `}
    >
      <TerminalIcon size={20} />
      <span className="font-mono font-bold">Launch Rekt News Terminal</span>
    </button>
  )
}

