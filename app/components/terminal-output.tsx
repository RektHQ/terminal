"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { SecurityReport } from "./security-report"
import { SecurityPartners } from "./security-partners"
import { BountiesDisplay } from "./bounties-display"
import { HackVisualization } from "./hack-visualization"
import { NewsFeed } from "./news-feed"
import { DailyRecap } from "./daily-recap"
import { ExploitStats } from "./exploit-stats"
import { RektParlour } from "./rekt-parlour"
import type { Article } from "../types/article"

// Add imports for the new components
import { AuditPlatforms } from "./audit-platforms"
import { PointsDashboard } from "./points-dashboard"
import { SubscriptionTiers } from "./subscription-tiers"
import { FeatureRoadmap } from "./feature-roadmap"
// Add handling for the referral type in the TerminalOutput component
import { ReferralBanner } from "./referral-banner"

interface TerminalOutputProps {
  content: any
}

export function TerminalOutput({ content }: TerminalOutputProps) {
  const [expanded, setExpanded] = useState(false)
  const { theme } = useTheme()

  // Helper function to get the appropriate text class based on theme and color
  const getTextClass = (hackerColor: string) => {
    if (theme === "rekt") return "text-white font-mono"
    return hackerColor
  }

  if (typeof content === "string") {
    return <div className={getTextClass("terminal-text")}>{content}</div>
  }

  if (content.type === "welcome") {
    const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
    const titleClass = theme === "hacker" ? "text-red-500" : "text-white"

    return (
      <div className={`border ${borderClass} p-4 my-4 bg-black/50`}>
        <h2 className={`text-xl font-bold ${titleClass} mb-2`}>{content.title}</h2>
        <pre className={getTextClass("terminal-text whitespace-pre-wrap")}>{content.content}</pre>
      </div>
    )
  }

  if (content.type === "help") {
    const commandClass = theme === "hacker" ? "terminal-text-blue" : "text-white font-mono"
    const descClass = theme === "hacker" ? "terminal-text" : "text-gray-400 font-mono"
    const titleClass = theme === "hacker" ? "terminal-text-yellow mb-2" : "text-white font-mono mb-2"

    return (
      <div className="my-2">
        <div className={titleClass}>Available commands:</div>
        {content.commands.map((cmd: { command: string; description: string }, i: number) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <div className={`col-span-3 ${commandClass}`}>{cmd.command}</div>
            <div className={`col-span-9 ${descClass}`}>{cmd.description}</div>
          </div>
        ))}
      </div>
    )
  }

  if (content.type === "article-list") {
    const titleClass = theme === "hacker" ? "terminal-text-yellow mb-2" : "text-white font-mono mb-2"
    const idClass = theme === "hacker" ? "terminal-text-blue" : "text-white font-mono"
    const dateClass = theme === "hacker" ? "terminal-text-red" : "text-gray-400 font-mono"
    const borderClass = theme === "hacker" ? "border-gray-700" : "border-gray-600"

    return (
      <div className="my-2">
        <div className={titleClass}>{content.title}</div>
        {content.articles.map((article: Article, i: number) => (
          <div key={i} className={`border-b border-dashed ${borderClass} py-2`}>
            <div className="flex justify-between">
              <span className={idClass}>[{article.id}]</span>
              <span className={dateClass}>{article.date}</span>
            </div>
            <div className={getTextClass("terminal-text")}>{article.title}</div>
            <div className="text-gray-500 text-xs">
              {article.tags.map((tag, i) => (
                <span key={i} className="mr-2">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (content.type === "article") {
    const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
    const titleClass = theme === "hacker" ? "terminal-text-red" : "text-white font-mono"
    const dateClass = theme === "hacker" ? "terminal-text-blue" : "text-gray-400 font-mono"
    const tagClass = theme === "hacker" ? "bg-red-900/30 text-red-400" : "bg-gray-800 text-gray-300"
    const buttonClass = theme === "hacker" ? "text-red-500 hover:text-red-400" : "text-white hover:text-gray-300"
    const contentClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"

    return (
      <div className={`my-4 border ${borderClass} p-4 bg-black/50`}>
        <div className="flex justify-between mb-2">
          <h3 className={`${titleClass} text-lg font-bold`}>{content.article.title}</h3>
          <span className={dateClass}>{content.article.date}</span>
        </div>
        <div className="mb-4">
          {content.article.tags.map((tag: string, i: number) => (
            <span key={i} className={`mr-2 text-xs ${tagClass} px-2 py-1 rounded`}>
              #{tag}
            </span>
          ))}
        </div>
        <div className={`${contentClass} ${!expanded && content.article.content.length > 300 ? "line-clamp-5" : ""}`}>
          {content.article.content}
        </div>
        {content.article.content.length > 300 && (
          <button onClick={() => setExpanded(!expanded)} className={`mt-2 ${buttonClass} text-sm`}>
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
        {content.article.lossAmount && (
          <div className="mt-4 flex items-center">
            <span className={theme === "hacker" ? "terminal-text-red mr-2" : "text-white font-mono mr-2"}>DAMAGE:</span>
            <span className={theme === "hacker" ? "terminal-text-yellow" : "text-gray-300 font-mono"}>
              ${content.article.lossAmount.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    )
  }

  if (content.type === "error") {
    return <div className={theme === "hacker" ? "terminal-text-red" : "text-red-300 font-mono"}>{content.message}</div>
  }

  if (content.type === "scan") {
    const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
    const titleClass = theme === "hacker" ? "terminal-text-red" : "text-white font-mono"
    const contentClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"
    const labelClass = theme === "hacker" ? "terminal-text-blue" : "text-gray-300 font-mono"
    const valueClass = theme === "hacker" ? "terminal-text-yellow" : "text-white font-mono"
    const vulnClass = theme === "hacker" ? "terminal-text-red" : "text-red-300 font-mono"

    return (
      <div className={`my-4 border ${borderClass} p-4 bg-black/50`}>
        <h3 className={`${titleClass} text-lg font-bold mb-2`}>Security Scan Results</h3>
        <div className={`${contentClass} mb-2`}>Contract: {content.contract}</div>
        <div className="mb-4">
          <div className="flex items-center">
            <span className={`${labelClass} mr-2`}>Risk Score:</span>
            <div className="bg-gray-800 h-4 w-48 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  content.riskScore > 70 ? "bg-red-500" : content.riskScore > 40 ? "bg-yellow-500" : "bg-green-500"
                }`}
                style={{ width: `${content.riskScore}%` }}
              ></div>
            </div>
            <span className={`ml-2 ${valueClass}`}>{content.riskScore}/100</span>
          </div>
        </div>
        <div className="mb-4">
          <div className={`${labelClass} mb-1`}>Vulnerabilities Found:</div>
          {content.vulnerabilities.map((vuln: { name: string; severity: string; description: string }, i: number) => (
            <div key={i} className="mb-2 pl-4 border-l-2 border-red-500/50">
              <div className="flex items-center">
                <span className={`${vulnClass} mr-2`}>[{vuln.severity}]</span>
                <span className={contentClass}>{vuln.name}</span>
              </div>
              <div className="text-gray-400 text-sm">{vuln.description}</div>
            </div>
          ))}
        </div>
        <div className={valueClass}>Similar exploits found in {content.similarExploits} past incidents.</div>
      </div>
    )
  }

  if (content.type === "security-report") {
    return (
      <SecurityReport
        fileName={content.report.fileName}
        vulnerabilities={content.report.vulnerabilities}
        riskScore={content.report.riskScore}
        partners={content.report.partners}
      />
    )
  }

  if (content.type === "partners") {
    return <SecurityPartners partners={content.partners} />
  }

  if (content.type === "bounties") {
    return <BountiesDisplay hackBounties={content.hackBounties} auditBounties={content.auditBounties} />
  }

  if (content.type === "visualization") {
    return <HackVisualization data={content.visualization} />
  }

  if (content.type === "feed") {
    return <NewsFeed items={content.items} title="Rekt News Live Feed" />
  }

  if (content.type === "recap") {
    return <DailyRecap recap={content.recap} />
  }

  if (content.type === "stats") {
    return <ExploitStats />
  }

  if (content.type === "parlour") {
    return <RektParlour posts={content.posts} />
  }

  // Handle the new output types
  if (content.type === "platforms") {
    return <AuditPlatforms platforms={content.platforms} />
  }

  if (content.type === "points") {
    return <PointsDashboard points={content.points} />
  }

  if (content.type === "subscribe") {
    return <SubscriptionTiers tiers={content.tiers} />
  }

  if (content.type === "roadmap") {
    return <FeatureRoadmap />
  }

  // Add this case in the if-else chain
  if (content.type === "referral") {
    return <ReferralBanner />
  }

  if (content.type === "bloomberg" || content.type === "dashboard") {
    // Return a message instead of an object
    return <div className={getTextClass("terminal-text")}>Launching {content.type} interface...</div>
  }

  // Default fallback
  return <div className={getTextClass("terminal-text")}>{JSON.stringify(content)}</div>
}

