"use client"

import { useTheme } from "../contexts/theme-context"
import type { SecurityPartner } from "../types/security"
import { Shield, CheckCircle } from "lucide-react"

interface SecurityPartnersProps {
  partners: SecurityPartner[]
}

export function SecurityPartners({ partners }: SecurityPartnersProps) {
  const { theme } = useTheme()

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <div className="flex items-center mb-4">
        <Shield className={headerClass} size={18} />
        <h3 className={`${headerClass} text-lg font-bold ml-2`}>Security Partners</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className={`flex items-start p-3 rounded ${theme === "hacker" ? "bg-gray-900" : "bg-gray-800"}`}
          >
            <div className="mt-1">
              <CheckCircle size={16} className={theme === "hacker" ? "text-green-500" : "text-white"} />
            </div>
            <div className="ml-3">
              <div className={`${textClass} font-bold`}>{partner.name}</div>
              <div className="text-gray-400 text-sm">{partner.description}</div>
              <div className="mt-1 text-xs">
                <span className={theme === "hacker" ? "text-green-500" : "text-gray-300"}>{partner.specialty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          All security partners use encrypted channels and FHE (Fully Homomorphic Encryption) to ensure your contract
          code remains private during analysis.
        </p>
      </div>
    </div>
  )
}

