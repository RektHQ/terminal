"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "../contexts/theme-context"
import {
  Maximize2,
  Minimize2,
  X,
  ArrowRightIcon as ArrowsMaximize,
  ArrowLeftIcon as ArrowsMinimize,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

interface DashboardWidgetProps {
  title: string
  children: React.ReactNode
  customHeader?: React.ReactNode
  onClose?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
  defaultExpanded?: boolean
  className?: string
}

export function DashboardWidget({
  title,
  children,
  customHeader,
  onClose,
  onMaximize,
  isMaximized,
  defaultExpanded = false,
  className = "",
}: DashboardWidgetProps) {
  const { theme } = useTheme()
  const [expanded, setExpanded] = useState(defaultExpanded || isMaximized)
  const [minimized, setMinimized] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Update expanded state when isMaximized changes
  useEffect(() => {
    if (isMaximized !== undefined) {
      setExpanded(isMaximized)
    }
  }, [isMaximized])

  // This function toggles the minimized state
  const toggleMinimize = () => {
    setMinimized(!minimized)
  }

  return (
    <div
      ref={widgetRef}
      className={`flex flex-col ${className} ${isMaximized ? "fixed inset-0 z-50" : ""} h-full w-full bg-black`}
    >
      <div className="flex items-center justify-between p-1 border-b border-gray-800 bg-black w-full">
        {customHeader ? (
          customHeader
        ) : (
          <>
            <div className="flex items-center">
              <h3 className={`${theme === "hacker" ? "text-red-500" : "text-white"} text-xs font-bold truncate`}>
                {title}
              </h3>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-400 hover:text-white p-1"
                title={expanded ? "Collapse" : "Expand"}
              >
                {expanded ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
              </button>
              <button
                onClick={toggleMinimize}
                className="text-gray-400 hover:text-white p-1"
                title={minimized ? "Expand" : "Minimize"}
              >
                {minimized ? <ArrowsMaximize size={12} /> : <ArrowsMinimize size={12} />}
              </button>
              {onMaximize && (
                <button
                  onClick={onMaximize}
                  className="text-gray-400 hover:text-white p-1"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                  {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                </button>
              )}
              {onClose && (
                <button onClick={onClose} className="text-gray-400 hover:text-white p-1" title="Close">
                  <X size={12} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {/* Apply the minimized class to hide content when minimized */}
      <div
        className={`flex-1 overflow-auto ${expanded ? "" : "max-h-40"} ${minimized ? "hidden" : ""} bg-black w-full`}
      >
        {children}
      </div>
    </div>
  )
}

