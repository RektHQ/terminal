"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { X, Check, ArrowLeft } from "lucide-react"

interface SubscriptionPageProps {
  onClose: () => void
}

export function SubscriptionPage({ onClose }: SubscriptionPageProps) {
  const { theme } = useTheme()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: "$19.99",
      period: "per month",
      features: [
        "Real-time security alerts",
        "Full access to REKT RADAR",
        "Protocol risk assessments",
        "Basic AI analysis tools",
      ],
    },
    {
      id: "annual",
      name: "Annual",
      price: "$199.99",
      period: "per year",
      features: [
        "All Monthly features",
        "Advanced AI risk analysis",
        "Custom watchlists",
        "Priority alerts",
        "Exclusive research reports",
      ],
      popular: true,
    },
    {
      id: "lifetime",
      name: "Lifetime",
      price: "$999.99",
      period: "one-time",
      features: [
        "All Annual features",
        "Lifetime access",
        "Early access to new features",
        "Direct access to security researchers",
        "Custom security audits",
        "Personalized risk reports",
      ],
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="w-full max-w-4xl bg-black border border-gray-800 p-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="flex items-center text-gray-400 hover:text-white">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white">Upgrade to REKT Pro</h2>
        <p className="text-gray-400 mb-8">
          Get exclusive access to premium features and stay ahead of security threats
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id ? "border-white bg-white/5" : "border-gray-800 hover:border-gray-600"
              } ${plan.popular ? "relative" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold py-1 px-3 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 ml-1">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-white mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-md transition-colors ${
                  selectedPlan === plan.id ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>

        <div className="border border-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-white">Payment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className={`py-3 px-8 rounded-md font-bold ${
              selectedPlan ? "bg-white text-black hover:bg-gray-200" : "bg-gray-800 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedPlan}
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  )
}

