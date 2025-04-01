"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useTheme } from "../contexts/theme-context"
import { FileCode, Shield } from "lucide-react"

interface ContractDropzoneProps {
  onContractUpload: (content: string, fileName: string) => void
}

export function ContractDropzone({ onContractUpload }: ContractDropzoneProps) {
  const { theme } = useTheme()
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      setIsProcessing(true)

      const files = Array.from(e.dataTransfer.files)
      if (files.length === 0) {
        setIsProcessing(false)
        return
      }

      try {
        const file = files[0]
        const text = await file.text()

        // Simulate processing delay
        setTimeout(() => {
          onContractUpload(text, file.name)
          setIsProcessing(false)
        }, 1500)
      } catch (error) {
        console.error("Error reading file:", error)
        setIsProcessing(false)
      }
    },
    [onContractUpload],
  )

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      setIsProcessing(true)
      try {
        const file = files[0]
        const text = await file.text()

        // Simulate processing delay
        setTimeout(() => {
          onContractUpload(text, file.name)
          setIsProcessing(false)
        }, 1500)
      } catch (error) {
        console.error("Error reading file:", error)
        setIsProcessing(false)
      }

      // Reset the input
      e.target.value = ""
    },
    [onContractUpload],
  )

  const borderClass = isDragging
    ? theme === "hacker"
      ? "border-green-500"
      : "border-white"
    : theme === "hacker"
      ? "border-red-500/30"
      : "border-white/30"

  const textClass = theme === "hacker" ? "text-green-500" : "text-white"

  return (
    <div
      className={`relative border-2 border-dashed ${borderClass} rounded-md p-6 transition-colors duration-200 ease-in-out`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="contract-file"
        className="hidden"
        accept=".sol,.vy,.js,.ts,.json"
        onChange={handleFileInput}
      />

      <div className="flex flex-col items-center justify-center space-y-2">
        {isProcessing ? (
          <>
            <div className="animate-spin">
              <Shield className={textClass} size={32} />
            </div>
            <p className={`${textClass} text-center`}>Analyzing contract with formal verification...</p>
          </>
        ) : (
          <>
            <FileCode className={textClass} size={32} />
            <p className={`${textClass} text-center`}>Drag and drop your smart contract file here</p>
            <p className="text-gray-500 text-sm text-center">or</p>
            <label
              htmlFor="contract-file"
              className={`cursor-pointer ${theme === "hacker" ? "text-red-500 hover:text-red-400" : "text-white hover:text-gray-300"}`}
            >
              Browse files
            </label>
            <p className="text-gray-500 text-xs text-center mt-2">Supports .sol, .vy, .js, .ts, .json</p>
          </>
        )}
      </div>
    </div>
  )
}

