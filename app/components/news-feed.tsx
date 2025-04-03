"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import type { FeedItem } from "../types/news-feed"
import { Clock, ExternalLink } from "lucide-react"

interface NewsFeedProps {
  items: FeedItem[]
  title: string
  timeframe?: "1h" | "24h" | "7d" | "all"
}

export function NewsFeed({ items, title, timeframe = "all" }: NewsFeedProps) {
  const { theme } = useTheme()
  const [activeTimeframe, setActiveTimeframe] = useState<"1h" | "24h" | "7d" | "all">(timeframe)

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"
  const activeTabClass =
    theme === "hacker" ? "bg-red-900/30 text-red-400 border-red-500" : "bg-gray-800 text-white border-white"
  const inactiveTabClass =
    theme === "hacker"
      ? "bg-transparent text-green-500 hover:bg-red-900/10 border-transparent"
      : "bg-transparent text-gray-400 hover:bg-gray-800 border-transparent"

  // Filter items based on timeframe
  const filteredItems = items.filter((item) => {
    if (activeTimeframe === "all") return true

    const itemDate = new Date(item.timestamp)
    const now = new Date()
    const hoursDiff = (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60)

    if (activeTimeframe === "1h") return hoursDiff <= 1
    if (activeTimeframe === "24h") return hoursDiff <= 24
    if (activeTimeframe === "7d") return hoursDiff <= 24 * 7

    return true
  })

  const getImportanceClass = (importance: "high" | "medium" | "low") => {
    if (theme === "hacker") {
      return importance === "high" ? "text-red-500" : importance === "medium" ? "text-yellow-500" : "text-blue-500"
    } else {
      return importance === "high" ? "text-red-400" : importance === "medium" ? "text-yellow-400" : "text-blue-400"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`${headerClass} text-lg font-bold`}>{title}</h3>

        <div className="flex text-xs">
          <button
            className={`px-2 py-1 border-b ${activeTimeframe === "1h" ? activeTabClass : inactiveTabClass}`}
            onClick={() => setActiveTimeframe("1h")}
          >
            1H
          </button>
          <button
            className={`px-2 py-1 border-b ${activeTimeframe === "24h" ? activeTabClass : inactiveTabClass}`}
            onClick={() => setActiveTimeframe("24h")}
          >
            24H
          </button>
          <button
            className={`px-2 py-1 border-b ${activeTimeframe === "7d" ? activeTabClass : inactiveTabClass}`}
            onClick={() => setActiveTimeframe("7d")}
          >
            7D
          </button>
          <button
            className={`px-2 py-1 border-b ${activeTimeframe === "all" ? activeTabClass : inactiveTabClass}`}
            onClick={() => setActiveTimeframe("all")}
          >
            ALL
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No news items in this timeframe</div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 border-l-2 ${
                item.importance === "high"
                  ? "border-red-500"
                  : item.importance === "medium"
                    ? "border-yellow-500"
                    : "border-blue-500"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className={`font-bold ${getImportanceClass(item.importance)}`}>{item.title}</div>
                <div className="flex items-center text-gray-500 text-xs ml-2">
                  <Clock size={12} className="mr-1" />
                  {formatDate(item.timestamp)}
                </div>
              </div>

              <div className={`${textClass} text-xs mb-2`}>{item.content}</div>

              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        theme === "hacker" ? "bg-green-900/20 text-green-500" : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center text-xs ${
                      theme === "hacker" ? "text-red-500 hover:text-red-400" : "text-white hover:text-gray-300"
                    }`}
                  >
                    <ExternalLink size={12} className="mr-1" />
                    Read more
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">Live updates from the Rekt News feed</p>
      </div>
    </div>
  )
}

export default NewsFeed

