export interface UserPoints {
  totalPoints: number
  level: string
  nextLevel: string
  pointsToNextLevel: number
  breakdown: {
    category: string
    points: number
    description: string
  }[]
  rewards: {
    name: string
    pointsRequired: number
    claimed: boolean
    description: string
  }[]
  history: {
    date: string
    action: string
    points: number
  }[]
}

