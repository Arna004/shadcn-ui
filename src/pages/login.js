import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    // Reset error and simulate login action
    setError("");
    console.log("Login submitted:", { email, password });
    // You can replace this with your backend API integration
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md bg-white shadow-md rounded-md">
        <CardHeader className="text-center p-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Login to Telematics Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Access your truck management system
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-600">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-600">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="p-4 text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 hover:underline hover:text-indigo-500"
            >
              Sign up here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
