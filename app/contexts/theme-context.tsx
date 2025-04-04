// SPDX-License-Identifier: MIT
"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "hacker" | "soft" | "bw"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Update the default theme from "rekt" to "soft"
  const [theme, setTheme] = useState<Theme>("soft")

  useEffect(() => {
    // Load theme from localStorage on initial render
    const savedTheme = localStorage.getItem("rekt-terminal-theme") as Theme | null
    if (savedTheme && (savedTheme === "hacker" || savedTheme === "soft" || savedTheme === "bw")) {
      setTheme(savedTheme)
    }
  }, [])

  // Apply theme to HTML element
  useEffect(() => {
    // Remove all theme data attributes
    document.documentElement.removeAttribute("data-theme")

    // Add the current theme data attribute
    document.documentElement.setAttribute("data-theme", theme)

    // Save theme to localStorage
    localStorage.setItem("rekt-terminal-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    // Cycle through the three themes: hacker -> soft -> bw -> hacker
    const newTheme = theme === "hacker" ? "soft" : theme === "soft" ? "bw" : "hacker"
    setTheme(newTheme)
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

