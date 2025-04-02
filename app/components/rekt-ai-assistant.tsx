"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "../contexts/theme-context"
import { Send, Bot, User, Loader2, Maximize2, ArrowLeft, LayoutGrid } from "lucide-react"
import { DashboardWidget } from "./dashboard-widget"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface RektAIAssistantProps {
  onClose?: () => void
  onMaximize?: () => void
  onBackToDashboard?: () => void
  isFullscreen?: boolean
}

// Update the RektAIAssistant component to work better with resizing
export function RektAIAssistant({
  onClose,
  onMaximize,
  onBackToDashboard,
  isFullscreen = false,
}: RektAIAssistantProps) {
  const { theme } = useTheme()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to RektGPT. I'm trained on all Rekt News articles, on-chain data, and security incidents. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("euler")) {
        response =
          "The Euler Finance hack occurred on March 13, 2023. The attacker exploited a vulnerability in Euler's liquidation logic to steal approximately $197M. The attack used a flash loan to manipulate collateral values and drain funds across multiple tokens. The hacker later returned most of the funds after negotiations with the Euler team."
      } else if (input.toLowerCase().includes("risk") && input.toLowerCase().includes("lido")) {
        response =
          "Lido's current risk profile shows moderate centralization concerns with its validator set, though improvements have been made in the past 30 days. The protocol holds approximately 32% of all staked ETH, creating systemic risk. Recent governance proposals have focused on improving validator diversity and implementing additional security measures for the stETH/ETH peg."
      } else if (input.toLowerCase().includes("tornado") || input.toLowerCase().includes("cash")) {
        response =
          "Tornado Cash was sanctioned by OFAC in August 2022. Since then, we've tracked significant changes in privacy protocol usage. In the past 30 days, approximately 24,500 ETH has moved through alternative privacy solutions. Several wallets previously associated with Tornado Cash have shown activity bridging to Layer 2s and using newer privacy protocols."
      } else {
        response =
          "Based on my analysis of recent on-chain data and security incidents, I'd recommend focusing on cross-chain bridge security and oracle manipulation vectors. These have been the primary attack vectors in recent months, with over $350M lost to bridge exploits in the past year alone."
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Custom header with additional buttons
  const customHeader = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Bot size={16} className={`${theme === "hacker" ? "text-green-500" : "text-blue-400"} mr-2`} />
        <span className={`text-sm font-bold ${theme === "hacker" ? "text-red-500" : "text-white"}`}>
          REKTGPT AI ASSISTANT
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className={`p-1 rounded text-xs flex items-center ${
              theme === "hacker"
                ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
            }`}
            title="Back to Dashboard"
          >
            <ArrowLeft size={12} className="mr-1" />
            <LayoutGrid size={12} />
          </button>
        )}
        {onMaximize && (
          <button
            onClick={onMaximize}
            className={`p-1 rounded text-xs flex items-center ${
              theme === "hacker"
                ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
            }`}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Maximize2 size={14} />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <DashboardWidget
      title=""
      customHeader={customHeader}
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isFullscreen}
      defaultExpanded={true}
      className="flex-1 h-full"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-2 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "assistant"
                    ? theme === "hacker"
                      ? "bg-gray-900 border border-green-900"
                      : "bg-gray-900 border border-gray-700"
                    : theme === "hacker"
                      ? "bg-green-900/20 border border-green-900"
                      : "bg-blue-900/20 border border-blue-900"
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === "assistant" ? (
                    <Bot size={14} className={theme === "hacker" ? "text-green-500 mr-1" : "text-blue-400 mr-1"} />
                  ) : (
                    <User size={14} className="text-gray-400 mr-1" />
                  )}
                  <span
                    className={`text-xs ${message.role === "assistant" ? (theme === "hacker" ? "text-green-500" : "text-blue-400") : "text-gray-400"}`}
                  >
                    {message.role === "assistant" ? "RektGPT" : "You"}
                  </span>
                  <span className="text-gray-500 text-xs ml-2">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className={`text-sm ${theme === "hacker" ? "terminal-text" : "text-white"}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  theme === "hacker" ? "bg-gray-900 border border-green-900" : "bg-gray-900 border border-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <Bot size={14} className={theme === "hacker" ? "text-green-500 mr-1" : "text-blue-400 mr-1"} />
                  <span className={`text-xs ${theme === "hacker" ? "text-green-500" : "text-blue-400"}`}>RektGPT</span>
                  <Loader2 size={14} className="ml-2 animate-spin text-gray-500" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2 border-t border-gray-800">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hacks, risk analysis, or on-chain activity..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`ml-2 p-2 rounded ${
                theme === "hacker"
                  ? "bg-green-900/30 text-green-500 hover:bg-green-900/50"
                  : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
              } disabled:opacity-50`}
              disabled={!input.trim() || isLoading}
            >
              <Send size={16} />
            </button>
          </form>
          <div className="mt-1 text-xs text-gray-500">
            Trained on Rekt News archives, on-chain data, and security incidents through March 2025
          </div>
        </div>
      </div>
    </DashboardWidget>
  )
}

