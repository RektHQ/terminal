"use client"

import { useTheme } from "../contexts/theme-context"
import type { DailyRecap as DailyRecapType } from "../types/news-feed"
import { TrendingUp, TrendingDown, Minus, Calendar, AlertTriangle, ExternalLink } from "lucide-react"

interface DailyRecapProps {
  recap: DailyRecapType
}

export function DailyRecap({ recap }: DailyRecapProps) {
  const { theme } = useTheme()

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"

  const getSentimentIcon = () => {
    if (recap.marketSentiment === "bullish") {
      return <TrendingUp className={theme === "hacker" ? "text-green-500" : "text-green-400"} size={16} />
    } else if (recap.marketSentiment === "bearish") {
      return <TrendingDown className={theme === "hacker" ? "text-red-500" : "text-red-400"} size={16} />
    } else {
      return <Minus className="text-gray-500" size={16} />
    }
  }

  const getSentimentClass = () => {
    if (recap.marketSentiment === "bullish") {
      return theme === "hacker" ? "text-green-500" : "text-green-400"
    } else if (recap.marketSentiment === "bearish") {
      return theme === "hacker" ? "text-red-500" : "text-red-400"
    } else {
      return "text-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`${headerClass} text-lg font-bold`}>Daily Recap by RektAI</h3>
        <div className="flex items-center text-gray-400">
          <Calendar size={14} className="mr-1" />
          {formatDate(recap.date)}
        </div>
      </div>

      <div className={`${textClass} text-xs mb-4`}>{recap.summary}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className={`border ${borderClass} p-3`}>
          <h4 className={`${headerClass} text-sm font-bold mb-2`}>Key Points</h4>
          <ul className="list-disc pl-4 space-y-1">
            {recap.keyPoints.map((point, idx) => (
              <li key={idx} className="text-gray-400 text-xs">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={`border ${borderClass} p-3`}>
          <h4 className={`${headerClass} text-sm font-bold mb-2`}>Exploit Stats (24h)</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Total Incidents:</span>
              <span className={textClass}>{recap.exploitStats.total24h}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Total Value:</span>
              <span className={textClass}>${recap.exploitStats.totalValue24h.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">7d Change:</span>
              <span
                className={
                  recap.exploitStats.change7d > 0
                    ? theme === "hacker"
                      ? "text-red-500"
                      : "text-red-400"
                    : theme === "hacker"
                      ? "text-green-500"
                      : "text-green-400"
                }
              >
                {recap.exploitStats.change7d > 0 ? "+" : ""}
                {recap.exploitStats.change7d}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Market Sentiment:</span>
              <div className={`flex items-center ${getSentimentClass()}`}>
                {getSentimentIcon()}
                <span className="ml-1 capitalize">{recap.marketSentiment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className={`${headerClass} text-sm font-bold mb-2`}>Top Stories</h4>
        <div className="space-y-2">
          {recap.topStories.map((story) => (
            <div key={story.id} className="flex items-start">
              <AlertTriangle
                size={14}
                className={
                  story.importance === "high"
                    ? theme === "hacker"
                      ? "text-red-500"
                      : "text-red-400"
                    : story.importance === "medium"
                      ? theme === "hacker"
                        ? "text-yellow-500"
                        : "text-yellow-400"
                      : theme === "hacker"
                        ? "text-blue-500"
                        : "text-blue-400"
                }
              />
              <div className="ml-2">
                <div className="text-sm text-gray-300">{story.title}</div>
                <div className="text-xs text-gray-500">{story.content.substring(0, 100)}...</div>
                {story.url && (
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center text-xs mt-1 ${
                      theme === "hacker" ? "text-red-500 hover:text-red-400" : "text-white hover:text-gray-300"
                    }`}
                  >
                    <ExternalLink size={10} className="mr-1" />
                    Read full story
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-400 text-xs">
          Generated by RektAI at {new Date().toLocaleTimeString()} • Based on on-chain data and security reports
        </p>
      </div>
    </div>
  )
}

export default DailyRecap

