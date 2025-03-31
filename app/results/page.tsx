import type { Metadata } from "next"
import ResultsDashboard from "../../components/results-dashboard"
import React from "react"

export const metadata: Metadata = {
  title: "Donor Data Results",
  description: "View your cleaned and updated donor data",
}

export default function ResultsPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cleaning Results</h1>
          <p className="text-muted-foreground">Review the updated information and changes to your donor database.</p>
        </div>
        <ResultsDashboard />
      </div>
    </main>
  )
}

