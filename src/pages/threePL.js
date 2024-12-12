"use client";
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

const ThreePLDashboard = ({ parcels = [], notifications = [] }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">3PL Client Dashboard</h1>
          <Button variant="outline" className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4 space-y-8 sm:px-6 lg:px-8">
        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {notifications.map((notification, index) => (
                  <li key={index} className="text-gray-700">
                    {notification}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No notifications at this time.</p>
            )}
          </CardContent>
        </Card>

        {/* Parcel Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Parcels</CardTitle>
            <CardDescription>
              Manage your parcels in transit or pending for dispatch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {parcels.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-semibold">#</TableCell>
                    <TableCell className="font-semibold">Parcel ID</TableCell>
                    <TableCell className="font-semibold">Destination</TableCell>
                    <TableCell className="font-semibold">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parcels.map((parcel, index) => (
                    <TableRow key={parcel.parcelId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{parcel.parcelId}</TableCell>
                      <TableCell>{parcel.destination}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-sm rounded-full ${
                            parcel.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : parcel.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {parcel.status}
                        </span>
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

        {/* Add Parcel Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Parcel</CardTitle>
          </CardHeader>
          <CardContent>
            <form action="/api/parcels/add" method="POST" className="space-y-4">
              <div>
                <label
                  htmlFor="parcelId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parcel ID
                </label>
                <input
                  type="text"
                  id="parcelId"
                  name="parcelId"
                  placeholder="Enter Parcel ID"
                  required
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700"
                >
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="Enter Destination"
                  required
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Parcel
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ThreePLDashboard;
