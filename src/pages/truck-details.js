"use client";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Truck } from "lucide-react";

const TruckAdminDashboard = () => {
  const router = useRouter();

  const truckData = {
    id: "TRK-001",
    driver: "John Doe",
    capacity: "2500 kg",
    status: "In Transit",
    parcels: 128,
    currentLocation: "Warehouse A",
    route: ["Warehouse A", "City Center", "Warehouse B"],
  };

  const handleAddNewTruck = () => {
    router.push("/truckadmin"); // Update the path as per your routing setup
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Truck Admin Dashboard</h1>
        <Button variant="default" onClick={handleAddNewTruck}>
          Add New Truck
        </Button>
      </header>

      {/* Truck Details Card */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Truck Details</CardTitle>
            <CardDescription>Overview of the truck and its status</CardDescription>
          </div>
          <Truck className="w-10 h-10 text-gray-500" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold">Field</TableCell>
                <TableCell className="font-semibold">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Truck ID</TableCell>
                <TableCell>{truckData.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Driver</TableCell>
                <TableCell>{truckData.driver}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Capacity</TableCell>
                <TableCell>{truckData.capacity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>{truckData.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Parcels</TableCell>
                <TableCell>{truckData.parcels}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Current Location</TableCell>
                <TableCell>{truckData.currentLocation}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Route Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Route Visualization</CardTitle>
          <CardDescription>Track the truck's journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-16 h-16 text-gray-400" />
            <span className="ml-4 text-gray-600">Map view placeholder</span>
          </div>
          <Separator className="my-4" />
          <div>
            <h3 className="text-lg font-bold">Route Stops</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {truckData.route.map((stop, index) => (
                <li key={index}>{stop}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Actions Section */}
      <footer className="flex justify-end space-x-4">
        <Button variant="secondary">Update Details</Button>
        <Button variant="destructive">Remove Truck</Button>
      </footer>
    </div>
  );
};

export default TruckAdminDashboard;
