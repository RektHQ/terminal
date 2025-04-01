"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "../contexts/theme-context"

interface TerminalInputProps {
  onSubmit: (command: string) => void
}

export function TerminalInput({ onSubmit }: TerminalInputProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Focus input when clicked anywhere in the terminal
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSubmit(input)
      setInput("")
    }
  }

  const promptClass = theme === "hacker" ? "terminal-text-red mr-2" : "text-white font-mono mr-2"
  const inputClass =
    theme === "hacker"
      ? "flex-1 bg-transparent outline-none terminal-text caret-red-500"
      : "flex-1 bg-transparent outline-none text-white font-mono caret-white"

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex">
      <span className={promptClass}>rekt@terminal:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={inputClass}
        autoFocus
        spellCheck="false"
        autoComplete="off"
      />
    </form>
  )
}

