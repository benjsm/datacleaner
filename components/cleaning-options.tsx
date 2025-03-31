"use client"
import React from 'react';
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"

interface CleaningOptionsProps {
  onChange?: (options: Record<string, boolean>) => void
}

export default function CleaningOptions({ onChange }: CleaningOptionsProps) {
  const handleChange = (key: string, value: boolean) => {
    if (onChange) {
      onChange({ [key]: value })
    }
  }

  return (
    <div className="space-y-4">
      <Separator />
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Cleaning Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="contact-info"
              defaultChecked
              onCheckedChange={(checked) => handleChange("contactInfo", checked)}
            />
            <Label htmlFor="contact-info">Update contact information</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="financial" defaultChecked onCheckedChange={(checked) => handleChange("financial", checked)} />
            <Label htmlFor="financial">Research financial background</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="social" defaultChecked onCheckedChange={(checked) => handleChange("social", checked)} />
            <Label htmlFor="social">Find social media profiles</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="employment" defaultChecked onCheckedChange={(checked) => handleChange("employment", checked)} />
            <Label htmlFor="employment">Update employment information</Label>
          </div>
        </div>
      </div>
    </div>
  )
}

