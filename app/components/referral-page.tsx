"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { X, Copy, Check, ArrowLeft, Mail, Twitter, Send } from "lucide-react"

interface ReferralPageProps {
  onClose: () => void
}

export function ReferralPage({ onClose }: ReferralPageProps) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState("")
  const [inviteSent, setInviteSent] = useState(false)

  // Generate a mock referral code
  const referralCode = "REKT" + Math.random().toString(36).substring(2, 8).toUpperCase()
  const referralLink = `https://rekt.news/ref/${referralCode}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendInvite = () => {
    if (email) {
      setInviteSent(true)
      setTimeout(() => {
        setInviteSent(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="w-full max-w-2xl bg-black border border-gray-800 p-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="flex items-center text-gray-400 hover:text-white">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white">Refer Friends & Earn Rewards</h2>
        <p className="text-gray-400 mb-8">
          For each friend who subscribes using your referral link, you'll earn 10% of their points and they'll get a 20%
          boost to their earnings.
        </p>

        <div className="bg-white/5 border border-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-white">Your Referral Link</h3>
          <div className="flex items-center mb-6">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-black border border-gray-700 rounded-l p-2 text-white focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-r border border-gray-700 border-l-0 flex items-center"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-300 mb-2">Share via Email</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black border border-gray-700 rounded-l p-2 text-white focus:outline-none focus:border-white"
              />
              <button
                onClick={handleSendInvite}
                className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-r border border-gray-700 border-l-0 flex items-center"
                disabled={!email || inviteSent}
              >
                {inviteSent ? <Check size={18} /> : <Mail size={18} />}
                <span className="ml-2">{inviteSent ? "Sent" : "Send"}</span>
              </button>
            </div>
          </div>

          <h4 className="text-sm font-bold text-gray-300 mb-2">Share via Social</h4>
          <div className="flex space-x-4">
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded flex items-center justify-center">
              <Twitter size={18} className="mr-2" />
              Twitter
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded flex items-center justify-center">
              <Send size={18} className="mr-2" />
              Telegram
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 text-white">Your Referral Stats</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400">Pending Invites</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400">Successful Referrals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400">Points Earned</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Start sharing your referral link to earn rewards. Track your progress here.
          </p>
        </div>
      </div>
    </div>
  )
}

