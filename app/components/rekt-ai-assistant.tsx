// SPDX-License-Identifier: MIT
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "../contexts/theme-context"
import {
  Send,
  Bot,
  Maximize2,
  ArrowLeft,
  ArrowRightIcon as ArrowsMaximize,
  ArrowLeftIcon as ArrowsMinimize,
} from "lucide-react"

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
  fullscreen?: boolean
  onToggleFullscreen?: () => void
  minimized?: boolean
  onToggleMinimized?: () => void
  onExecuteCommand?: (command: string) => void
}

export function RektAIAssistant({
  onClose,
  onMaximize,
  onBackToDashboard,
  isFullscreen = false,
  fullscreen,
  onToggleFullscreen,
  minimized: minimizedProp,
  onToggleMinimized,
  onExecuteCommand,
}: RektAIAssistantProps) {
  const { theme } = useTheme()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [minimized, setMinimized] = useState(minimizedProp || false)

  // Update minimized state when prop changes
  useEffect(() => {
    if (minimizedProp !== undefined) {
      setMinimized(minimizedProp)
    }
  }, [minimizedProp])

  // Load minimized state from localStorage on component mount
  useEffect(() => {
    const savedMinimized = localStorage.getItem("aiAssistantMinimized")
    if (savedMinimized !== null) {
      setMinimized(savedMinimized === "true")
    }
  }, [])

  // Add prompt examples at the beginning of the component
  const promptExamples = [
    "Analyze the security risks of Lido's stETH implementation",
    "Explain the Euler Finance hack and its impact",
    "What are the most common vulnerabilities in cross-chain bridges?",
    "Compare flash loan attack vectors across DeFi protocols",
    "How can I protect my protocol against oracle manipulation?",
    "What security measures should I implement for my new DeFi project?",
  ]

  // Add a welcome message with examples
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to RektGPT. I'm trained on all Rekt News articles, on-chain data, and security incidents. How can I help you today?",
      timestamp: new Date(),
    },
    {
      id: "examples",
      role: "assistant",
      content: "Here are some examples of what you can ask me:",
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

  // Toggle minimized state
  const toggleMinimized = () => {
    const newMinimized = !minimized
    setMinimized(newMinimized)
    localStorage.setItem("aiAssistantMinimized", String(newMinimized))

    if (onToggleMinimized) {
      onToggleMinimized()
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-black">
      <div className="flex items-center justify-between p-1 border-b border-gray-800 bg-black w-full">
        <div className="flex items-center">
          <Bot size={16} className="text-blue-400 mr-2" />
          <span className="text-sm font-bold text-white">REKTGPT AI ASSISTANT</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={toggleMinimized}
            className="text-gray-400 hover:text-white p-1"
            title={minimized ? "Expand" : "Minimize"}
          >
            {minimized ? <ArrowsMaximize size={12} /> : <ArrowsMinimize size={12} />}
          </button>
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="text-gray-400 hover:text-white p-1"
              title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              <Maximize2 size={14} />
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1" title="Close">
              <ArrowLeft size={14} />
            </button>
          )}
        </div>
      </div>

      <div className={`flex-1 overflow-auto p-2 space-y-4 bg-black w-full ${minimized ? "hidden" : ""}`}>
        <div className="flex justify-start w-full">
          <div className="max-w-[80%] rounded-lg p-3 bg-gray-900 border border-gray-700">
            <div className="flex items-center mb-1">
              <Bot size={14} className="text-blue-400 mr-1" />
              <span className="text-xs text-blue-400">RektGPT</span>
              <span className="text-gray-500 text-xs ml-2">09:54</span>
            </div>
            <div className="text-xs text-white">
              Welcome to RektGPT. I'm trained on all Rekt News articles, on-chain data, and security incidents. How can
              I help you today?
            </div>
          </div>
        </div>

        <div className="mt-4 w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Ask about hacks, risk analysis, or on-chain activity..."
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e)
                }
              }}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900/30 text-blue-400 p-1 rounded"
              onClick={handleSubmit}
            >
              <Send size={16} />
            </button>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Trained on Rekt News archives, on-chain data, and security incidents through March 2025
          </div>
        </div>
      </div>
    </div>
  )
}

export default RektAIAssistant

