import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientDashboard = ({ parcels = [], notifications = [] }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Client Dashboard</h1>
          <Button variant="outline" className="bg-red-500 hover:bg-black-700 ">
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

        {/* Parcel List Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Parcels</CardTitle>
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
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parcels.map((parcel, index) => (
                    <TableRow key={parcel.parcelId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{parcel.parcelId}</TableCell>
                      <TableCell>{parcel.recipient}</TableCell>
                      <TableCell>{parcel.destination}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-sm rounded-full ${parcel.status === "Delivered"
                            ? "bg-green-100 text-green-800"
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
              <p className="text-gray-500">No parcels found. Check back later.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ClientDashboard;
