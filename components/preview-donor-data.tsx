"use client"

import React from 'react'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Info, RefreshCw, Filter, Download, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ScrollArea } from "./ui/scroll-area"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function PreviewDonorData() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  // Mock data for demonstration
  const donorData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "555-123-4567",
      lastDonation: "$1,000",
      estimatedWorth: "$250K-500K",
      lastUpdated: "2022-05-15",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@oldmail.com",
      phone: "555-987-6543",
      lastDonation: "$5,000",
      estimatedWorth: "$1M-2M",
      lastUpdated: "2021-11-30",
      status: "active",
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.chen@company.org",
      phone: "555-456-7890",
      lastDonation: "$2,500",
      estimatedWorth: "$500K-1M",
      lastUpdated: "2022-01-22",
      status: "inactive",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "m.garcia@email.net",
      phone: "555-789-0123",
      lastDonation: "$750",
      estimatedWorth: "$100K-250K",
      lastUpdated: "2021-08-17",
      status: "active",
    },
    {
      id: 5,
      name: "David Williams",
      email: "d.williams@oldcompany.com",
      phone: "555-234-5678",
      lastDonation: "$10,000",
      estimatedWorth: "$2M-5M",
      lastUpdated: "2022-03-05",
      status: "active",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      email: "j.lee@nonprofit.org",
      phone: "555-345-6789",
      lastDonation: "$3,000",
      estimatedWorth: "$500K-1M",
      lastUpdated: "2022-02-18",
      status: "active",
    },
    {
      id: 7,
      name: "Michael Brown",
      email: "m.brown@oldmail.net",
      phone: "555-456-7890",
      lastDonation: "$500",
      estimatedWorth: "$100K-250K",
      lastUpdated: "2021-10-12",
      status: "inactive",
    },
    {
      id: 8,
      name: "Emily Wilson",
      email: "e.wilson@example.com",
      phone: "555-567-8901",
      lastDonation: "$2,000",
      estimatedWorth: "$250K-500K",
      lastUpdated: "2022-04-30",
      status: "active",
    },
    {
      id: 9,
      name: "James Taylor",
      email: "j.taylor@oldcompany.org",
      phone: "555-678-9012",
      lastDonation: "$7,500",
      estimatedWorth: "$1M-2M",
      lastUpdated: "2021-12-05",
      status: "active",
    },
    {
      id: 10,
      name: "Sophia Martinez",
      email: "s.martinez@email.com",
      phone: "555-789-0123",
      lastDonation: "$1,500",
      estimatedWorth: "$250K-500K",
      lastUpdated: "2022-01-15",
      status: "inactive",
    },
  ]

  const filteredData = donorData.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && donor.status === "active") ||
      (activeTab === "inactive" && donor.status === "inactive")

    return matchesSearch && matchesTab
  })

  const toggleRowSelection = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const toggleAllRows = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map((donor) => donor.id))
    }
  }

  const startCleaning = () => {
    router.push("/cleaning")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Data Preview</CardTitle>
              <CardDescription>Review your donor data before starting the cleaning process</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{donorData.length} Records</Badge>
              <Badge variant="outline" className="bg-green-50">
                {donorData.filter((d) => d.status === "active").length} Active
              </Badge>
              <Badge variant="outline" className="bg-yellow-50">
                {donorData.filter((d) => d.status === "inactive").length} Inactive
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Data Analysis Complete</AlertTitle>
            <AlertDescription>
              We've analyzed your donor data and found that{" "}
              {donorData.filter((d) => d.lastUpdated < "2022-01-01").length} records haven't been updated in over a
              year. The cleaning process will prioritize these records.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search donors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by worth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Worth Ranges</SelectItem>
                  <SelectItem value="low">Under $250K</SelectItem>
                  <SelectItem value="medium">$250K-$1M</SelectItem>
                  <SelectItem value="high">$1M-$5M</SelectItem>
                  <SelectItem value="vhigh">Over $5M</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Donors</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[400px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                            onChange={toggleAllRows}
                          />
                        </div>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Last Donation</TableHead>
                      <TableHead>Estimated Worth</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((donor) => (
                      <TableRow key={donor.id} className={donor.lastUpdated < "2022-01-01" ? "bg-yellow-50/50" : ""}>
                        <TableCell>
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedRows.includes(donor.id)}
                            onChange={() => toggleRowSelection(donor.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{donor.name}</TableCell>
                        <TableCell>{donor.email}</TableCell>
                        <TableCell>{donor.phone}</TableCell>
                        <TableCell>{donor.lastDonation}</TableCell>
                        <TableCell>{donor.estimatedWorth}</TableCell>
                        <TableCell>{donor.lastUpdated}</TableCell>
                        <TableCell>
                          <Badge
                            variant={donor.status === "active" ? "outline" : "secondary"}
                            className={donor.status === "active" ? "bg-green-50" : ""}
                          >
                            {donor.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              {/* Same table structure but filtered for active donors */}
            </TabsContent>
            <TabsContent value="inactive" className="mt-4">
              {/* Same table structure but filtered for inactive donors */}
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedRows.length} of {filteredData.length} donors selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Selected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cleaning Configuration</CardTitle>
          <CardDescription>Customize how we clean and update your donor data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Data Sources</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="public-records" defaultChecked />
                    <Label htmlFor="public-records">Public Records</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="social-media" defaultChecked />
                    <Label htmlFor="social-media">Social Media Profiles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="news-articles" defaultChecked />
                    <Label htmlFor="news-articles">News Articles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="company-websites" defaultChecked />
                    <Label htmlFor="company-websites">Company Websites</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="professional-networks" defaultChecked />
                    <Label htmlFor="professional-networks">Professional Networks</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Information to Update</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="contact-info" defaultChecked />
                    <Label htmlFor="contact-info">Contact Information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="employment" defaultChecked />
                    <Label htmlFor="employment">Employment Details</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="financial" defaultChecked />
                    <Label htmlFor="financial">Financial Background</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="relationships" defaultChecked />
                    <Label htmlFor="relationships">Relationships & Connections</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="interests" defaultChecked />
                    <Label htmlFor="interests">Interests & Affiliations</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Advanced Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="confidence-threshold">
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - More updates, less certain</SelectItem>
                    <SelectItem value="medium">Medium - Balanced approach</SelectItem>
                    <SelectItem value="high">High - Fewer updates, more certain</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Sets how confident our system needs to be before updating information.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="processing-priority">Processing Priority</Label>
                <Select defaultValue="outdated">
                  <SelectTrigger id="processing-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outdated">Outdated Records First</SelectItem>
                    <SelectItem value="highvalue">High-Value Donors First</SelectItem>
                    <SelectItem value="recent">Recently Active Donors First</SelectItem>
                    <SelectItem value="all">Process All Equally</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Determines which donor records are processed first.</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={startCleaning}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Cleaning Process
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

