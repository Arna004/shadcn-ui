"use client";
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Package, Truck, Clock, Globe, Search } from 'lucide-react'
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 py-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SwiftParcel</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="text-gray-600 hover:text-blue-600">Services</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Tracking</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Locations</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Support</Link>
          </nav>
          <Button>Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          Swift and Secure Parcel Delivery
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Get your packages delivered on time, every time.
        </p>
        <div className="max-w-2xl mx-auto flex items-center bg-white rounded-full shadow-md p-2">
          <Search className="h-5 w-5 text-gray-400 ml-3" />
          <Input
            type="text"
            placeholder="Enter tracking number"
            className="flex-grow border-none focus:ring-0"
          />
          <Button size="sm" className="rounded-full">
            Track Parcel
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Fast Delivery", icon: Truck, description: "Same-day delivery for local packages" },
            { title: "Real-time Tracking", icon: Clock, description: "Track your parcel's journey minute by minute" },
            { title: "Global Shipping", icon: Globe, description: "We deliver to over 200 countries worldwide" },
          ].map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg border-none bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <feature.icon className="h-12 w-12 mb-3 text-blue-600" />
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship?</h2>
          <p className="text-xl mb-8">
            Experience the fastest and most reliable parcel delivery service today.
          </p>
          <Button size="lg" variant="secondary" className="mr-4">
            Get a Quote
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
            Learn More
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Domestic Shipping</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">International Shipping</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Express Delivery</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Help Center</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          © 2024 SwiftParcel. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

