import type React from "react"
import "./globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider as NextThemeProvider } from "@/components/theme-provider"
import { ThemeProvider } from "./contexts/theme-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Rekt AI Terminal",
  description: "The Rekt Security Intelligence Terminal — a public good for a public threat.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <NextThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeProvider>{children}</ThemeProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'