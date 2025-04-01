"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { useTerminalCommands } from "../hooks/use-terminal-commands"
import { TerminalInput } from "./terminal-input"
import { TerminalOutput } from "./terminal-output"
import { ContractDropzone } from "./contract-dropzone"
import { SecurityReport } from "./security-report"
import { analyzeContract, securityPartners } from "../services/security-service"
import { useTheme } from "../contexts/theme-context"
// Import the ReferralBanner component at the top of the file
import { LayoutGrid, Bot } from "lucide-react"
import { ReferralBanner } from "./referral-banner"

export interface TerminalRef {
  handleCommand: (command: string) => Promise<void>
  scrollToBottom: () => void
}

interface TerminalProps {
  onOpenAIConsole?: () => void
}

export const Terminal = forwardRef<TerminalRef, TerminalProps>(({ onOpenAIConsole }, ref) => {
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: any }>>([])
  const { executeCommand } = useTerminalCommands()
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [showDropzone, setShowDropzone] = useState(false)
  const [securityReport, setSecurityReport] = useState<any>(null)

  // Initial boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      await addOutput("Initializing REKT NEWS Terminal...")
      await sleep(500)
      await addOutput("Loading security database...")
      await sleep(800)
      await addOutput("Connecting to on-chain archives...")
      await sleep(600)
      await addOutput("Calibrating exploit detection systems...")
      await sleep(700)
      await addOutput("Establishing secure connections to security partners...")
      await sleep(900)
      await addOutput("REKT NEWS Terminal ready.")
      await sleep(300)
      await addOutput({
        type: "welcome",
        title: "REKT NEWS TERMINAL",
        content: `Since 2020, Rekt News has chronicled the chaos.
When projects fall, we explain why. When millions vanish, we trace the fault lines.
We don't do press releases. We publish post-mortems.

Type 'help' to see available commands.`,
      })

      // Add a message about the Bloomberg view and AI Console
      await addOutput(
        "TIP: You can switch to the Bloomberg-style dashboard by typing 'bloomberg' or clicking the Dashboard View button. You can also access the AI Console by typing 'ai' or clicking the AI Console button.",
      )
    }

    bootSequence()
  }, [])

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const addOutput = async (content: any) => {
    setHistory((prev) => [...prev, { type: "output", content }])
    await sleep(10) // Small delay to ensure scroll happens after render
    scrollToBottom()
  }

  const handleCommand = async (command: string) => {
    setHistory((prev) => [...prev, { type: "input", content: command }])

    // Special handling for the "analyze" command
    if (command.toLowerCase() === "analyze") {
      setShowDropzone(true)
      await addOutput("Drag and drop your smart contract file for security analysis.")
      scrollToBottom()
      return
    }

    // Special handling for the "partners" command
    if (command.toLowerCase() === "partners") {
      await addOutput({ type: "partners", partners: securityPartners })
      scrollToBottom()
      return
    }

    // Special handling for the "dashboard", "bloomberg", and "ai" commands
    if (command.toLowerCase() === "dashboard" || command.toLowerCase() === "bloomberg") {
      // Add a message to the terminal before switching views
      await addOutput(`Launching ${command.toLowerCase()} interface...`)
      scrollToBottom()
      // Let the parent component handle the view switching
      return
    }

    if (command.toLowerCase() === "ai" || command.toLowerCase() === "rektgpt") {
      // Add a message to the terminal before switching views
      await addOutput(`Launching AI Console...`)
      scrollToBottom()
      // Let the parent component handle the view switching
      return
    }

    const output = await executeCommand(command)

    // Special handling for the "clear" command
    if (output.type === "clear") {
      setHistory([])
      setSecurityReport(null)
      setShowDropzone(false)
      return
    }

    await addOutput(output)
    scrollToBottom()
  }

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  // Expose functions via ref
  useImperativeHandle(ref, () => ({
    handleCommand,
    scrollToBottom,
  }))

  // Scroll to bottom when terminal size changes (e.g., when entering fullscreen)
  useEffect(() => {
    scrollToBottom()
  }, [terminalRef.current?.clientHeight])

  const handleContractUpload = async (content: string, fileName: string) => {
    setShowDropzone(false)
    await addOutput(`Analyzing contract: ${fileName}`)
    await addOutput("Connecting to security partners for formal verification...")

    try {
      const report = await analyzeContract(content, fileName)
      setSecurityReport(report)
      await addOutput({ type: "security-report", report })
    } catch (error) {
      await addOutput({
        type: "error",
        message: `Error analyzing contract: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    }
  }

  const handleBloombergClick = () => {
    handleCommand("bloomberg")
  }

  const handleAIConsoleClick = () => {
    if (onOpenAIConsole) {
      onOpenAIConsole()
    } else {
      handleCommand("ai")
    }
  }

  const terminalClasses =
    theme === "hacker"
      ? "flex-1 bg-black text-green-500 p-4 overflow-y-auto crt-effect relative"
      : "flex-1 bg-black text-white p-4 overflow-y-auto relative"

  return (
    <div className={terminalClasses} ref={terminalRef}>
      {theme === "hacker" && <div className="scanline"></div>}

      {/* Floating buttons */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={handleAIConsoleClick}
          className={`${
            theme === "hacker"
              ? "bg-green-900/50 text-green-500 hover:bg-green-900/70 border border-green-500/50"
              : "bg-blue-900/50 text-blue-400 hover:bg-blue-900/70 border border-blue-400/50"
          } px-3 py-2 rounded flex items-center shadow-lg`}
        >
          <Bot size={16} className="mr-2" />
          <span>Open AI Console</span>
        </button>

        <button
          onClick={handleBloombergClick}
          className={`${
            theme === "hacker"
              ? "bg-green-900/50 text-green-500 hover:bg-green-900/70 border border-green-500/50"
              : "bg-blue-900/50 text-blue-400 hover:bg-blue-900/70 border border-blue-400/50"
          } px-3 py-2 rounded flex items-center shadow-lg`}
        >
          <LayoutGrid size={16} className="mr-2" />
          <span>Switch to Bloomberg Dashboard</span>
        </button>
      </div>

      {/* Add the ReferralBanner component here */}
      <ReferralBanner />

      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index}>
            {item.type === "input" ? (
              <div className="flex">
                <span className={theme === "hacker" ? "terminal-text-red mr-2" : "text-white font-mono mr-2"}>
                  rekt@terminal:~$
                </span>
                <span className={theme === "hacker" ? "terminal-text" : "text-white font-mono"}>{item.content}</span>
              </div>
            ) : (
              <TerminalOutput content={item.content} />
            )}
          </div>
        ))}
      </div>

      {showDropzone && (
        <div className="my-4">
          <ContractDropzone onContractUpload={handleContractUpload} />
        </div>
      )}

      {securityReport && (
        <SecurityReport
          fileName={securityReport.fileName}
          vulnerabilities={securityReport.vulnerabilities}
          riskScore={securityReport.riskScore}
          partners={securityReport.partners}
        />
      )}

      <TerminalInput onSubmit={handleCommand} />
    </div>
  )
})

Terminal.displayName = "Terminal"

