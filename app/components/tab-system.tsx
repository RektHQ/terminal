"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "../contexts/theme-context"
import { useIsMobile } from "../hooks/use-mobile"

interface Tab {
  id: string
  title: string
  content: React.ReactNode
  closable?: boolean
  icon?: React.ComponentType<any>
  label?: string
}

// Update the component props to include className:
interface TabSystemProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function TabSystem({ tabs, activeTab, onTabChange, className = "" }: TabSystemProps) {
  const { theme } = useTheme()
  //const [activeTab, setActiveTab] = useState(defaultActiveTab || (tabs.length > 0 ? tabs[0].id : ""))
  const [scrollPosition, setScrollPosition] = useState(0)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  /*const handleTabChange = (tabId: string) => {
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
*/
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

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content || null

  // Update the return statement to use the className prop:
  return (
    <div className={`flex flex-col ${className || ""}`}>
      <div className="flex border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? theme === "hacker"
                  ? "bg-green-900/20 text-green-500 border-b-2 border-green-500"
                  : "bg-gray-900 text-white border-b-2 border-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.icon && <tab.icon size={14} className="inline mr-2" />}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">{activeTabContent}</div>
    </div>
  )
}

