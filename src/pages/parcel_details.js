"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, MapPin, User, Calendar, Weight, DollarSign, Ruler, Box, Phone, Mail, Clock } from 'lucide-react'

// Simulated API call
const fetchParcelData = async () => {
  // In a real application, this would be an actual API call
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
  return {
    id: "P12345",
    status: "In Transit",
    estimatedDelivery: "June 7, 2023",
    sender: {
      name: "John Doe",
      address: "123 Sender St, Sender City, SC 12345",
      phone: "+1 (123) 456-7890",
      email: "john.doe@example.com"
    },
    recipient: {
      name: "Jane Smith",
      address: "456 Recipient Ave, Recipient City, RC 67890",
      phone: "+1 (098) 765-4321",
      email: "jane.smith@example.com"
    },
    details: {
      weight: "2.5 kg",
      dimensions: "30cm x 20cm x 10cm",
      contents: "Electronics",
      value: "$500"
    },
    tracking: [
      { date: "2023-06-01", time: "09:00", location: "Sender City", status: "Picked up" },
      { date: "2023-06-02", time: "14:30", location: "Transit Hub A", status: "In transit" },
      { date: "2023-06-03", time: "11:15", location: "Transit Hub B", status: "In transit" },
      { date: "2023-06-04", time: "16:45", location: "Recipient City", status: "Out for delivery" }
    ]
  }
}

export default function ParcelViewPage() {
  const [parcel, setParcel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loadParcelData = async () => {
      try {
        const data = await fetchParcelData()
        setParcel(data)
        // Calculate progress based on tracking events
        const progressPercentage = (data.tracking.length / 5) * 100
        setProgress(Math.min(progressPercentage, 100))
      } catch (error) {
        console.error("Failed to fetch parcel data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadParcelData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!parcel) {
    return <div className="flex justify-center items-center h-screen">Failed to load parcel data</div>
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Parcel Details</h1>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {parcel.status}
        </Badge>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Package className="mr-2" />
            Parcel {parcel.id}
          </CardTitle>
          <CardDescription className="text-lg">
            Estimated Delivery: {parcel.estimatedDelivery}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Picked up</span>
            <span>In Transit</span>
            <span>Out for Delivery</span>
            <span>Delivered</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Box className="mr-2" />
              Parcel Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Weight className="mr-2 text-muted-foreground" />
                <span className="font-semibold mr-2">Weight:</span>
                {parcel.details.weight}
              </div>
              <div className="flex items-center">
                <Ruler className="mr-2 text-muted-foreground" />
                <span className="font-semibold mr-2">Dimensions:</span>
                {parcel.details.dimensions}
              </div>
              <div className="flex items-center">
                <Box className="mr-2 text-muted-foreground" />
                <span className="font-semibold mr-2">Contents:</span>
                {parcel.details.contents}
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 text-muted-foreground" />
                <span className="font-semibold mr-2">Declared Value:</span>
                {parcel.details.value}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" />
              Sender & Recipient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Sender</h3>
                <p>{parcel.sender.name}</p>
                <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" />{parcel.sender.address}</p>
                <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground" />{parcel.sender.phone}</p>
                <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />{parcel.sender.email}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Recipient</h3>
                <p>{parcel.recipient.name}</p>
                <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" />{parcel.recipient.address}</p>
                <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground" />{parcel.recipient.phone}</p>
                <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />{parcel.recipient.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="mr-2" />
            Tracking Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Calendar className="mr-2 inline-block" />Date & Time</TableHead>
                <TableHead><MapPin className="mr-2 inline-block" />Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parcel.tracking.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <span className="font-medium">{event.date}</span>
                    <br />
                    <span className="text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />{event.time}
                    </span>
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline">
          <Package className="mr-2 h-4 w-4" />
          Print Label
        </Button>
        <Button>
          <Truck className="mr-2 h-4 w-4" />
          Update Status
        </Button>
      </div>
    </div>
  )
}

