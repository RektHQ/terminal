"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import type { UserPoints } from "../types/user-points"
import { Award, Star, Clock, Check, X, Trophy } from "lucide-react"

interface PointsDashboardProps {
  points: UserPoints
}

export function PointsDashboard({ points }: PointsDashboardProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<"overview" | "rewards" | "history">("overview")

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"
  const activeTabClass =
    theme === "hacker" ? "bg-red-900/30 text-red-400 border-red-500" : "bg-gray-800 text-white border-white"
  const inactiveTabClass =
    theme === "hacker"
      ? "bg-transparent text-green-500 hover:bg-red-900/10 border-transparent"
      : "bg-transparent text-gray-400 hover:bg-gray-800 border-transparent"

  // Calculate progress percentage
  const totalPointsForNextLevel = points.totalPoints + points.pointsToNextLevel
  const progressPercentage = (points.totalPoints / totalPointsForNextLevel) * 100

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <div className="flex items-center mb-4">
        <Trophy className={headerClass} size={18} />
        <h3 className={`${headerClass} text-lg font-bold ml-2`}>Rekt Points Dashboard</h3>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Award size={18} className={theme === "hacker" ? "text-green-500 mr-2" : "text-white mr-2"} />
            <span className={`${textClass} font-bold text-lg`}>{points.totalPoints} PTS</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-1">Level:</span>
            <span className={textClass}>{points.level}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
          <span>Current</span>
          <span>Next: {points.nextLevel}</span>
        </div>

        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className={theme === "hacker" ? "bg-green-500 h-full" : "bg-white h-full"}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-500">{points.totalPoints} pts</span>
          <span className="text-gray-500">{points.pointsToNextLevel} pts needed</span>
        </div>
      </div>

      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`px-4 py-2 border-b-2 -mb-px ${activeTab === "overview" ? activeTabClass : inactiveTabClass}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 border-b-2 -mb-px ${activeTab === "rewards" ? activeTabClass : inactiveTabClass}`}
          onClick={() => setActiveTab("rewards")}
        >
          Rewards
        </button>
        <button
          className={`px-4 py-2 border-b-2 -mb-px ${activeTab === "history" ? activeTabClass : inactiveTabClass}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {activeTab === "overview" && (
        <div>
          <h4 className={`${headerClass} text-sm font-bold mb-3`}>Points Breakdown</h4>
          <div className="space-y-3">
            {points.breakdown.map((item, idx) => (
              <div key={idx} className={`p-2 border-l-2 ${theme === "hacker" ? "border-green-500" : "border-white"}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className={`${textClass} font-bold`}>{item.category}</div>
                    <div className="text-gray-400 text-xs">{item.description}</div>
                  </div>
                  <div className={`${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
                    +{item.points}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "rewards" && (
        <div className="space-y-4">
          {points.rewards.map((reward, idx) => (
            <div key={idx} className={`p-3 border ${borderClass} ${reward.claimed ? "opacity-70" : ""}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <Star size={16} className={theme === "hacker" ? "text-yellow-500 mr-2" : "text-yellow-400 mr-2"} />
                    <span className={`${textClass} font-bold`}>{reward.name}</span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{reward.description}</div>
                </div>

                <div className="text-right">
                  <div className={`${textClass}`}>{reward.pointsRequired} pts</div>
                  <div className="mt-1">
                    {reward.claimed ? (
                      <span className="flex items-center text-xs text-gray-400">
                        <Check size={12} className="mr-1" />
                        Claimed
                      </span>
                    ) : points.totalPoints >= reward.pointsRequired ? (
                      <button
                        className={`text-xs px-2 py-1 rounded ${
                          theme === "hacker" ? "bg-green-900 text-green-500" : "bg-white/20 text-white"
                        }`}
                      >
                        Claim Now
                      </button>
                    ) : (
                      <span className="flex items-center text-xs text-gray-400">
                        <X size={12} className="mr-1" />
                        {reward.pointsRequired - points.totalPoints} pts needed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-2">
          {points.history.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-800">
              <div>
                <div className={textClass}>{item.action}</div>
                <div className="flex items-center text-gray-400 text-xs">
                  <Clock size={12} className="mr-1" />
                  {item.date}
                </div>
              </div>
              <div className={`${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>+{item.points}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-xs">
          Earn points by engaging with Rekt News content and unlock exclusive rewards
        </p>
      </div>
    </div>
  )
}

