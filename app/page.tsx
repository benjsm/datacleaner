import type { Metadata } from "next"
import DonorDataCleaner from "@/components/donor-data-cleaner"

export const metadata: Metadata = {
  title: "Donor Data Cleaner",
  description: "Clean and update your donor database with the latest information",
}

export default function Page() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Donor Data Cleaner</h1>
          <p className="text-muted-foreground">
            Upload your donor database to refresh and enrich contact information and financial backgrounds.
          </p>
        </div>
        <DonorDataCleaner />
      </div>
    </main>
  )
}
