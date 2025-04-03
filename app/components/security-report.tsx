"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import type { SecurityPartner } from "../types/security"

interface SecurityReportProps {
  fileName: string
  vulnerabilities: Array<{
    id: string
    name: string
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO"
    description: string
    line?: number
    column?: number
    code?: string
    recommendation?: string
    references?: string[]
    detectedBy: string[]
  }>
  riskScore: number
  partners: SecurityPartner[]
}

export function SecurityReport({ fileName, vulnerabilities, riskScore, partners }: SecurityReportProps) {
  const { theme } = useTheme()
  const [expandedVuln, setExpandedVuln] = useState<string | null>(null)

  const toggleVulnerability = (id: string) => {
    if (expandedVuln === id) {
      setExpandedVuln(null)
    } else {
      setExpandedVuln(id)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return theme === "hacker" ? "text-red-500" : "text-red-400"
      case "HIGH":
        return theme === "hacker" ? "text-orange-500" : "text-orange-400"
      case "MEDIUM":
        return theme === "hacker" ? "text-yellow-500" : "text-yellow-400"
      case "LOW":
        return theme === "hacker" ? "text-blue-500" : "text-blue-400"
      case "INFO":
        return theme === "hacker" ? "text-gray-500" : "text-gray-400"
      default:
        return theme === "hacker" ? "text-gray-500" : "text-gray-400"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return <XCircle className={getSeverityColor(severity)} size={16} />
      case "HIGH":
        return <AlertTriangle className={getSeverityColor(severity)} size={16} />
      case "MEDIUM":
        return <AlertTriangle className={getSeverityColor(severity)} size={16} />
      case "LOW":
        return <Info className={getSeverityColor(severity)} size={16} />
      case "INFO":
        return <Info className={getSeverityColor(severity)} size={16} />
      default:
        return <Info className={getSeverityColor(severity)} size={16} />
    }
  }

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"
  const subheaderClass = theme === "hacker" ? "terminal-text-blue" : "text-gray-300"
  const codeClass = theme === "hacker" ? "bg-gray-900 text-green-500 font-mono" : "bg-gray-900 text-white font-mono"

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <h3 className={`${headerClass} text-lg font-bold mb-4`}>Security Analysis Report</h3>

      <div className="mb-4">
        <div className={`${textClass} mb-2`}>Contract: {fileName}</div>
        <div className="flex items-center mb-4">
          <span className={`${subheaderClass} mr-2`}>Risk Score:</span>
          <div className="bg-gray-800 h-4 w-48 rounded-full overflow-hidden">
            <div
              className={`h-full ${riskScore > 70 ? "bg-red-500" : riskScore > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              style={{ width: `${riskScore}%` }}
            ></div>
          </div>
          <span className={`ml-2 ${theme === "hacker" ? "terminal-text-yellow" : "text-white"}`}>{riskScore}/100</span>
        </div>
      </div>

      <div className="mb-6">
        <div className={`${subheaderClass} mb-2`}>Vulnerabilities Found: {vulnerabilities.length}</div>

        {vulnerabilities.map((vuln) => (
          <div
            key={vuln.id}
            className={`mb-3 border-l-2 ${
              vuln.severity === "CRITICAL"
                ? "border-red-500"
                : vuln.severity === "HIGH"
                  ? "border-orange-500"
                  : vuln.severity === "MEDIUM"
                    ? "border-yellow-500"
                    : vuln.severity === "LOW"
                      ? "border-blue-500"
                      : "border-gray-500"
            } pl-4`}
          >
            <div className="flex items-center cursor-pointer" onClick={() => toggleVulnerability(vuln.id)}>
              {getSeverityIcon(vuln.severity)}
              <span className={`${getSeverityColor(vuln.severity)} ml-2 font-bold`}>[{vuln.severity}]</span>
              <span className={`${textClass} ml-2`}>{vuln.name}</span>
            </div>

            {expandedVuln === vuln.id && (
              <div className="mt-2 pl-6">
                <div className="text-gray-400 text-xs mb-2">{vuln.description}</div>

                {vuln.line && (
                  <p className="text-gray-500 text-sm mb-2">
                    Location: Line {vuln.line}
                    {vuln.column ? `, Column ${vuln.column}` : ""}
                  </p>
                )}

                {vuln.code && (
                  <pre className={`${codeClass} p-2 rounded mb-2 overflow-x-auto text-xs`}>{vuln.code}</pre>
                )}

                {vuln.recommendation && (
                  <div className="mb-2">
                    <span className={`${theme === "hacker" ? "text-green-500" : "text-white"} font-bold`}>
                      Recommendation:
                    </span>
                    <p className="text-gray-400 text-xs">{vuln.recommendation}</p>
                  </div>
                )}

                <div className="mt-2 text-xs">
                  <span className="text-gray-500">Detected by: </span>
                  {vuln.detectedBy.map((partner, idx) => (
                    <span key={idx} className={theme === "hacker" ? "text-blue-500" : "text-blue-400"}>
                      {partner}
                      {idx < vuln.detectedBy.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                {vuln.references && vuln.references.length > 0 && (
                  <div className="mt-2 text-xs">
                    <span className="text-gray-500">References: </span>
                    <ul className="list-disc pl-5 mt-1">
                      {vuln.references.map((ref, idx) => (
                        <li key={idx} className={theme === "hacker" ? "text-blue-500" : "text-blue-400"}>
                          {ref}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className={`${subheaderClass} mb-2`}>Security Partners</div>
        <div className="flex flex-wrap gap-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`flex items-center px-3 py-2 rounded ${theme === "hacker" ? "bg-gray-900" : "bg-gray-800"}`}
            >
              <div className="w-4 h-4 mr-2 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle size={12} className="text-black" />
              </div>
              <span className={textClass}>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SecurityReport

