"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/hooks/use-toast"
import { Package, User, MapPin, Weight } from 'lucide-react'

export default function AddParcelPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [parcelData, setParcelData] = useState({
    sender: "",
    recipient: "",
    weight: "",
    status: "Processing",
    address: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Submitting parcel data:", parcelData)
    toast({
      title: "Parcel Added Successfully",
      description: "The new parcel has been added to the system.",
    })
    router.push("/dashboard/parcels")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setParcelData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Add New Parcel</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-semibold">
            <Package className="mr-2 h-5 w-5" />
            Parcel Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sender" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Sender
                </Label>
                <Input
                  id="sender"
                  name="sender"
                  value={parcelData.sender}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Recipient
                </Label>
                <Input
                  id="recipient"
                  name="recipient"
                  value={parcelData.recipient}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center">
                  <Weight className="mr-2 h-4 w-4" />
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={parcelData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  Status
                </Label>
                <Select
                  name="status"
                  value={parcelData.status}
                  onValueChange={(value) =>
                    setParcelData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Delivery Address
              </Label>
              <Textarea
                id="address"
                name="address"
                value={parcelData.address}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full">
              Add Parcel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
