"use client"

import React from 'react'
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Download,
  FileText,
  ArrowLeft,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  BarChart3,
  Users,
  DollarSign,
  Mail,
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ScrollArea } from "./ui/scroll-area"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function ResultsDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [activeTab, setActiveTab] = useState("all")

  // Mock cleaned data
  const cleanedData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@newcompany.com",
      oldEmail: "john.smith@example.com",
      phone: "555-123-4567",
      lastDonation: "$1,000",
      estimatedWorth: "$500K-1M",
      oldEstimatedWorth: "$250K-500K",
      lastUpdated: "2023-06-15",
      changes: ["email", "estimatedWorth"],
      status: "updated",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@enterprise.com",
      oldEmail: "sarah.j@oldmail.com",
      phone: "555-987-6543",
      lastDonation: "$5,000",
      estimatedWorth: "$2M-5M",
      oldEstimatedWorth: "$1M-2M",
      lastUpdated: "2023-06-15",
      changes: ["email", "estimatedWorth"],
      status: "updated",
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.chen@company.org",
      oldEmail: "robert.chen@company.org",
      phone: "555-456-7890",
      lastDonation: "$2,500",
      estimatedWorth: "$500K-1M",
      oldEstimatedWorth: "$500K-1M",
      lastUpdated: "2023-06-15",
      changes: [],
      status: "unchanged",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.garcia@newcorp.com",
      oldEmail: "m.garcia@email.net",
      phone: "555-789-0123",
      lastDonation: "$750",
      estimatedWorth: "$250K-500K",
      oldEstimatedWorth: "$100K-250K",
      lastUpdated: "2023-06-15",
      changes: ["email", "estimatedWorth"],
      status: "updated",
    },
    {
      id: 5,
      name: "David Williams",
      email: "david.williams@bigfirm.com",
      oldEmail: "d.williams@oldcompany.com",
      phone: "555-234-5678",
      lastDonation: "$10,000",
      estimatedWorth: "$5M-10M",
      oldEstimatedWorth: "$2M-5M",
      lastUpdated: "2023-06-15",
      changes: ["email", "estimatedWorth"],
      status: "updated",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      email: "jennifer.lee@neworg.org",
      oldEmail: "j.lee@nonprofit.org",
      phone: "555-345-6789",
      lastDonation: "$3,000",
      estimatedWorth: "$1M-2M",
      oldEstimatedWorth: "$500K-1M",
      lastUpdated: "2023-06-15",
      changes: ["email", "estimatedWorth"],
      status: "updated",
    },
    {
      id: 7,
      name: "Michael Brown",
      email: "m.brown@oldmail.net",
      oldEmail: "m.brown@oldmail.net",
      phone: "555-456-7890",
      lastDonation: "$500",
      estimatedWorth: "$100K-250K",
      oldEstimatedWorth: "$100K-250K",
      lastUpdated: "2023-06-15",
      changes: [],
      status: "unchanged",
    },
    {
      id: 8,
      name: "Emily Wilson",
      email: "emily.wilson@techcorp.com",
      oldEmail: "e.wilson@example.com",
      phone: "555-567-8901",
      lastDonation: "$2,000",
      estimatedWorth: "$500K-1M",
      oldEstimatedWorth: "$250K-500K",
      lastUpdated: "2023-06-15",
      changes: ["email", "estimatedWorth"],
      status: "updated",
    },
    {
      id: 9,
      name: "James Taylor",
      email: "james.taylor@newcompany.org",
      oldEmail: "j.taylor@oldcompany.org",
      phone: "555-678-9012",
      lastDonation: "$7,500",
      estimatedWorth: "$2M-5M",
      oldEstimatedWorth: "$1M-2M",
      lastUpdated: "2023-06-15",
      changes: ["email", "estimatedWorth"],
      status: "updated",
    },
    {
      id: 10,
      name: "Sophia Martinez",
      email: "s.martinez@email.com",
      oldEmail: "s.martinez@email.com",
      phone: "555-789-0123",
      lastDonation: "$1,500",
      estimatedWorth: "$250K-500K",
      oldEstimatedWorth: "$250K-500K",
      lastUpdated: "2023-06-15",
      changes: [],
      status: "unchanged",
    },
  ]

  // Filter and sort data
  const filteredData = cleanedData
    .filter((donor) => {
      const matchesSearch =
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "updated" && donor.status === "updated") ||
        (activeTab === "unchanged" && donor.status === "unchanged")

      return matchesSearch && matchesTab
    })
    .sort((a, b) => {
      let aValue, bValue

      switch (sortColumn) {
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "email":
          aValue = a.email
          bValue = b.email
          break
        case "worth":
          // Extract numeric values from worth strings for sorting
          aValue = Number.parseInt(a.estimatedWorth.replace(/[^0-9]/g, ""))
          bValue = Number.parseInt(b.estimatedWorth.replace(/[^0-9]/g, ""))
          break
        case "changes":
          aValue = a.changes.length
          bValue = b.changes.length
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Calculate statistics
  const totalDonors = cleanedData.length
  const updatedDonors = cleanedData.filter((d) => d.status === "updated").length
  const emailUpdates = cleanedData.filter((d) => d.changes.includes("email")).length
  const worthUpdates = cleanedData.filter((d) => d.changes.includes("estimatedWorth")).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Donors</p>
                <p className="text-2xl font-bold">{totalDonors}</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Updated Records</p>
                <p className="text-2xl font-bold">{updatedDonors}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email Updates</p>
                <p className="text-2xl font-bold">{emailUpdates}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Worth Updates</p>
                <p className="text-2xl font-bold">{worthUpdates}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Cleaned Donor Data</CardTitle>
              <CardDescription>Review the updated information for your donors</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50">
                {updatedDonors} Updated
              </Badge>
              <Badge variant="outline">{totalDonors - updatedDonors} Unchanged</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Cleaning Complete</AlertTitle>
            <AlertDescription>
              We've updated information for {updatedDonors} out of {totalDonors} donors. The most common updates were to
              email addresses ({emailUpdates}) and estimated worth ({worthUpdates}).
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
              <TabsTrigger value="updated">Updated</TabsTrigger>
              <TabsTrigger value="unchanged">Unchanged</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[400px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                        <div className="flex items-center">
                          Name
                          {sortColumn === "name" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                        <div className="flex items-center">
                          Email
                          {sortColumn === "email" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Last Donation</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("worth")}>
                        <div className="flex items-center">
                          Estimated Worth
                          {sortColumn === "worth" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("changes")}>
                        <div className="flex items-center">
                          Changes
                          {sortColumn === "changes" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((donor) => (
                      <TableRow key={donor.id} className={donor.changes.length > 0 ? "bg-green-50/50" : ""}>
                        <TableCell className="font-medium">{donor.name}</TableCell>
                        <TableCell>
                          {donor.email}
                          {donor.changes.includes("email") && (
                            <div className="text-xs text-muted-foreground mt-1">Previously: {donor.oldEmail}</div>
                          )}
                        </TableCell>
                        <TableCell>{donor.phone}</TableCell>
                        <TableCell>{donor.lastDonation}</TableCell>
                        <TableCell>
                          {donor.estimatedWorth}
                          {donor.changes.includes("estimatedWorth") && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Previously: {donor.oldEstimatedWorth}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {donor.changes.length > 0 ? (
                            <Badge variant="outline" className="bg-green-50">
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
            </TabsContent>
            <TabsContent value="updated" className="mt-4">
              {/* Same table structure but filtered for updated donors */}
            </TabsContent>
            <TabsContent value="unchanged" className="mt-4">
              {/* Same table structure but filtered for unchanged donors */}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-initial">
              <FileText className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-initial">
              <FileText className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
            <Button className="flex-1 sm:flex-initial">
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
