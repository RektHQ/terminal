"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "../contexts/theme-context"
import {
  Maximize2,
  Minimize2,
  X,
  Move,
  ArrowRightIcon as ArrowsMaximize,
  ArrowLeftIcon as ArrowsMinimize,
} from "lucide-react"
import { useIsMobile } from "../hooks/use-mobile"

interface DashboardWidgetProps {
  title: string
  children: React.ReactNode
  customHeader?: React.ReactNode
  onClose?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
  defaultExpanded?: boolean
  className?: string
  id?: string
  onResize?: (width: number, height: number) => void
  onDragStart?: () => void
  onDragEnd?: (x: number, y: number) => void
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
  id,
  onResize,
  onDragStart,
  onDragEnd,
}: DashboardWidgetProps) {
  const { theme } = useTheme()
  const [expanded, setExpanded] = useState(defaultExpanded || isMaximized)
  const [minimized, setMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 0, height: 0 })
  const widgetRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const resizeStartSize = useRef({ width: 0, height: 0 })
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const isMobile = useIsMobile()

  // Update expanded state when isMaximized changes
  useEffect(() => {
    if (isMaximized !== undefined) {
      setExpanded(isMaximized)
    }
  }, [isMaximized])

  // Initialize size on mount
  useEffect(() => {
    if (widgetRef.current) {
      setSize({
        width: widgetRef.current.offsetWidth,
        height: widgetRef.current.offsetHeight,
      })
    }
  }, [])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMaximized) return

    e.preventDefault()
    setIsDragging(true)

    if (widgetRef.current) {
      let clientX: number, clientY: number

      if ("touches" in e) {
        // Touch event
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        // Mouse event
        clientX = e.clientX
        clientY = e.clientY
      }

      const rect = widgetRef.current.getBoundingClientRect()
      dragStartPos.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }

      // Set initial position if not already set
      if (position.x === 0 && position.y === 0) {
        setPosition({ x: rect.left, y: rect.top })
      }
    }

    if (onDragStart) {
      onDragStart()
    }

    // Add event listeners for drag and drop
    if ("touches" in e) {
      document.addEventListener("touchmove", handleDragMove)
      document.addEventListener("touchend", handleDragEnd)
    } else {
      document.addEventListener("mousemove", handleDragMove)
      document.addEventListener("mouseup", handleDragEnd)
    }
  }

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    let clientX: number, clientY: number

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    const newX = clientX - dragStartPos.current.x
    const newY = clientY - dragStartPos.current.y

    setPosition({ x: newX, y: newY })
  }

  const handleDragEnd = () => {
    setIsDragging(false)

    if (onDragEnd) {
      onDragEnd(position.x, position.y)
    }

    // Remove event listeners
    document.removeEventListener("mousemove", handleDragMove)
    document.removeEventListener("mouseup", handleDragEnd)
    document.removeEventListener("touchmove", handleDragMove)
    document.removeEventListener("touchend", handleDragEnd)
  }

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)

    if (widgetRef.current) {
      let clientX: number, clientY: number

      if ("touches" in e) {
        // Touch event
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        // Mouse event
        clientX = e.clientX
        clientY = e.clientY
      }

      resizeStartSize.current = {
        width: widgetRef.current.offsetWidth,
        height: widgetRef.current.offsetHeight,
      }
      resizeStartPos.current = {
        x: clientX,
        y: clientY,
      }
    }

    // Add event listeners for resize
    const handleResizeMoveWithDirection = (e: MouseEvent | TouchEvent) => handleResizeMove(e, direction)

    if ("touches" in e) {
      document.addEventListener("touchmove", handleResizeMoveWithDirection)
      document.addEventListener("touchend", handleResizeEnd)
    } else {
      document.addEventListener("mousemove", handleResizeMoveWithDirection)
      document.addEventListener("mouseup", handleResizeEnd)
    }

    // Store the event listeners for cleanup
    const cleanup = () => {
      document.removeEventListener("mousemove", handleResizeMoveWithDirection)
      document.removeEventListener("mouseup", handleResizeEnd)
      document.removeEventListener("touchmove", handleResizeMoveWithDirection)
      document.removeEventListener("touchend", handleResizeEnd)
    }

    // Store the cleanup function
    ;(window as any).resizeCleanup = cleanup
  }

  const handleResizeMove = (e: MouseEvent | TouchEvent, direction: string) => {
    if (!isResizing) return

    let clientX: number, clientY: number

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    const deltaX = clientX - resizeStartPos.current.x
    const deltaY = clientY - resizeStartPos.current.y

    let newWidth = resizeStartSize.current.width
    let newHeight = resizeStartSize.current.height

    if (direction.includes("e")) {
      newWidth = Math.max(200, resizeStartSize.current.width + deltaX)
    }
    if (direction.includes("s")) {
      newHeight = Math.max(100, resizeStartSize.current.height + deltaY)
    }
    if (direction.includes("w")) {
      newWidth = Math.max(200, resizeStartSize.current.width - deltaX)
    }
    if (direction.includes("n")) {
      newHeight = Math.max(100, resizeStartSize.current.height - deltaY)
    }

    setSize({ width: newWidth, height: newHeight })

    if (onResize) {
      onResize(newWidth, newHeight)
    }
  }

  const handleResizeEnd = () => {
    setIsResizing(false)

    // Clean up event listeners using the stored cleanup function
    if ((window as any).resizeCleanup) {
      ;(window as any).resizeCleanup()
      delete (window as any).resizeCleanup
    }
  }

  const toggleMinimize = () => {
    setMinimized(!minimized)
  }

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"

  const widgetStyle: React.CSSProperties = {
    ...(isDragging ? { position: "absolute", zIndex: 100, left: position.x, top: position.y } : {}),
    ...(isMaximized
      ? { position: "absolute", zIndex: 100, left: 0, top: 0, right: 0, bottom: 0, width: "100%", height: "100%" }
      : {}),
    ...(isResizing ? { width: size.width, height: size.height } : {}),
  }

  return (
    <div
      ref={widgetRef}
      className={`border ${borderClass} bg-black/80 flex flex-col ${className} ${isMaximized ? "fixed inset-0 z-50" : ""} h-full`}
      style={widgetStyle}
      id={id}
    >
      <div
        className={`flex items-center justify-between p-2 border-b ${borderClass} bg-black cursor-move`}
        onMouseDown={!isMobile ? handleDragStart : undefined}
        onTouchStart={isMobile ? handleDragStart : undefined}
      >
        {customHeader ? (
          customHeader
        ) : (
          <>
            <div className="flex items-center">
              <Move size={14} className="text-gray-500 mr-2" />
              <h3 className={`${headerClass} text-sm font-bold truncate`}>{title}</h3>
            </div>
            <div className="flex items-center space-x-1">
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
              {!onMaximize && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-gray-400 hover:text-white p-1"
                  title={expanded ? "Collapse" : "Expand"}
                >
                  {expanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
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
      <div className={`flex-1 overflow-auto ${expanded ? "h-full" : "max-h-40"} ${minimized ? "hidden" : ""}`}>
        {children}
      </div>

      {/* Resize handles - larger for touch on mobile */}
      {!isMobile ? (
        <>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          >
            <div className="w-2 h-2 bg-gray-500 rounded-full absolute bottom-1 right-1"></div>
          </div>
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          >
            <div className="w-2 h-2 bg-gray-500 rounded-full absolute bottom-1 left-1"></div>
          </div>
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          >
            <div className="w-2 h-2 bg-gray-500 rounded-full absolute top-1 right-1"></div>
          </div>
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          >
            <div className="w-2 h-2 bg-gray-500 rounded-full absolute top-1 left-1"></div>
          </div>
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-8 cursor-e-resize bg-gray-800 hover:bg-gray-600"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          ></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-8 cursor-w-resize bg-gray-800 hover:bg-gray-600"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-8 cursor-s-resize bg-gray-800 hover:bg-gray-600"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          ></div>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-8 cursor-n-resize bg-gray-800 hover:bg-gray-600"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          ></div>
        </>
      ) : (
        // Larger touch targets for mobile
        <div
          className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize"
          onTouchStart={(e) => handleResizeStart(e, "se")}
        >
          <div className="w-4 h-4 bg-gray-500 rounded-full absolute bottom-2 right-2"></div>
        </div>
      )}
    </div>
  )
}

