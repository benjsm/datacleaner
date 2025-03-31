"use client"

import { useState } from "react"
import { Upload, FileUp, FileText, RefreshCw, CheckCircle, Info } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ScrollArea } from "./ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { useRouter } from "next/navigation"
import React from "react"

export default function DonorDataCleaner() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<"upload" | "preview" | "cleaning" | "results">("upload")
  const [progress, setProgress] = useState(0)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [cleaningStarted, setCleaningStarted] = useState(false)
  const [cleaningComplete, setCleaningComplete] = useState(false)

  // Mock data for demonstration
  const [donorData, setDonorData] = useState<any[]>([])
  const [cleanedData, setCleanedData] = useState<any[]>([])

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      // In a real app, you would parse the file here
      setFileUploaded(true)
      setCurrentStep("preview")

      // Mock data for demonstration
      setDonorData([
        {
          id: 1,
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "555-123-4567",
          lastDonation: "$1,000",
          estimatedWorth: "$250K-500K",
          lastUpdated: "2022-05-15",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah.j@oldmail.com",
          phone: "555-987-6543",
          lastDonation: "$5,000",
          estimatedWorth: "$1M-2M",
          lastUpdated: "2021-11-30",
        },
        {
          id: 3,
          name: "Robert Chen",
          email: "robert.chen@company.org",
          phone: "555-456-7890",
          lastDonation: "$2,500",
          estimatedWorth: "$500K-1M",
          lastUpdated: "2022-01-22",
        },
        {
          id: 4,
          name: "Maria Garcia",
          email: "m.garcia@email.net",
          phone: "555-789-0123",
          lastDonation: "$750",
          estimatedWorth: "$100K-250K",
          lastUpdated: "2021-08-17",
        },
        {
          id: 5,
          name: "David Williams",
          email: "d.williams@oldcompany.com",
          phone: "555-234-5678",
          lastDonation: "$10,000",
          estimatedWorth: "$2M-5M",
          lastUpdated: "2022-03-05",
        },
      ])
    }
  }

  const startCleaning = () => {
    setCurrentStep("cleaning")
    setCleaningStarted(true)

    // Simulate progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setCleaningComplete(true)
        setCurrentStep("results")

        // Mock updated data
        setCleanedData([
          {
            id: 1,
            name: "John Smith",
            email: "john.smith@newcompany.com",
            phone: "555-123-4567",
            lastDonation: "$1,000",
            estimatedWorth: "$500K-1M",
            lastUpdated: "2023-06-15",
            changes: ["email", "estimatedWorth"],
          },
          {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.johnson@enterprise.com",
            phone: "555-987-6543",
            lastDonation: "$5,000",
            estimatedWorth: "$2M-5M",
            lastUpdated: "2023-06-15",
            changes: ["email", "estimatedWorth"],
          },
          {
            id: 3,
            name: "Robert Chen",
            email: "robert.chen@company.org",
            phone: "555-456-7890",
            lastDonation: "$2,500",
            estimatedWorth: "$500K-1M",
            lastUpdated: "2023-06-15",
            changes: [],
          },
          {
            id: 4,
            name: "Maria Garcia",
            email: "maria.garcia@newcorp.com",
            phone: "555-789-0123",
            lastDonation: "$750",
            estimatedWorth: "$250K-500K",
            lastUpdated: "2023-06-15",
            changes: ["email", "estimatedWorth"],
          },
          {
            id: 5,
            name: "David Williams",
            email: "david.williams@bigfirm.com",
            phone: "555-234-5678",
            lastDonation: "$10,000",
            estimatedWorth: "$5M-10M",
            lastUpdated: "2023-06-15",
            changes: ["email", "estimatedWorth"],
          },
        ])
      }
    }, 200)
  }

  const resetProcess = () => {
    setCurrentStep("upload")
    setProgress(0)
    setFileUploaded(false)
    setCleaningStarted(false)
    setCleaningComplete(false)
    setDonorData([])
    setCleanedData([])
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Data Cleaner</CardTitle>
            <CardDescription>Upload your donor list to get the latest information</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={currentStep === "upload" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCurrentStep("upload")}
            >
              Upload
            </Badge>
            <Badge
              variant={currentStep === "preview" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => router.push("/preview")}
            >
              Preview
            </Badge>
            <Badge
              variant={currentStep === "cleaning" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => router.push("/cleaning")}
            >
              Cleaning
            </Badge>
            <Badge
              variant={currentStep === "results" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => router.push("/results")}
            >
              Results
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={currentStep} value={currentStep} className="w-full">
          <TabsContent value="upload" className="mt-0">
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Supported formats</AlertTitle>
                <AlertDescription>
                  You can upload CSV, Excel (.xlsx), or JSON files containing your donor information.
                </AlertDescription>
              </Alert>

              <div className="border-2 border-dashed rounded-lg p-10 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="bg-muted rounded-full p-4">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">Upload your donor database</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Drag and drop your file here, or click to browse. We'll analyze the data and prepare it for
                      cleaning.
                    </p>
                  </div>
                  <Button onClick={() => handleFileUpload(new DataTransfer().files)}>
                    <FileUp className="mr-2 h-4 w-4" />
                    Select File
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0 space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Data Preview</AlertTitle>
              <AlertDescription>
                Review your donor data before starting the cleaning process. We've detected {donorData.length} records.
              </AlertDescription>
            </Alert>

            <ScrollArea className="h-[350px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Last Donation</TableHead>
                    <TableHead>Estimated Worth</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donorData.map((donor) => (
                    <TableRow key={donor.id}>
                      <TableCell className="font-medium">{donor.name}</TableCell>
                      <TableCell>{donor.email}</TableCell>
                      <TableCell>{donor.phone}</TableCell>
                      <TableCell>{donor.lastDonation}</TableCell>
                      <TableCell>{donor.estimatedWorth}</TableCell>
                      <TableCell>{donor.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            <div className="space-y-4">
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Cleaning Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="contact-info" defaultChecked />
                    <Label htmlFor="contact-info">Update contact information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="financial" defaultChecked />
                    <Label htmlFor="financial">Research financial background</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="social" defaultChecked />
                    <Label htmlFor="social">Find social media profiles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="employment" defaultChecked />
                    <Label htmlFor="employment">Update employment information</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cleaning" className="mt-0 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">Cleaning in progress</h3>
                <Badge variant="outline">{progress}% Complete</Badge>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing donor records</span>
                  <Badge variant="outline" className={progress >= 20 ? "bg-green-100" : ""}>
                    {progress >= 20 ? "Complete" : "In progress"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Searching for updated contact information</span>
                  <Badge variant="outline" className={progress >= 40 ? "bg-green-100" : ""}>
                    {progress >= 40 ? "Complete" : progress >= 20 ? "In progress" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Researching financial backgrounds</span>
                  <Badge variant="outline" className={progress >= 60 ? "bg-green-100" : ""}>
                    {progress >= 60 ? "Complete" : progress >= 40 ? "In progress" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Finding social media profiles</span>
                  <Badge variant="outline" className={progress >= 80 ? "bg-green-100" : ""}>
                    {progress >= 80 ? "Complete" : progress >= 60 ? "In progress" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Compiling final results</span>
                  <Badge variant="outline" className={progress >= 100 ? "bg-green-100" : ""}>
                    {progress >= 100 ? "Complete" : progress >= 80 ? "In progress" : "Pending"}
                  </Badge>
                </div>
              </div>

              <Alert className="bg-muted">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <AlertTitle>Processing your data</AlertTitle>
                <AlertDescription>
                  Our AI agents are searching the web for the latest information about your donors. This may take a few
                  minutes.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-0 space-y-6">
            <Alert className="bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Cleaning Complete</AlertTitle>
              <AlertDescription>
                We've updated information for {cleanedData.filter((d) => d.changes.length > 0).length} out of{" "}
                {cleanedData.length} donors.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">Results</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Excel
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[350px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Last Donation</TableHead>
                      <TableHead>Estimated Worth</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Changes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cleanedData.map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell className="font-medium">{donor.name}</TableCell>
                        <TableCell className={donor.changes.includes("email") ? "bg-yellow-50" : ""}>
                          {donor.email}
                        </TableCell>
                        <TableCell>{donor.phone}</TableCell>
                        <TableCell>{donor.lastDonation}</TableCell>
                        <TableCell className={donor.changes.includes("estimatedWorth") ? "bg-yellow-50" : ""}>
                          {donor.estimatedWorth}
                        </TableCell>
                        <TableCell>{donor.lastUpdated}</TableCell>
                        <TableCell>
                          {donor.changes.length > 0 ? (
                            <Badge variant="outline" className="bg-yellow-50">
                              {donor.changes.length} changes
                            </Badge>
                          ) : (
                            <Badge variant="outline">No changes</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>

              <div className="space-y-4">
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            {cleanedData.filter((d) => d.changes.includes("email")).length}
                          </div>
                          <p className="text-sm text-muted-foreground">Email Updates</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            {cleanedData.filter((d) => d.changes.includes("estimatedWorth")).length}
                          </div>
                          <p className="text-sm text-muted-foreground">Financial Updates</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            {cleanedData.length - cleanedData.filter((d) => d.changes.length > 0).length}
                          </div>
                          <p className="text-sm text-muted-foreground">No Changes Needed</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetProcess}>
          Start Over
        </Button>

        {currentStep === "upload" && (
          <Button disabled={!fileUploaded} onClick={() => router.push("/preview")}>
            Next
          </Button>
        )}

        {currentStep === "preview" && (
          <Button onClick={() => router.push("/cleaning")}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Cleaning
          </Button>
        )}

        {currentStep === "cleaning" && (
          <Button disabled={!cleaningComplete} onClick={() => router.push("/results")}>
            View Results
          </Button>
        )}

        {currentStep === "results" && (
          <Button onClick={() => router.push("/")}>
            <FileText className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

