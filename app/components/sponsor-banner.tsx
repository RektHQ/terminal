"use client"

import { useTheme } from "../contexts/theme-context"
import { Shield } from "lucide-react"
import { useIsMobile } from "../hooks/use-mobile"

interface Sponsor {
  id: string
  name: string
  logo?: string
}

const sponsors: Sponsor[] = [
  { id: "chainsecurity", name: "ChainSecurity" },
  { id: "guardrails", name: "Guardrails" },
  { id: "forta", name: "Forta" },
  { id: "certora", name: "Certora" },
  { id: "openzeppelin", name: "OpenZeppelin" },
  { id: "trail_of_bits", name: "Trail of Bits" },
  { id: "consensys", name: "ConsenSys Diligence" },
  { id: "immunefi", name: "Immunefi" },
]

export function SponsorBanner() {
  const { theme } = useTheme()
  const isMobile = useIsMobile()

  // For mobile, show fewer sponsors
  const displaySponsors = isMobile ? sponsors.slice(0, 4) : sponsors

  return (
    <div className={`bg-black border-t ${theme === "hacker" ? "border-red-500/30" : "border-white/30"} py-2 px-4`}>
      <div className={`flex ${isMobile ? "flex-col space-y-2" : "items-center justify-between"}`}>
        <div className="flex items-center text-xs">
          <Shield size={12} className={theme === "hacker" ? "text-red-500 mr-1" : "text-white mr-1"} />
          <span className="text-gray-500">SECURITY PARTNERS:</span>
        </div>
        <div className={`flex items-center ${isMobile ? "flex-wrap gap-2 mt-1" : "space-x-6"} overflow-x-auto`}>
          {displaySponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className={`flex items-center ${theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-white hover:text-gray-300"} text-xs font-bold cursor-pointer`}
            >
              <div className={`w-2 h-2 rounded-full ${theme === "hacker" ? "bg-green-500" : "bg-white"} mr-1.5`}></div>
              {sponsor.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

