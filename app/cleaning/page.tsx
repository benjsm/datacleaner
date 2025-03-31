import type { Metadata } from "next"
import React from "react"
import CleaningProcess from "../../components/cleaning-process"

export const metadata: Metadata = {
  title: "Cleaning Donor Data",
  description: "Updating and enriching your donor database",
}

export default function CleaningPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cleaning in Progress</h1>
          <p className="text-muted-foreground">
            Our AI agents are searching the web to update and enrich your donor information.
          </p>
        </div>
        <CleaningProcess />
      </div>
    </main>
  )
}
