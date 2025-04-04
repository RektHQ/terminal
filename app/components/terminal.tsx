// SPDX-License-Identifier: MIT
"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { useTerminalCommands } from "../hooks/use-terminal-commands"
import { TerminalInput } from "./terminal-input"
import { TerminalOutput } from "./terminal-output"
import { ContractDropzone } from "./contract-dropzone"
import { SecurityReport } from "./security-report"
import { analyzeContract, securityPartners } from "../services/security-service"
import { useTheme } from "../contexts/theme-context"
import { ReferralBanner } from "./referral-banner"
// Add these imports at the top with the other imports:
import { TerminalHeader } from "./terminal-header"
import { TerminalFooter } from "./terminal-footer"
import { MarketTicker } from "./market-ticker"

export interface TerminalRef {
  handleCommand: (command: string) => Promise<void>
  scrollToBottom: () => void
}

interface TerminalProps {
  onOpenAIConsole?: () => void
  onExecuteCommand?: (command: string) => void
  onViewChange?: (view: "terminal" | "bloomberg") => void
  onAIConsoleClick?: () => void
}

export const Terminal = forwardRef<TerminalRef, TerminalProps>(
  ({ onViewChange, onAIConsoleClick, onExecuteCommand }, ref) => {
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
      if (
        command.toLowerCase() === "dashboard" ||
        command.toLowerCase() === "bloomberg" ||
        command.toLowerCase() === "rektdashboard"
      ) {
        // Add a message to the terminal before switching views
        await addOutput(`Launching ${command.toLowerCase()} interface...`)
        scrollToBottom()
        // Call the parent's handler to switch views
        if (onExecuteCommand) {
          // Ensure we're calling with the exact command
          onExecuteCommand(command.toLowerCase())
        }
        return
      }

      if (command.toLowerCase() === "ai" || command.toLowerCase() === "rektgpt") {
        // Add a message to the terminal before switching views
        await addOutput(`Launching AI Console...`)
        scrollToBottom()
        // Call the parent's handler to switch views
        if (onExecuteCommand) {
          onExecuteCommand(command.toLowerCase())
        }
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

    const terminalClasses =
      theme === "bw"
        ? "flex-1 bg-black text-white p-4 overflow-y-auto relative"
        : theme === "hacker"
          ? "flex-1 bg-black text-green-500 p-4 overflow-y-auto crt-effect relative"
          : "flex-1 bg-black text-white p-4 overflow-y-auto relative"

    // Replace the return statement with a complete terminal layout:
    return (
      <div className="flex flex-col h-screen w-full">
        <TerminalHeader
          onExecuteCommand={onExecuteCommand}
          isFullscreen={false}
          onToggleFullscreen={() => {}}
          onClose={() => {}}
        />
        <MarketTicker />

        <div className={terminalClasses} ref={terminalRef}>
          {theme === "hacker" && <div className="scanline"></div>}

          {/* Add the ReferralBanner component here */}
          <ReferralBanner />

          <div className="space-y-2">
            {history.map((item, index) => (
              <div key={index}>
                {item.type === "input" ? (
                  <div className="flex">
                    <span
                      className={
                        theme === "bw"
                          ? "text-white font-mono mr-2"
                          : theme === "hacker"
                            ? "terminal-text-red mr-2"
                            : "text-white font-mono mr-2"
                      }
                    >
                      rekt@terminal:~$
                    </span>
                    <span
                      className={
                        theme === "bw"
                          ? "text-white font-mono"
                          : theme === "hacker"
                            ? "terminal-text"
                            : "text-white font-mono"
                      }
                    >
                      {item.content}
                    </span>
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

        <TerminalFooter />
      </div>
    )
  },
)

Terminal.displayName = "Terminal"

