"use client"

import { useState } from "react"
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { AdminHeader } from "../../components/admin-header"
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Calendar } from "lucide-react"
import { useToast } from "../../hooks/use-toast"

const locations = [
  { id: 1, name: "Shri Ram Temple", type: "Temple", slots: 12, active: 8 },
  { id: 2, name: "City General Hospital", type: "Hospital", slots: 20, active: 15 },
  { id: 3, name: "Style Studio", type: "Salon", slots: 8, active: 6 },
  { id: 4, name: "Municipal Office", type: "Government", slots: 15, active: 10 },
]

const timeSlots = [
  { id: 1, time: "9:00 AM", location: "Shri Ram Temple", capacity: 10, booked: 8, status: "active" },
  { id: 2, time: "10:00 AM", location: "Shri Ram Temple", capacity: 10, booked: 10, status: "full" },
  { id: 3, time: "11:00 AM", location: "City General Hospital", capacity: 15, booked: 12, status: "active" },
  { id: 4, time: "12:00 PM", location: "Style Studio", capacity: 5, booked: 0, status: "inactive" },
]

export default function ManageSlotsPage() {
  const [activeTab, setActiveTab] = useState("slots")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const { toast } = useToast()

  const handleAddSlot = () => {
    toast({
      title: "Slot Added",
      description: "New time slot has been created successfully.",
    })
  }

  const handleEditSlot = (id: number) => {
    toast({
      title: "Slot Updated",
      description: "Time slot has been updated successfully.",
    })
  }

  const handleDeleteSlot = (id: number) => {
    toast({
      title: "Slot Deleted",
      description: "Time slot has been removed successfully.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "full":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Full</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AdminHeader />

      {/* PROMINENT Slot Management Background */}
      <div className="absolute inset-0">
        {/* Large Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-400/15 to-teal-400/20" />

        {/* Large Calendar Grid */}
        <div className="absolute top-20 right-20 opacity-50 animate-float">
          <div className="w-40 h-32 bg-gradient-to-br from-blue-400/60 to-blue-600/60 rounded-xl shadow-2xl border border-blue-300/50">
            <div className="p-4">
              <div className="text-white font-bold text-sm mb-2">Slot Calendar</div>
              <div className="grid grid-cols-4 gap-1">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-blue-200/60 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Time Slot Visualization */}
        <div className="absolute bottom-32 left-16 opacity-60">
          <div className="space-y-3">
            {["9:00", "10:00", "11:00", "12:00", "1:00"].map((time, i) => (
              <div
                key={time}
                className="flex items-center space-x-3 animate-slide-in-left"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="w-4 h-4 bg-gradient-to-br from-green-400/60 to-green-600/60 rounded-full animate-pulse shadow-lg" />
                <div className="text-lg text-blue-600/60 font-medium">{time}</div>
                <div className="w-20 h-2 bg-gradient-to-r from-blue-400/50 to-transparent rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Large Clock Icons */}
        <div className="absolute top-1/3 left-16 opacity-60 animate-bounce-slow">
          <svg width="100" height="100" viewBox="0 0 24 24" className="text-cyan-500/60">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Slot Management Numbers */}
        <div className="absolute bottom-1/4 right-1/4 opacity-40 animate-float">
          <div className="text-8xl font-bold text-cyan-500/60">24</div>
          <div className="text-lg text-cyan-500/50 text-center">Slots</div>
        </div>

        {/* Location Markers */}
        <div className="absolute top-1/2 right-10 opacity-50">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-gradient-to-br from-teal-400/60 to-teal-600/60 rounded-full flex items-center justify-center animate-pulse shadow-xl"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <MapPin className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Capacity Bars */}
        <div className="absolute top-32 left-32 opacity-50">
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-gradient-to-r from-cyan-400/60 to-transparent rounded animate-slide-right shadow-lg"
                style={{
                  width: `${60 + Math.random() * 80}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Management Icons */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-br from-cyan-400/40 to-blue-400/40 rounded-full animate-float shadow-lg flex items-center justify-center"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Calendar className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>
      </div>

      <main className="container py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="icon" aria-label="Back to Dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Manage Slots</h1>
              <p className="text-muted-foreground">Create and manage time slots for all locations</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="slots">Time Slots</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="add-slot">Add New Slot</TabsTrigger>
            </TabsList>

            {/* Time Slots Tab */}
            <TabsContent value="slots" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Current Time Slots</h2>
                  <p className="text-muted-foreground">Manage existing time slots across all locations</p>
                </div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                  <Card key={slot.id} className="bg-white/90 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{slot.time}</CardTitle>
                        {getStatusBadge(slot.status)}
                      </div>
                      <CardDescription className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{slot.location}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Capacity:</span>
                          <span className="font-medium">{slot.capacity}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Booked:</span>
                          <span className="font-medium">{slot.booked}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(slot.booked / slot.capacity) * 100}%` }}
                          />
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSlot(slot.id)}
                            className="flex-1"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="flex-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Locations Tab */}
            <TabsContent value="locations" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Locations Overview</h2>
                <p className="text-muted-foreground">Manage locations and their slot configurations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations.map((location) => (
                  <Card key={location.id} className="bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{location.name}</CardTitle>
                        <Badge variant="outline">{location.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{location.slots}</div>
                            <div className="text-sm text-muted-foreground">Total Slots</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{location.active}</div>
                            <div className="text-sm text-muted-foreground">Active Slots</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Location
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Slots
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Add New Slot Tab */}
            <TabsContent value="add-slot" className="space-y-6">
              <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Add New Time Slot</CardTitle>
                  <CardDescription>Create a new time slot for any location</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.id} value={location.name}>
                                {location.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" type="number" placeholder="Enter slot capacity" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Input id="description" placeholder="Add any additional notes" />
                    </div>

                    <Button onClick={handleAddSlot} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Time Slot
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
