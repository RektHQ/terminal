export interface HackNode {
  id: string
  type: "contract" | "address" | "exchange" | "bridge" | "protocol"
  label: string
  value?: number // For sizing nodes
  group?: string // For coloring
}

export interface HackConnection {
  from: string
  to: string
  value: number // For line thickness
  label?: string
  dashes?: boolean // For different line styles
}

export interface HackVisualization {
  nodes: HackNode[]
  connections: HackConnection[]
  title: string
  description: string
}

