"use client"

import { useTheme } from "../contexts/theme-context"
import { Crown, X, Check, Users, Shield, Database } from "lucide-react"
import { useState } from "react"

export function SubscriptionBanner() {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showReferralModal, setShowReferralModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"retail" | "enterprise" | "api">("retail")
  const [referralCopied, setReferralCopied] = useState(false)

  if (!isVisible) return null

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true)
  }

  const handleReferFriendClick = () => {
    setShowReferralModal(true)
  }

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText("https://rekt.news/ref/REKT12345")
    setReferralCopied(true)
    setTimeout(() => setReferralCopied(false), 2000)
  }

  return (
    <>
      <div
        className={`w-full ${
          theme === "hacker"
            ? "bg-gradient-to-r from-black via-red-950 to-black border-b border-red-500/30"
            : theme === "bw"
              ? "bg-gradient-to-r from-black via-gray-900 to-black border-b border-white/30"
              : "bg-gradient-to-r from-black via-gray-900 to-black border-b border-white/30"
        } py-2 px-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Crown
              className={
                theme === "hacker"
                  ? "text-yellow-500 mr-2"
                  : theme === "bw"
                    ? "text-white mr-2"
                    : "text-yellow-400 mr-2"
              }
              size={18}
            />
            <span className={theme === "hacker" ? "text-red-500 font-bold" : "text-white font-bold"}>
              Upgrade to Rekt Pro
            </span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-300 text-sm">
              Get real-time alerts, custom dashboards, and AI-powered risk analysis
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleUpgradeClick}
              className={`mr-2 px-3 py-1 rounded text-sm ${
                theme === "hacker"
                  ? "bg-red-900/50 text-red-500 hover:bg-red-900/70"
                  : theme === "bw"
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Upgrade Now
            </button>
            <button
              onClick={handleReferFriendClick}
              className={`mr-4 px-3 py-1 rounded text-sm ${
                theme === "hacker"
                  ? "bg-green-900/50 text-green-500 hover:bg-green-900/70"
                  : theme === "bw"
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-blue-900/20 text-blue-400 hover:bg-blue-900/30"
              }`}
            >
              Refer Friend
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-gray-900 border ${theme === "hacker" ? "border-red-500" : theme === "bw" ? "border-white" : "border-white"} p-6 rounded-md max-w-4xl w-full`}
          >
            <h3 className={`${theme === "hacker" ? "text-red-500" : "text-white"} text-lg font-bold mb-4`}>
              Upgrade to Rekt Pro
            </h3>

            {/* Tabs for different subscription types */}
            <div className="flex mb-6 border-b border-gray-700">
              <button
                className={`px-4 py-2 ${
                  activeTab === "retail"
                    ? theme === "hacker"
                      ? "text-red-500 border-b-2 border-red-500"
                      : theme === "bw"
                        ? "text-white border-b-2 border-white"
                        : "text-white border-b-2 border-white"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("retail")}
              >
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  Retail Packages
                </div>
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "enterprise"
                    ? theme === "hacker"
                      ? "text-red-500 border-b-2 border-red-500"
                      : theme === "bw"
                        ? "text-white border-b-2 border-white"
                        : "text-white border-b-2 border-white"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("enterprise")}
              >
                <div className="flex items-center">
                  <Shield size={16} className="mr-2" />
                  Enterprise
                </div>
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "api"
                    ? theme === "hacker"
                      ? "text-red-500 border-b-2 border-red-500"
                      : theme === "bw"
                        ? "text-white border-b-2 border-white"
                        : "text-white border-b-2 border-white"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("api")}
              >
                <div className="flex items-center">
                  <Database size={16} className="mr-2" />
                  API Access
                </div>
              </button>
            </div>

            {/* Retail Packages */}
            {activeTab === "retail" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`p-4 border ${theme === "hacker" ? "border-red-500/30" : theme === "bw" ? "border-gray-700" : "border-gray-700"} rounded-md`}
                >
                  <h4 className="font-bold text-lg mb-2">Rekt Club</h4>
                  <div className="flex items-baseline mb-2">
                    <span className="text-xl font-bold">$12</span>
                    <span className="text-gray-400 text-sm ml-1">/month</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Essential Web3 Intelligence & Security</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Premium newsletter access</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Real-time security alerts</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Insider Web3 intelligence</span>
                    </li>
                  </ul>
                  <button
                    className={`w-full py-2 rounded ${theme === "hacker" ? "bg-red-900/50 text-red-500" : theme === "bw" ? "bg-white/20 text-white" : "bg-white/20 text-white"}`}
                  >
                    Subscribe
                  </button>
                </div>

                <div
                  className={`p-4 border ${theme === "hacker" ? "border-green-500" : theme === "bw" ? "border-white" : "border-white"} rounded-md bg-black/30 relative`}
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-black px-3 py-0.5 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                  <h4 className="font-bold text-lg mb-2">Rekt Expert</h4>
                  <div className="flex items-baseline mb-2">
                    <span className="text-xl font-bold">$49</span>
                    <span className="text-gray-400 text-sm ml-1">/month</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Deep Research, AI Risk Assessments & VIP Access</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Everything in Rekt Club</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Full premium research & deep-dive reports</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">AI-powered risk assessments</span>
                    </li>
                  </ul>
                  <button
                    className={`w-full py-2 rounded ${theme === "hacker" ? "bg-green-500 text-black" : theme === "bw" ? "bg-white text-black" : "bg-white text-black"}`}
                  >
                    Subscribe
                  </button>
                </div>

                <div
                  className={`p-4 border ${theme === "hacker" ? "border-red-500/30" : theme === "bw" ? "border-gray-700" : "border-gray-700"} rounded-md`}
                >
                  <h4 className="font-bold text-lg mb-2">Rekt OG</h4>
                  <div className="flex items-baseline mb-2">
                    <span className="text-xl font-bold">$99</span>
                    <span className="text-gray-400 text-sm ml-1">/month</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">The Ultimate Rekt Experience – Exclusive & VIP Only</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Everything in Rekt Expert</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">NFT claims & exclusive Web3 rewards</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">VIP access to partner events</span>
                    </li>
                  </ul>
                  <button
                    className={`w-full py-2 rounded ${theme === "hacker" ? "bg-red-900/50 text-red-500" : theme === "bw" ? "bg-white/20 text-white" : "bg-white/20 text-white"}`}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            )}

            {/* Enterprise Packages */}
            {activeTab === "enterprise" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-4 border ${theme === "hacker" ? "border-red-500/30" : theme === "bw" ? "border-gray-700" : "border-gray-700"} rounded-md`}
                >
                  <h4 className="font-bold text-lg mb-2">Enterprise Single Seat</h4>
                  <div className="flex items-baseline mb-2">
                    <span className="text-xl font-bold">$833</span>
                    <span className="text-gray-400 text-sm ml-1">/month</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Premium Enterprise Access for Individuals</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Everything in Rekt OG</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Advanced mindshare and sentiment analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Dedicated account manager</span>
                    </li>
                  </ul>
                  <div className="flex space-x-2">
                    <button
                      className={`flex-1 py-2 rounded ${theme === "hacker" ? "bg-red-900/50 text-red-500" : theme === "bw" ? "bg-white/20 text-white" : "bg-white/20 text-white"}`}
                    >
                      Pay Now
                    </button>
                    <button
                      className={`flex-1 py-2 rounded ${theme === "hacker" ? "bg-green-900/50 text-green-500" : theme === "bw" ? "bg-white/10 text-white" : "bg-blue-900/20 text-blue-400"}`}
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>

                <div
                  className={`p-4 border ${theme === "hacker" ? "border-red-500/30" : theme === "bw" ? "border-gray-700" : "border-gray-700"} rounded-md`}
                >
                  <h4 className="font-bold text-lg mb-2">Enterprise Multi-Seat</h4>
                  <div className="flex items-baseline mb-2">
                    <span className="text-xl font-bold">Custom</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Build your custom plan</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Multi-seat access for your entire team</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Advanced data queries and custom reports</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-300">Slack and other tooling integrations</span>
                    </li>
                  </ul>
                  <button
                    className={`w-full py-2 rounded ${theme === "hacker" ? "bg-green-500 text-black" : theme === "bw" ? "bg-white text-black" : "bg-white text-black"}`}
                  >
                    Contact Sales
                  </button>
                </div>
              </div>
            )}

            {/* API Access */}
            {activeTab === "api" && (
              <div className="p-4 border border-gray-700 rounded-md">
                <h4 className="font-bold text-lg mb-2">Rekt API</h4>
                <div className="flex items-baseline mb-2">
                  <span className="text-xl font-bold">$299</span>
                  <span className="text-gray-400 text-sm ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">Programmatic Access to Rekt Intelligence</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-300">
                      RESTful API access to Rekt security data and intelligence
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-300">
                      Real-time exploit alerts and vulnerability notifications
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-300">Historical exploit database with detailed analytics</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-300">
                      Risk scoring API for smart contract and protocol assessment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 mt-1 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-300">
                      Up to 10,000 API calls per month with 99.9% uptime SLA
                    </span>
                  </li>
                </ul>
                <div className="flex space-x-2">
                  <button
                    className={`flex-1 py-2 rounded ${theme === "hacker" ? "bg-red-900/50 text-red-500" : theme === "bw" ? "bg-white/20 text-white" : "bg-white/20 text-white"}`}
                  >
                    Subscribe
                  </button>
                  <button
                    className={`flex-1 py-2 rounded ${theme === "hacker" ? "bg-green-900/50 text-green-500" : theme === "bw" ? "bg-white/10 text-white" : "bg-blue-900/20 text-blue-400"}`}
                  >
                    Documentation
                  </button>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Enterprise API packages with higher rate limits available upon request.
                </p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button className="text-gray-400 hover:text-white" onClick={() => setShowUpgradeModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-gray-900 border ${theme === "hacker" ? "border-red-500" : theme === "bw" ? "border-white" : "border-white"} p-6 rounded-md max-w-md w-full`}
          >
            <h3 className={`${theme === "hacker" ? "text-red-500" : "text-white"} text-lg font-bold mb-4`}>
              Refer a Friend
            </h3>
            <p className="text-gray-300 text-sm mb-4">Share Rekt News with your friends and earn rewards:</p>

            <div className="bg-black p-3 rounded mb-4">
              <p className="text-gray-300 text-sm mb-2">Your referral link:</p>
              <div className="flex">
                <input
                  type="text"
                  value="https://rekt.news/ref/REKT12345"
                  readOnly
                  className="bg-gray-800 text-gray-300 text-xs p-2 rounded-l flex-1"
                />
                <button
                  onClick={handleCopyReferralLink}
                  className={`px-3 py-1 rounded-r ${
                    theme === "hacker"
                      ? "bg-green-900 text-green-500"
                      : theme === "bw"
                        ? "bg-white/20 text-white"
                        : "bg-blue-900 text-blue-400"
                  }`}
                >
                  {referralCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4">For each friend who subscribes, you'll receive:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-300 text-sm space-y-1">
              <li>1 month free subscription</li>
              <li>500 Rekt Points</li>
              <li>Access to exclusive content</li>
            </ul>

            <div className="flex justify-between mt-6">
              <button
                className={`px-4 py-2 rounded ${
                  theme === "hacker"
                    ? "bg-green-900/50 text-green-500"
                    : theme === "bw"
                      ? "bg-white/20 text-white"
                      : "bg-blue-900/20 text-blue-400"
                }`}
              >
                Share via Twitter
              </button>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowReferralModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SubscriptionBanner

