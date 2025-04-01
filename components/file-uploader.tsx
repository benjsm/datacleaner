"use client"

import React from 'react'
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { FileUp } from "lucide-react"
import { Button } from "./ui/button"
import { api } from "@/lib/api"
import { toast } from "./ui/use-toast"

interface FileUploaderProps {
  onFileUpload: (jobId: string) => void
  accept?: string
}

export default function FileUploader({ onFileUpload, accept = ".csv,.xlsx,.json,.pdf" }: FileUploaderProps) {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    setIsUploading(true)

    try {
      const response = await api.uploadFile(file)
      onFileUpload(response.jobId)
      router.push("/cleaning")
      toast({
        title: "File uploaded successfully",
        description: "Starting the cleaning process...",
      })
    } catch (error) {
      console.error('Upload failed:', error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleUpload(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpload(e.target.files)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" accept={accept} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-muted rounded-full p-4">
          <FileUp className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Upload your donor database</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Drag and drop your file here, or click to browse. We support CSV, Excel, JSON, and PDF formats.
          </p>
        </div>
        <Button onClick={handleButtonClick} disabled={isUploading}>
          <FileUp className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading..." : "Select File"}
        </Button>
      </div>
    </div>
  )
}

