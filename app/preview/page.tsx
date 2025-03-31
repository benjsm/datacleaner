import type { Metadata } from "next"
import PreviewDonorData from "../../components/preview-donor-data"
import React from "react"

export const metadata: Metadata = {
  title: "Preview Donor Data",
  description: "Review your donor data before cleaning",
}

export default function PreviewPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Preview Donor Data</h1>
          <p className="text-muted-foreground">
            Review your donor database and configure cleaning options before processing.
          </p>
        </div>
        <PreviewDonorData />
      </div>
    </main>
  )
}

