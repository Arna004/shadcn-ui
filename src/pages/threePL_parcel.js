import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PostMasterDashboard = ({ parcels = [] }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="text-blue-600 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">3PL Add parcel</h1>
          <Button variant="outline" className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4 space-y-8 sm:px-6 lg:px-8">
        {/* Add Parcel Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Parcel</CardTitle>
          </CardHeader>
          <CardContent>
            <form action="/api/parcels/add" method="POST" className="space-y-4">
              <div>
                <label htmlFor="parcelId" className="block text-sm font-medium text-gray-700">
                  Parcel ID
                </label>
                <Input
                  type="text"
                  id="parcelId"
                  name="parcelId"
                  placeholder="Enter Parcel ID"
                  required
                />
              </div>
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                  Recipient Name
                </label>
                <Input
                  type="text"
                  id="recipient"
                  name="recipient"
                  placeholder="Enter Recipient Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                  Destination
                </label>
                <Input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="Enter Destination"
                  required
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Enter Weight"
                  required
                />
              </div>
              <Button type="submit" className="w-full text-blue-600">
                Add Parcel
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Parcel List Section */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Parcels</CardTitle>
          </CardHeader>
          <CardContent>
            {parcels.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Parcel ID</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parcels.map((parcel, index) => (
                    <TableRow key={parcel.parcelId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{parcel.parcelId}</TableCell>
                      <TableCell>{parcel.recipient}</TableCell>
                      <TableCell>{parcel.destination}</TableCell>
                      <TableCell>{parcel.weight}</TableCell>
                      <TableCell>
                        <Button variant="link" className="text-blue-600 hover:underline">
                          Edit
                        </Button>
                        |
                        <Button variant="link" className="text-red-600 hover:underline">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-gray-500">No parcels found. Add a parcel to get started.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PostMasterDashboard;
