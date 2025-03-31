"use client"

import React from 'react'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw, AlertCircle, Clock, ArrowLeft, Pause, Play } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ScrollArea } from "./ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export default function CleaningProcess() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentDonor, setCurrentDonor] = useState(1)
  const [completedDonors, setCompletedDonors] = useState<number[]>([])
  const [logs, setLogs] = useState<{ time: string; message: string; type: "info" | "success" | "warning" | "error" }[]>(
    [],
  )
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState("25 minutes")

  // Mock donor data
  const donorData = [
    { id: 1, name: "John Smith", status: "completed", changes: ["email", "worth"] },
    { id: 2, name: "Sarah Johnson", status: "completed", changes: ["email"] },
    { id: 3, name: "Robert Chen", status: "in-progress", changes: [] },
    { id: 4, name: "Maria Garcia", status: "pending", changes: [] },
    { id: 5, name: "David Williams", status: "pending", changes: [] },
    { id: 6, name: "Jennifer Lee", status: "pending", changes: [] },
    { id: 7, name: "Michael Brown", status: "pending", changes: [] },
    { id: 8, name: "Emily Wilson", status: "pending", changes: [] },
    { id: 9, name: "James Taylor", status: "pending", changes: [] },
    { id: 10, name: "Sophia Martinez", status: "pending", changes: [] },
  ]

  // Simulate progress
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          router.push("/results")
          return 100
        }
        return prevProgress + 0.5
      })

      // Update estimated time remaining
      if (progress < 25) {
        setEstimatedTimeRemaining("25 minutes")
      } else if (progress < 50) {
        setEstimatedTimeRemaining("18 minutes")
      } else if (progress < 75) {
        setEstimatedTimeRemaining("10 minutes")
      } else {
        setEstimatedTimeRemaining("3 minutes")
      }

      // Add logs periodically
      if (Math.random() > 0.7) {
        addLog()
      }

      // Update current donor and completed donors
      if (progress > 20 && !completedDonors.includes(1)) {
        setCompletedDonors((prev) => [...prev, 1])
        setCurrentDonor(2)
      } else if (progress > 40 && !completedDonors.includes(2)) {
        setCompletedDonors((prev) => [...prev, 2])
        setCurrentDonor(3)
      } else if (progress > 60 && !completedDonors.includes(3)) {
        setCompletedDonors((prev) => [...prev, 3])
        setCurrentDonor(4)
      } else if (progress > 80 && !completedDonors.includes(4)) {
        setCompletedDonors((prev) => [...prev, 4])
        setCurrentDonor(5)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [progress, isPaused, router])

  const addLog = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString()

    const logMessages = [
      {
        message: `Searching for updated contact information for ${donorData[currentDonor - 1]?.name}`,
        type: "info" as const,
      },
      { message: `Found new email address for ${donorData[currentDonor - 1]?.name}`, type: "success" as const },
      { message: `Verifying financial information for ${donorData[currentDonor - 1]?.name}`, type: "info" as const },
      { message: `Updated estimated worth for ${donorData[currentDonor - 1]?.name}`, type: "success" as const },
      { message: `Searching social media profiles for ${donorData[currentDonor - 1]?.name}`, type: "info" as const },
      { message: `Rate limit reached for LinkedIn API, retrying...`, type: "warning" as const },
      { message: `Found employment history for ${donorData[currentDonor - 1]?.name}`, type: "success" as const },
      {
        message: `No new information found for ${donorData[currentDonor - 1]?.name}'s phone number`,
        type: "info" as const,
      },
      { message: `Analyzing public records for ${donorData[currentDonor - 1]?.name}`, type: "info" as const },
      { message: `Discovered new affiliation for ${donorData[currentDonor - 1]?.name}`, type: "success" as const },
    ]

    const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)]

    setLogs((prevLogs) => [
      { time: timeString, message: randomLog.message, type: randomLog.type },
      ...prevLogs.slice(0, 99), // Keep only the last 100 logs
    ])
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Cleaning Progress</CardTitle>
              <CardDescription>
                {isPaused ? "Process paused" : "Updating and enriching your donor database"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50">
                <Clock className="mr-1 h-3 w-3" />
                {estimatedTimeRemaining} remaining
              </Badge>
              <Badge variant="outline">{Math.floor(progress)}% Complete</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.floor(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Currently Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {donorData[currentDonor - 1]?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{donorData[currentDonor - 1]?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Donor #{currentDonor} of {donorData.length}
                    </p>
                    <div className="flex items-center mt-1">
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      <span className="text-xs">Searching for updated information</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Processing Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Processed</p>
                    <p className="text-2xl font-bold">
                      {completedDonors.length}{" "}
                      <span className="text-sm text-muted-foreground">/ {donorData.length}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Updated</p>
                    <p className="text-2xl font-bold">
                      {completedDonors.length} <span className="text-sm text-muted-foreground">donors</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Data Points</p>
                    <p className="text-2xl font-bold">
                      {completedDonors.length * 3} <span className="text-sm text-muted-foreground">updated</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Sources</p>
                    <p className="text-2xl font-bold">
                      {completedDonors.length * 5} <span className="text-sm text-muted-foreground">checked</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="progress">
            <TabsList>
              <TabsTrigger value="progress">Donor Progress</TabsTrigger>
              <TabsTrigger value="logs">Process Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="progress" className="mt-4">
              <ScrollArea className="h-[300px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Changes</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donorData.map((donor) => {
                      let statusBadge
                      let donorProgress = 0

                      if (donor.status === "completed" || completedDonors.includes(donor.id)) {
                        statusBadge = <Badge className="bg-green-50 text-green-700">Completed</Badge>
                        donorProgress = 100
                      } else if (donor.id === currentDonor) {
                        statusBadge = <Badge className="bg-blue-50 text-blue-700">In Progress</Badge>
                        donorProgress = Math.min(100, (progress % 20) * 5)
                      } else {
                        statusBadge = <Badge variant="outline">Pending</Badge>
                        donorProgress = 0
                      }

                      return (
                        <TableRow key={donor.id}>
                          <TableCell className="font-medium">{donor.name}</TableCell>
                          <TableCell>{statusBadge}</TableCell>
                          <TableCell>
                            {donor.status === "completed" || completedDonors.includes(donor.id) ? (
                              <span>{donor.changes.length > 0 ? `${donor.changes.length} changes` : "No changes"}</span>
                            ) : (
                              <span>-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Progress value={donorProgress} className="h-2 w-[100px]" />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="logs" className="mt-4">
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-2">
                  {logs.map((log, index) => (
                    <div key={index} className="text-sm flex items-start gap-2">
                      <span className="text-muted-foreground whitespace-nowrap">{log.time}</span>
                      <span
                        className={`flex-1 ${
                          log.type === "success"
                            ? "text-green-600"
                            : log.type === "warning"
                              ? "text-amber-600"
                              : log.type === "error"
                                ? "text-red-600"
                                : ""
                        }`}
                      >
                        {log.message}
                      </span>
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">Waiting for process to start...</div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <Alert className={isPaused ? "bg-yellow-50" : "bg-blue-50"}>
            {isPaused ? (
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            ) : (
              <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
            )}
            <AlertTitle>{isPaused ? "Process Paused" : "Processing Your Data"}</AlertTitle>
            <AlertDescription>
              {isPaused
                ? "The cleaning process is currently paused. Resume to continue updating your donor information."
                : "Our AI agents are searching the web for the latest information about your donors. This may take some time depending on the number of records."}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/preview")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Preview
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={togglePause}>
              {isPaused ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              )}
            </Button>
            <Button onClick={() => router.push("/results")} disabled={progress < 100}>
              {progress < 100 ? "Processing..." : "View Results"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

