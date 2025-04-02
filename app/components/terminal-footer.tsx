"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../contexts/theme-context"
import { SponsorBanner } from "./sponsor-banner"
import { useIsMobile } from "../hooks/use-mobile"
import { Database, Lock, Shield } from "lucide-react"

export function TerminalFooter() {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const [blockNumber, setBlockNumber] = useState(17825432)
  const [isSecure, setIsSecure] = useState(true)

  // Simulate live block updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber((prev) => prev + 1)
    }, 12000) // New block roughly every 12 seconds

    return () => clearInterval(interval)
  }, [])

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const secureClass = theme === "hacker" ? "text-green-500" : "text-green-400"

  return (
    <div className="flex flex-col">
      <SponsorBanner />
      <div
        className={`bg-black border-t ${borderClass} p-2 text-xs ${isMobile ? "flex-col space-y-1" : "flex justify-between items-center"}`}
      >
        <div>REKT NEWS © 2020-2025</div>
        {!isMobile && <div>INDEPENDENT JOURNALISM • NO MERCY • NO MALICE</div>}
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Database size={12} className={theme === "hacker" ? "text-blue-500 mr-1" : "text-blue-400 mr-1"} />
            <span className={theme === "hacker" ? "text-blue-500" : "text-blue-400"}>
              ETH #{blockNumber.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center">
            {isSecure ? (
              <>
                <Lock size={12} className={secureClass + " mr-1"} />
                <span className={secureClass}>SECURE</span>
              </>
            ) : (
              <>
                <Shield size={12} className="text-yellow-500 mr-1" />
                <span className="text-yellow-500">CONNECTED</span>
              </>
            )}
          </div>
          <div className="flex items-center">
            <span className={theme === "hacker" ? "text-green-500" : "text-green-400"}>ZK</span>
            <span className="text-gray-500 mx-1">•</span>
            <span className={theme === "hacker" ? "text-blue-500" : "text-blue-400"}>FHE</span>
            <span className="text-gray-500 mx-1">•</span>
            <span className={theme === "hacker" ? "text-purple-500" : "text-purple-400"}>MPC</span>
          </div>
        </div>
      </div>
    </div>
  )
}

