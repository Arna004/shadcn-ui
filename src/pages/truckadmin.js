'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';

export default function TruckAdminDashboard() {
  const [vehicles, setVehicles] = useState([
    { id: 'VEH001', number: 'MH12AB1234', volume: '20m³', fuel: '50L' },
    { id: 'VEH002', number: 'DL10CD5678', volume: '15m³', fuel: '40L' },
  ]);

  const [routes, setRoutes] = useState([
    { id: 'RTE001', name: 'Route 1', start: 'Depot A', end: 'Depot B', distance: '50 km' },
    { id: 'RTE002', name: 'Route 2', start: 'Depot B', end: 'Depot C', distance: '30 km' },
  ]);

  const [dialogType, setDialogType] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  const handleAdd = (type, newData) => {
    if (type === 'vehicle') {
      setVehicles([...vehicles, { id: `VEH${vehicles.length + 1}`.padStart(6, '0'), ...newData }]);
    } else if (type === 'route') {
      setRoutes([...routes, { id: `RTE${routes.length + 1}`.padStart(6, '0'), ...newData }]);
    }
    setDialogType(null);
  };

  const handleDelete = (type, id) => {
    if (type === 'vehicle') {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } else if (type === 'route') {
      setRoutes(routes.filter((route) => route.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Truck Admin Dashboard</h1>
        <Button className="bg-indigo-600 text-white">Logout</Button>
      </header>

      <main className="space-y-6">
        {/* Vehicles Section */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>Vehicles</CardTitle>
              <CardDescription>Manage your fleet of vehicles</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button variant="outline" className="flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Vehicle</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                  <DialogDescription>Enter the vehicle details below.</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newVehicle = Object.fromEntries(formData);
                    handleAdd('vehicle', newVehicle);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="number">Vehicle Number</Label>
                    <Input id="number" name="number" placeholder="e.g., MH12AB1234" required />
                  </div>
                  <div>
                    <Label htmlFor="volume">Volume</Label>
                    <Input id="volume" name="volume" placeholder="e.g., 20m³" required />
                  </div>
                  <div>
                    <Label htmlFor="fuel">Fuel Capacity</Label>
                    <Input id="fuel" name="fuel" placeholder="e.g., 50L" required />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save</Button>
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
                  <TableHead>Number</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Fuel</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.id}</TableCell>
                    <TableCell>{vehicle.number}</TableCell>
                    <TableCell>{vehicle.volume}</TableCell>
                    <TableCell>{vehicle.fuel}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete('vehicle', vehicle.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Routes Section */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>Routes</CardTitle>
              <CardDescription>Manage your delivery routes</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button variant="outline" className="flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Route</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Route</DialogTitle>
                  <DialogDescription>Enter the route details below.</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newRoute = Object.fromEntries(formData);
                    handleAdd('route', newRoute);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="name">Route Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Downtown Route" required />
                  </div>
                  <div>
                    <Label htmlFor="start">Start Point</Label>
                    <Input id="start" name="start" placeholder="e.g., Depot A" required />
                  </div>
                  <div>
                    <Label htmlFor="end">End Point</Label>
                    <Input id="end" name="end" placeholder="e.g., Depot B" required />
                  </div>
                  <div>
                    <Label htmlFor="distance">Distance</Label>
                    <Input id="distance" name="distance" placeholder="e.g., 50 km" required />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save</Button>
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
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell>{route.id}</TableCell>
                    <TableCell>{route.name}</TableCell>
                    <TableCell>{route.start}</TableCell>
                    <TableCell>{route.end}</TableCell>
                    <TableCell>{route.distance}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete('route', route.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
