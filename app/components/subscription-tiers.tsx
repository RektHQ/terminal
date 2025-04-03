"use client"

import { useTheme } from "../contexts/theme-context"
import type { SubscriptionTier } from "../types/subscription"
import { Check, Star, CreditCard, Code, Building, Users } from "lucide-react"
import { useState } from "react"

interface SubscriptionTiersProps {
  tiers: SubscriptionTier[]
}

export function SubscriptionTiers({ tiers }: SubscriptionTiersProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<"retail" | "enterprise" | "api">("retail")

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"
  const activeTabClass =
    theme === "hacker"
      ? "bg-red-900/30 text-red-500 border-b-2 border-red-500"
      : "bg-blue-900/30 text-white border-b-2 border-white"
  const inactiveTabClass =
    theme === "hacker"
      ? "text-green-500 hover:bg-red-900/10 border-b-2 border-transparent"
      : "text-gray-400 hover:bg-blue-900/10 border-b-2 border-transparent"

  // Filter tiers based on active tab
  const filteredTiers = tiers.filter((tier) => {
    if (activeTab === "retail") return !tier.enterpriseTier && tier.id !== "rekt-api"
    if (activeTab === "enterprise") return tier.enterpriseTier
    if (activeTab === "api") return tier.id === "rekt-api"
    return true
  })

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <div className="flex items-center mb-6">
        <CreditCard className={headerClass} size={18} />
        <h3 className={`${headerClass} text-lg font-bold ml-2`}>Rekt Exclusive Club</h3>
      </div>

      {/* Tabs for different subscription categories */}
      <div className="flex mb-6 border-b border-gray-700">
        <button
          className={`px-4 py-2 flex items-center ${activeTab === "retail" ? activeTabClass : inactiveTabClass}`}
          onClick={() => setActiveTab("retail")}
        >
          <Users size={16} className="mr-2" />
          Retail Packages
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === "enterprise" ? activeTabClass : inactiveTabClass}`}
          onClick={() => setActiveTab("enterprise")}
        >
          <Building size={16} className="mr-2" />
          Enterprise
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === "api" ? activeTabClass : inactiveTabClass}`}
          onClick={() => setActiveTab("api")}
        >
          <Code size={16} className="mr-2" />
          API Access
        </button>
      </div>

      {/* Billing cycle selector - could be implemented for a more complete UI */}
      {activeTab === "enterprise" && (
        <div className="mb-6 bg-gray-900/50 p-2 rounded-md">
          <div className="flex justify-center space-x-2">
            <div className="bg-green-900/20 text-green-500 px-2 py-1 rounded text-xs">Save ~33%</div>
            <div className="bg-purple-900/20 text-purple-400 px-2 py-1 rounded text-xs">Save ~25%</div>
          </div>
          <div className="flex justify-center mt-2">
            <button className="px-4 py-1 text-sm text-gray-400">Biennial</button>
            <button className="px-4 py-1 text-sm text-white bg-gray-800 rounded">Annual</button>
            <button className="px-4 py-1 text-sm text-gray-400">Monthly</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTiers.map((tier) => (
          <div
            key={tier.id}
            className={`border ${borderClass} p-4 rounded-md ${
              tier.highlighted
                ? theme === "hacker"
                  ? "border-green-500 bg-green-900/10"
                  : "border-white bg-white/5"
                : ""
            }`}
          >
            {tier.highlighted && (
              <div className="flex justify-center -mt-8 mb-2">
                <div
                  className={`px-3 py-1 rounded-full text-xs ${
                    theme === "hacker" ? "bg-green-900 text-green-500" : "bg-blue-900 text-blue-400"
                  }`}
                >
                  MOST POPULAR
                </div>
              </div>
            )}

            <div className="text-center mb-4">
              <h4 className={`${headerClass} font-bold text-xl`}>{tier.name}</h4>
              <div className="flex justify-center items-baseline mt-2">
                {tier.customPricing ? (
                  <span className={`${textClass} text-xl font-bold`}>Custom</span>
                ) : (
                  <>
                    <span className={`${textClass} text-2xl font-bold`}>${tier.price}</span>
                    <span className="text-gray-400 text-sm ml-1">/{tier.billingCycle}</span>
                  </>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-300">{tier.tagline}</div>
            </div>

            <div className="space-y-3 mb-6">
              {tier.features.map((feature, idx) => (
                <div key={idx} className="flex">
                  <Check
                    size={16}
                    className={
                      theme === "hacker" ? "text-green-500 mr-2 shrink-0 mt-1" : "text-white mr-2 shrink-0 mt-1"
                    }
                  />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {tier.valueProposition && (
              <div className="mb-4 text-center">
                <div className="flex justify-center items-center">
                  <Star size={14} className={theme === "hacker" ? "text-yellow-500 mr-1" : "text-yellow-400 mr-1"} />
                  <span className={`text-sm ${theme === "hacker" ? "text-yellow-500" : "text-yellow-400"}`}>
                    {tier.valueProposition}
                  </span>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                className={`w-full py-2 px-4 rounded ${
                  theme === "hacker"
                    ? tier.highlighted
                      ? "bg-green-500 text-black hover:bg-green-400"
                      : "bg-red-900/50 text-red-500 hover:bg-red-900/70"
                    : tier.highlighted
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {tier.customPricing ? "Contact Sales" : "Subscribe Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">All plans include a 7-day free trial. Cancel anytime.</p>
        <p className="text-gray-500 text-xs mt-2">
          Subscription fees support independent security journalism and research.
        </p>
      </div>
    </div>
  )
}

