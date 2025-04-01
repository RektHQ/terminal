"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "hacker" | "rekt"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Update the default theme from "hacker" to "rekt"
  const [theme, setTheme] = useState<Theme>("rekt")

  useEffect(() => {
    // Load theme from localStorage on initial render
    const savedTheme = localStorage.getItem("rekt-terminal-theme") as Theme | null
    if (savedTheme && (savedTheme === "hacker" || savedTheme === "rekt")) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "hacker" ? "rekt" : "hacker"
    setTheme(newTheme)
    localStorage.setItem("rekt-terminal-theme", newTheme)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

