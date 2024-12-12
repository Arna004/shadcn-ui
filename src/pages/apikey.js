"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

const ApiKeyInputPage = () => {
    const [apiKey, setApiKey] = useState("");
    const [clientDetails, setClientDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerateApiKey = async () => {
        setError(null);
        const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/third-party/api-generator`
        const payload = { userId: "56e56464364sff4" };

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
            if (response.ok) {
                const data = await response.json();
                setApiKey(data.apiKey);
                alert("API Key generated successfully!");
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to generate API key.");
            }
        } catch (error) {
            console.error("Error generating API key:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    const handleFetchDetails = async () => {
        setError(null);
        setClientDetails(null);

        try {
            const response = await fetch("/api/3pl-client", {
                method: "GET",
                headers: { "x-api-key": apiKey },
            });

            if (response.ok) {
                const data = await response.json();
                setClientDetails(data);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to fetch client details.");
            }
        } catch (error) {
            console.error("Error fetching client details:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Card className="w-full max-w-md shadow-md p-4">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-bold">
                        API Key Management
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Generate or enter your API key to view your details.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Button
                        onClick={handleGenerateApiKey}
                        className="w-full bg-green-600 hover:bg-green-700"
                    >
                        Generate API Key
                    </Button>

                    <Input
                        type="text"
                        placeholder="Enter your API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full"
                    />
                    <Button
                        onClick={handleFetchDetails}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                        Fetch Client Details
                    </Button>
                </CardContent>

                {error && (
                    <div className="text-red-500 text-center mt-4">{error}</div>
                )}

                {clientDetails && (
                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-gray-700">Client Details</h3>
                        <div className="mt-2 space-y-2">
                            <p>
                                <span className="font-medium text-gray-800">Client ID:</span>{" "}
                                {clientDetails.clientId}
                            </p>
                            <p>
                                <span className="font-medium text-gray-800">Name:</span>{" "}
                                {clientDetails.name}
                            </p>
                            <p>
                                <span className="font-medium text-gray-800">Email:</span>{" "}
                                {clientDetails.email}
                            </p>
                            <p>
                                <span className="font-medium text-gray-800">Parcels:</span>{" "}
                                {clientDetails.parcels.length}
                            </p>
                            <p>
                                <span className="font-medium text-gray-800">Trucks:</span>{" "}
                                {clientDetails.trucks.length}
                            </p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ApiKeyInputPage;