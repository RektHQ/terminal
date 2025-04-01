"use client"

import { useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { MessageSquare, ThumbsUp, Share2, ExternalLink } from "lucide-react"

interface ParlourPost {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  comments: number
  tags: string[]
}

interface RektParlourProps {
  posts: ParlourPost[]
}

export function RektParlour({ posts }: RektParlourProps) {
  const { theme } = useTheme()
  const [expandedPost, setExpandedPost] = useState<string | null>(null)

  const borderClass = theme === "hacker" ? "border-red-500/30" : "border-white/30"
  const headerClass = theme === "hacker" ? "text-red-500" : "text-white"
  const textClass = theme === "hacker" ? "terminal-text" : "text-white font-mono"
  const buttonClass = theme === "hacker" ? "text-green-500 hover:text-green-400" : "text-white hover:text-gray-300"

  const togglePost = (id: string) => {
    if (expandedPost === id) {
      setExpandedPost(null)
    } else {
      setExpandedPost(id)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className={`border ${borderClass} p-4 bg-black/50 my-4`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`${headerClass} text-lg font-bold`}>Rekt Parlour</h3>
        <a
          href="https://rekt.news/parlour"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center text-xs ${theme === "hacker" ? "text-red-500 hover:text-red-400" : "text-white hover:text-gray-300"}`}
        >
          <ExternalLink size={12} className="mr-1" />
          Visit Parlour
        </a>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className={`p-3 border ${borderClass} ${expandedPost === post.id ? "bg-black/30" : ""}`}>
            <div className="flex justify-between items-start mb-2">
              <div className={`font-bold ${textClass}`}>@{post.author}</div>
              <div className="text-gray-500 text-xs">{formatDate(post.timestamp)}</div>
            </div>

            <div
              className={`${textClass} text-sm mb-3 ${!expandedPost === post.id && post.content.length > 150 ? "line-clamp-3" : ""}`}
              onClick={() => togglePost(post.id)}
            >
              {post.content}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    theme === "hacker" ? "bg-red-900/20 text-red-500" : "bg-gray-800 text-gray-300"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button className={`flex items-center ${buttonClass}`}>
                  <ThumbsUp size={14} className="mr-1" />
                  <span className="text-xs">{post.likes}</span>
                </button>
                <button className={`flex items-center ${buttonClass}`}>
                  <MessageSquare size={14} className="mr-1" />
                  <span className="text-xs">{post.comments}</span>
                </button>
              </div>

              <button className={`flex items-center ${buttonClass}`}>
                <Share2 size={14} className="mr-1" />
                <span className="text-xs">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">Join the conversation in the Rekt Parlour</p>
      </div>
    </div>
  )
}

