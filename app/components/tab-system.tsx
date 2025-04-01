"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "../contexts/theme-context"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useIsMobile } from "../hooks/use-mobile"

interface Tab {
  id: string
  title: string
  content: React.ReactNode
  closable?: boolean
}

interface TabSystemProps {
  tabs: Tab[]
  defaultActiveTab?: string
  onTabClose?: (tabId: string) => void
  onTabChange?: (tabId: string) => void
}

export function TabSystem({ tabs, defaultActiveTab, onTabClose, onTabChange }: TabSystemProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState(defaultActiveTab || (tabs.length > 0 ? tabs[0].id : ""))
  const [scrollPosition, setScrollPosition] = useState(0)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation()
    if (onTabClose) {
      onTabClose(tabId)
    }
  }

  const activeTabClass =
    theme === "hacker"
      ? "bg-black border-t-2 border-red-500 text-red-500"
      : "bg-black border-t-2 border-white text-white"

  const inactiveTabClass =
    theme === "hacker"
      ? "bg-gray-900 hover:bg-black text-green-500 hover:text-green-400"
      : "bg-gray-900 hover:bg-black text-gray-300 hover:text-white"

  // Scroll tabs left/right
  const scrollLeft = () => {
    if (tabsContainerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 200)
      setScrollPosition(newPosition)
      tabsContainerRef.current.scrollLeft = newPosition
    }
  }

  const scrollRight = () => {
    if (tabsContainerRef.current) {
      const maxScroll = tabsContainerRef.current.scrollWidth - tabsContainerRef.current.clientWidth
      const newPosition = Math.min(maxScroll, scrollPosition + 200)
      setScrollPosition(newPosition)
      tabsContainerRef.current.scrollLeft = newPosition
    }
  }

  // Update scroll position when tabs change
  useEffect(() => {
    if (tabsContainerRef.current) {
      // Find the active tab element
      const activeTabElement = tabsContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`)
      if (activeTabElement) {
        // Scroll the active tab into view
        activeTabElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [activeTab, tabs])

  return (
    <div className="flex flex-col h-full">
      <div className="flex bg-gray-900 border-b border-gray-800 relative">
        {/* Scroll buttons for mobile */}
        {isMobile && tabs.length > 2 && (
          <button className="absolute left-0 top-0 bottom-0 z-10 px-1 bg-black/70 text-gray-400" onClick={scrollLeft}>
            <ChevronLeft size={16} />
          </button>
        )}

        <div
          ref={tabsContainerRef}
          className="flex overflow-x-auto scrollbar-hide flex-1"
          style={{ scrollBehavior: "smooth" }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              data-tab-id={tab.id}
              className={`px-3 py-2 cursor-pointer flex items-center whitespace-nowrap ${
                activeTab === tab.id ? activeTabClass : inactiveTabClass
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="truncate max-w-[150px] md:max-w-[200px]">{tab.title}</span>
              {tab.closable && (
                <button className="ml-2 text-gray-500 hover:text-gray-300" onClick={(e) => handleTabClose(e, tab.id)}>
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Scroll buttons for mobile */}
        {isMobile && tabs.length > 2 && (
          <button className="absolute right-0 top-0 bottom-0 z-10 px-1 bg-black/70 text-gray-400" onClick={scrollRight}>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-auto">
        {tabs.map((tab) => (
          <div key={tab.id} className={`h-full ${activeTab === tab.id ? "block" : "hidden"}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

