'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Bell, Package, Truck, Users, Search, MapPin, Calendar, PlusCircle, Pencil, Trash2, Route } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const deliveryData = [
  { name: 'Mon', total: 120 },
  { name: 'Tue', total: 150 },
  { name: 'Wed', total: 180 },
  { name: 'Thu', total: 140 },
  { name: 'Fri', total: 200 },
  { name: 'Sat', total: 110 },
  { name: 'Sun', total: 90 },
]

const initialParcels = [
  { id: 'PRC001', recipient: 'John Doe', status: 'Delivered', destination: 'New York, NY' },
  { id: 'PRC002', recipient: 'Jane Smith', status: 'In Transit', destination: 'Los Angeles, CA' },
  { id: 'PRC003', recipient: 'Bob Johnson', status: 'Processing', destination: 'Chicago, IL' },
  { id: 'PRC004', recipient: 'Alice Brown', status: 'Out for Delivery', destination: 'Houston, TX' },
]

const initialVehicles = [
  { id: 'VEH001', type: 'Truck', status: 'Active', lastMaintenance: '2023-05-15' },
  { id: 'VEH002', type: 'Van', status: 'In Maintenance', lastMaintenance: '2023-06-01' },
  { id: 'VEH003', type: 'Motorcycle', status: 'Active', lastMaintenance: '2023-05-20' },
]

const initialRoutes = [
  { id: 'RTE001', name: 'Downtown Loop', startPoint: 'Central Depot', endPoint: 'Main Street', distance: '15 km' },
  { id: 'RTE002', name: 'Suburban Route', startPoint: 'Distribution Center', endPoint: 'Oakwood Mall', distance: '25 km' },
  { id: 'RTE003', name: 'Express Highway', startPoint: 'Airport Hub', endPoint: 'Business Park', distance: '40 km' },
]

export default function DashboardPage() {
  const [parcels, setParcels] = useState(initialParcels)
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [routes, setRoutes] = useState(initialRoutes)
  const [editingItem, setEditingItem] = useState(null)

  const handleAdd = (type, newItem) => {
    switch (type) {
      case 'parcel':
        setParcels([...parcels, { ...newItem, id: `PRC${parcels.length + 1}`.padStart(6, '0') }])
        break
      case 'vehicle':
        setVehicles([...vehicles, { ...newItem, id: `VEH${vehicles.length + 1}`.padStart(6, '0') }])
        break
      case 'route':
        setRoutes([...routes, { ...newItem, id: `RTE${routes.length + 1}`.padStart(6, '0') }])
        break
    }
  }

  const handleEdit = (type, editedItem) => {
    switch (type) {
      case 'parcel':
        setParcels(parcels.map(p => p.id === editedItem.id ? editedItem : p))
        break
      case 'vehicle':
        setVehicles(vehicles.map(v => v.id === editedItem.id ? editedItem : v))
        break
      case 'route':
        setRoutes(routes.map(r => r.id === editedItem.id ? editedItem : r))
        break
    }
    setEditingItem(null)
  }

  const handleDelete = (type, id) => {
    switch (type) {
      case 'parcel':
        setParcels(parcels.filter(p => p.id !== id))
        break
      case 'vehicle':
        setVehicles(vehicles.filter(v => v.id !== id))
        break
      case 'route':
        setRoutes(routes.filter(r => r.id !== id))
        break
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { icon: Package, label: 'Dashboard', href: '/dashboard' },
            { icon: Truck, label: 'Vehicles', href: '/dashboard/vehicles' },
            { icon: Users, label: 'Customers', href: '/dashboard/customers' },
            { icon: MapPin, label: 'Tracking', href: '/dashboard/tracking' },
            { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
            { icon: Route, label: 'Routes', href: '/dashboard/routes' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5 text-gray-500" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input className="pl-8" placeholder="Search..." />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/avatars/01.png" alt="@parceladmin" />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Total Parcels', value: parcels.length, description: 'Current parcels in system' },
              { title: 'Delivered', value: parcels.filter(p => p.status === 'Delivered').length, description: 'Successfully delivered' },
              { title: 'In Transit', value: parcels.filter(p => p.status === 'In Transit').length, description: 'Currently in transit' },
              { title: 'Total Vehicles', value: vehicles.length, description: 'Available for delivery' },
            ].map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Overview</CardTitle>
              <CardDescription>Number of parcels delivered per day this week</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={deliveryData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Parcels, Vehicles, and Routes Management */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Parcels Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Parcels</CardTitle>
                  <CardDescription>Manage your parcels</CardDescription>
                </div>

                  <Link href= "/postmaster">

                    <Button variant="outline" size="icon">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </Link>
                  

              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parcels.map((parcel) => (
                      <TableRow key={parcel.id}>
                        <TableCell>{parcel.id}</TableCell>
                        <TableCell>{parcel.recipient}</TableCell>
                        <TableCell>{parcel.status}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingItem({ type: 'parcel', ...parcel })}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete('parcel', parcel.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Vehicles Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vehicles</CardTitle>
                  <CardDescription>Manage your vehicles</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Vehicle</DialogTitle>
                      <DialogDescription>Enter the details of the new vehicle here.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target)
                      handleAdd('vehicle', Object.fromEntries(formData))
                    }}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="type" className="text-right">Type</Label>
                          <Input id="type" name="type" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">Status</Label>
                          <Select name="status">
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="In Maintenance">In Maintenance</SelectItem>
                              <SelectItem value="Out of Service">Out of Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="lastMaintenance" className="text-right">Last Maintenance</Label>
                          <Input id="lastMaintenance" name="lastMaintenance" type="date" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Vehicle</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>{vehicle.id}</TableCell>
                        <TableCell>{vehicle.type}</TableCell>
                        <TableCell>{vehicle.status}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingItem({ type: 'vehicle', ...vehicle })}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete('vehicle', vehicle.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Routes Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Routes</CardTitle>
                  <CardDescription>Manage your routes</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Route</DialogTitle>
                      <DialogDescription>Enter the details of the new route here.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target)
                      handleAdd('route', Object.fromEntries(formData))
                    }}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" name="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="startPoint" className="text-right">Start Point</Label>
                          <Input id="startPoint" name="startPoint" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="endPoint" className="text-right">End Point</Label>
                          <Input id="endPoint" name="endPoint" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="distance" className="text-right">Distance</Label>
                          <Input id="distance" name="distance" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Route</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Start Point</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell>{route.id}</TableCell>
                        <TableCell>{route.name}</TableCell>
                        <TableCell>{route.startPoint}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingItem({ type: 'route', ...route })}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete('route', route.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Edit Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editingItem.type.charAt(0).toUpperCase() + editingItem.type.slice(1)}</DialogTitle>
              <DialogDescription>Make changes to the {editingItem.type} here.</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleEdit(editingItem.type, { ...editingItem, ...Object.fromEntries(formData) })
            }}>
              <div className="grid gap-4 py-4">
                {editingItem.type === 'parcel' && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-recipient" className="text-right">Recipient</Label>
                      <Input id="edit-recipient" name="recipient" defaultValue={editingItem.recipient} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-destination" className="text-right">Destination</Label>
                      <Input id="edit-destination" name="destination" defaultValue={editingItem.destination} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-status" className="text-right">Status</Label>
                      <Select name="status" defaultValue={editingItem.status}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="In Transit">In Transit</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                {editingItem.type === 'vehicle' && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-type" className="text-right">Type</Label>
                      <Input id="edit-type" name="type" defaultValue={editingItem.type} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-status" className="text-right">Status</Label>
                      <Select name="status" defaultValue={editingItem.status}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="In Maintenance">In Maintenance</SelectItem>
                          <SelectItem value="Out of Service">Out of Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-lastMaintenance" className="text-right">Last Maintenance</Label>
                      <Input id="edit-lastMaintenance" name="lastMaintenance" type="date" defaultValue={editingItem.lastMaintenance} className="col-span-3" />
                    </div>
                  </>
                )}
                {editingItem.type === 'route' && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-name" className="text-right">Name</Label>
                      <Input id="edit-name" name="name" defaultValue={editingItem.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-startPoint" className="text-right">Start Point</Label>
                      <Input id="edit-startPoint" name="startPoint" defaultValue={editingItem.startPoint} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-endPoint" className="text-right">End Point</Label>
                      <Input id="edit-endPoint" name="endPoint" defaultValue={editingItem.endPoint} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-distance" className="text-right">Distance</Label>
                      <Input id="edit-distance" name="distance" defaultValue={editingItem.distance} className="col-span-3" />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

