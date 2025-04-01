"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { Copy, Check, Share2 } from "lucide-react"

export function ReferralBanner() {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  // Generate a mock referral code
  const referralCode = "REKT" + Math.random().toString(36).substring(2, 8).toUpperCase()
  const referralLink = `https://rekt.news/ref/${referralCode}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInvite = () => {
    setShowShareOptions(!showShareOptions)
  }

  return (
    <div className="w-full bg-[#050a24] p-4 my-4 rounded-md relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2">GET 10% OF FRENS POINTS</h3>

        <p className="text-white mb-4">
          You will earn 10% points of what your invitee earns and your friend will also enjoy the boost of 20% to their
          points!
        </p>

        <div className="flex justify-end">
          <button
            onClick={handleInvite}
            className="bg-white text-[#050a24] py-2 px-6 font-bold text-center rounded transition-colors duration-200 hover:bg-gray-100"
          >
            INVITE FRIEND
          </button>
        </div>

        {showShareOptions && (
          <div className="mt-4 p-3 bg-black/50 rounded-md border border-gray-700">
            <div className="flex items-center mb-2">
              <span className="text-sm text-white mr-2">Your referral link:</span>
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-black border border-gray-700 rounded px-2 py-1 text-xs text-gray-300"
                />
                <button
                  onClick={handleCopyLink}
                  className="ml-2 p-1 rounded hover:bg-gray-800"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <button className="px-3 py-1.5 rounded text-sm flex items-center bg-blue-900/30 text-blue-400 border border-blue-400/50 hover:bg-blue-900/50">
                <Share2 size={14} className="mr-1.5" />
                Share via Email
              </button>
              <button className="px-3 py-1.5 rounded text-sm flex items-center bg-blue-900/30 text-blue-400 border border-blue-400/50 hover:bg-blue-900/50">
                <Share2 size={14} className="mr-1.5" />
                Share via Twitter
              </button>
              <button className="px-3 py-1.5 rounded text-sm flex items-center bg-blue-900/30 text-blue-400 border border-blue-400/50 hover:bg-blue-900/50">
                <Share2 size={14} className="mr-1.5" />
                Share via Telegram
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

