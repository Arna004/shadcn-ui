"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";

const AddVehiclePage = ({ onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    vehicleNumber: "",
    volume: "",
    fuelCapacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/vehicles/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newVehicle = await response.json();
        onVehicleAdded(newVehicle);
        alert("Vehicle added successfully!");
        setFormData({ vehicleId: "", vehicleNumber: "", volume: "", fuelCapacity: "" });
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-lg p-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Add New Vehicle</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Use this form to add a new vehicle to the system.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700">
                Vehicle ID
              </label>
              <Input
                type="text"
                id="vehicleId"
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                placeholder="Enter Vehicle ID"
                required
              />
            </div>

            <div>
              <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
                Vehicle Number
              </label>
              <Input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="Enter Vehicle Number"
                required
              />
            </div>

            <div>
              <label htmlFor="volume" className="block text-sm font-medium text-gray-700">
                Volume (in cubic meters)
              </label>
              <Input
                type="number"
                id="volume"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                placeholder="Enter Volume"
                required
              />
            </div>

            <div>
              <label htmlFor="fuelCapacity" className="block text-sm font-medium text-gray-700">
                Fuel Capacity (in liters)
              </label>
              <Input
                type="number"
                id="fuelCapacity"
                name="fuelCapacity"
                value={formData.fuelCapacity}
                onChange={handleChange}
                placeholder="Enter Fuel Capacity"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add Vehicle
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddVehiclePage;
