"use client"

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"

interface Donor {
  id: number
  name: string
  email: string
  phone: string
  lastDonation: string
  estimatedWorth: string
  lastUpdated: string
  changes?: string[]
}

interface DonorTableProps {
  donors: Donor[]
  showChanges?: boolean
}

export default function DonorTable({ donors, showChanges = false }: DonorTableProps) {
  return (
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
            {showChanges && <TableHead>Changes</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {donors.map((donor) => (
            <TableRow key={donor.id}>
              <TableCell className="font-medium">{donor.name}</TableCell>
              <TableCell className={donor.changes?.includes("email") ? "bg-yellow-50" : ""}>{donor.email}</TableCell>
              <TableCell>{donor.phone}</TableCell>
              <TableCell>{donor.lastDonation}</TableCell>
              <TableCell className={donor.changes?.includes("estimatedWorth") ? "bg-yellow-50" : ""}>
                {donor.estimatedWorth}
              </TableCell>
              <TableCell>{donor.lastUpdated}</TableCell>
              {showChanges && (
                <TableCell>
                  {donor.changes && donor.changes.length > 0 ? (
                    <Badge variant="outline" className="bg-yellow-50">
                      {donor.changes.length} changes
                    </Badge>
                  ) : (
                    <Badge variant="outline">No changes</Badge>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

