"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Badge } from "./ui/badge"

export function NavBar() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="w-full border-b">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Data Cleaner</h1>
            <p className="text-sm text-muted-foreground">Upload your donor list to get the latest information</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={isActive("/") ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent"
              onClick={() => router.push("/")}
            >
              Upload
            </Badge>
            <Badge
              variant={isActive("/cleaning") ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent"
              onClick={() => router.push("/cleaning")}
            >
              Cleaning
            </Badge>
            <Badge
              variant={isActive("/results") ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent"
              onClick={() => router.push("/results")}
            >
              Results
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
} 