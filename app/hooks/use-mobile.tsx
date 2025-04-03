"use client"

import { useState, useEffect } from "react"

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if the window width is mobile-sized
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // Consider devices with width < 768px as mobile
    }

    // Check on initial render
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

