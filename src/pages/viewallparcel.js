"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Package, Search, ChevronDown, ChevronUp } from 'lucide-react'

// Simulated API call
const fetchParcels = async (page, limit) => {
  // In a real application, this would be an actual API call
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
  const parcels = Array.from({ length: limit }, (_, i) => ({
    id: `P${1000 + (page - 1) * limit + i}`,
    sender: `Sender ${(page - 1) * limit + i + 1}`,
    recipient: `Recipient ${(page - 1) * limit + i + 1}`,
    status: ['Pending', 'In Transit', 'Delivered'][Math.floor(Math.random() * 3)],
    estimatedDelivery: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    weight: `${(Math.random() * 10).toFixed(1)} kg`
  }))
  return { parcels, totalPages: 10 } // Simulating 10 pages of results
}

export default function ParcelListPage() {
  const [parcels, setParcels] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')

  const loadParcels = async () => {
    setLoading(true)
    try {
      const { parcels, totalPages } = await fetchParcels(currentPage, 10)
      setParcels(parcels)
      setTotalPages(totalPages)
    } catch (error) {
      console.error("Failed to fetch parcels:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadParcels()
  }, [currentPage])

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedParcels = [...parcels].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const filteredParcels = sortedParcels.filter(parcel =>
    Object.values(parcel).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Package className="mr-2" />
            Parcel List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search parcels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
              icon={<Search className="mr-2 h-4 w-4" />}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
                  ID {sortField === 'id' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('sender')}>
                  Sender {sortField === 'sender' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('recipient')}>
                  Recipient {sortField === 'recipient' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                  Status {sortField === 'status' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('estimatedDelivery')}>
                  Est. Delivery {sortField === 'estimatedDelivery' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('weight')}>
                  Weight {sortField === 'weight' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : filteredParcels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No parcels found</TableCell>
                </TableRow>
              ) : (
                filteredParcels.map((parcel) => (
                  <TableRow key={parcel.id}>
                    <TableCell>{parcel.id}</TableCell>
                    <TableCell>{parcel.sender}</TableCell>
                    <TableCell>{parcel.recipient}</TableCell>
                    <TableCell>
                      <Badge variant={parcel.status === 'Delivered' ? 'success' : parcel.status === 'In Transit' ? 'warning' : 'secondary'}>
                        {parcel.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{parcel.estimatedDelivery}</TableCell>
                    <TableCell>{parcel.weight}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  )
}

