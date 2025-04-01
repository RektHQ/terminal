"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import type { AuditPlatform } from "../types/audit-platform"
import { ExternalLink, Shield, ChevronDown, ChevronUp } from "lucide-react"

interface AuditPlatformsProps {
  platforms: AuditPlatform[]
}

export function AuditPlatforms({ platforms }: AuditPlatformsProps) {
  const { theme } = useTheme()
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null)

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"

  const togglePlatform = (id: string) => {
    if (expandedPlatform === id) {
      setExpandedPlatform(null)
    } else {
      setExpandedPlatform(id)
    }
  }

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <div className="flex items-center mb-4">
        <Shield className={headerClass} size={18} />
        <h3 className={`${headerClass} text-lg font-bold ml-2`}>Security Audit Contests & Review Platforms</h3>
      </div>

      <div className="space-y-3">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`p-3 border ${borderClass} cursor-pointer hover:bg-black/30 transition-colors ${expandedPlatform === platform.id ? "bg-black/30" : ""}`}
            onClick={() => togglePlatform(platform.id)}
          >
            <div className="flex justify-between items-center">
              <div className={`${headerClass} font-bold`}>{platform.name}</div>
              <div>
                {expandedPlatform === platform.id ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </div>
            </div>

            <div className={`${textClass} text-sm mt-1`}>{platform.description}</div>

            {expandedPlatform === platform.id && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                {platform.features.length > 0 && (
                  <div className="mb-3">
                    <ul className="list-disc pl-5 space-y-1">
                      {platform.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-400 text-sm">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center mt-2 ${
                    theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-white hover:text-gray-300"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} className="mr-1" />
                  Visit {platform.name}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          Find the right platform for your security needs or to contribute as a security researcher
        </p>
      </div>
    </div>
  )
}

