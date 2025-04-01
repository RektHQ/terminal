import type { HackVisualization } from "../types/hack-visualization"

export const mockHackVisualizations: Record<string, HackVisualization> = {
  wormhole: {
    title: "Wormhole Bridge Exploit",
    description: "Visualization of the February 2022 Wormhole bridge exploit showing fund flow",
    nodes: [
      { id: "1", type: "contract", label: "Wormhole Bridge", group: "source" },
      { id: "2", type: "address", label: "Attacker", group: "attacker" },
      { id: "3", type: "exchange", label: "Tornado Cash", group: "mixer" },
      { id: "4", type: "exchange", label: "CEX 1", group: "exchange" },
      { id: "5", type: "exchange", label: "CEX 2", group: "exchange" },
      { id: "6", type: "address", label: "Wallet 1", group: "wallet" },
      { id: "7", type: "address", label: "Wallet 2", group: "wallet" },
      { id: "8", type: "address", label: "Wallet 3", group: "wallet" },
      { id: "9", type: "bridge", label: "Cross-chain Bridge", group: "bridge" },
      { id: "10", type: "protocol", label: "DeFi Protocol", group: "defi" },
    ],
    connections: [
      { from: "1", to: "2", value: 10, label: "120,000 ETH" },
      { from: "2", to: "3", value: 5, label: "45,000 ETH" },
      { from: "2", to: "6", value: 3, label: "25,000 ETH" },
      { from: "2", to: "9", value: 4, label: "50,000 ETH" },
      { from: "6", to: "7", value: 2, label: "15,000 ETH" },
      { from: "6", to: "4", value: 1, label: "10,000 ETH" },
      { from: "7", to: "8", value: 1, label: "8,000 ETH" },
      { from: "8", to: "5", value: 1, label: "8,000 ETH" },
      { from: "9", to: "10", value: 4, label: "50,000 ETH" },
    ],
  },
  ronin: {
    title: "Ronin Bridge Exploit",
    description: "Visualization of the March 2022 Ronin bridge exploit showing fund flow",
    nodes: [
      { id: "1", type: "contract", label: "Ronin Bridge", group: "source" },
      { id: "2", type: "address", label: "Attacker", group: "attacker" },
      { id: "3", type: "exchange", label: "Tornado Cash", group: "mixer" },
      { id: "4", type: "exchange", label: "CEX 1", group: "exchange" },
      { id: "5", type: "exchange", label: "CEX 2", group: "exchange" },
      { id: "6", type: "address", label: "Wallet 1", group: "wallet" },
      { id: "7", type: "address", label: "Wallet 2", group: "wallet" },
      { id: "8", type: "address", label: "Wallet 3", group: "wallet" },
    ],
    connections: [
      { from: "1", to: "2", value: 10, label: "173,600 ETH + USDC" },
      { from: "2", to: "3", value: 6, label: "80,000 ETH" },
      { from: "2", to: "6", value: 4, label: "93,600 ETH + USDC" },
      { from: "6", to: "7", value: 3, label: "45,000 ETH" },
      { from: "6", to: "4", value: 1, label: "20,000 USDC" },
      { from: "7", to: "8", value: 2, label: "30,000 ETH" },
      { from: "8", to: "5", value: 2, label: "30,000 ETH" },
    ],
  },
}

