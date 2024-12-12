"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ViewVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([
    {
      vehicleId: "V001",
      vehicleNumber: "MH12AB1234",
      volume: 25.5,
      fuelCapacity: 60,
      isActive: true,
    },
    {
      vehicleId: "V002",
      vehicleNumber: "KA03CD5678",
      volume: 30.0,
      fuelCapacity: 70,
      isActive: false,
    },
    {
      vehicleId: "V003",
      vehicleNumber: "DL05EF9101",
      volume: 22.8,
      fuelCapacity: 50,
      isActive: true,
    },
    {
      vehicleId: "V004",
      vehicleNumber: "TN09GH2345",
      volume: 28.2,
      fuelCapacity: 65,
      isActive: true,
    },
    {
      vehicleId: "V005",
      vehicleNumber: "WB06IJ6789",
      volume: 35.0,
      fuelCapacity: 80,
      isActive: false,
    },
  ]);
  

  // Fetch vehicles from the backend
  // useEffect(() => {
  //   fetch("/api/vehicles")
  //     .then((response) => response.json())
  //     .then((data) => setVehicles(data))
  //     .catch((error) => console.error("Error fetching vehicles:", error));
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Vehicle Details
        </h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Manage Vehicles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {vehicles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Vehicle Number</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Fuel Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle, index) => (
                  <TableRow key={vehicle.vehicleId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{vehicle.vehicleId}</TableCell>
                    <TableCell>{vehicle.vehicleNumber}</TableCell>
                    <TableCell>{vehicle.volume} m³</TableCell>
                    <TableCell>{vehicle.fuelCapacity} L</TableCell>
                    <TableCell>
                      {vehicle.isActive ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Button>
                      |
                      <Button
                        variant="link"
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-center">
              No vehicles found. Add a vehicle to get started.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewVehiclesPage;
