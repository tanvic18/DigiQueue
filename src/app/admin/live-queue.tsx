"use client"

import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { AdminHeader } from "../../components/admin-header"
import { ArrowLeft, Users, Play, Pause, SkipForward, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "../../hooks/use-toast"

const queueData = [
  {
    id: 1,
    location: "Shri Ram Temple",
    currentServing: 5,
    totalInQueue: 12,
    estimatedWait: "15 mins",
    status: "active",
    queue: [
      { position: 1, name: "John Doe", bookingId: "TMP001", waitTime: "5 mins" },
      { position: 2, name: "Jane Smith", bookingId: "TMP002", waitTime: "10 mins" },
      { position: 3, name: "Mike Johnson", bookingId: "TMP003", waitTime: "15 mins" },
    ],
  },
  {
    id: 2,
    location: "City General Hospital",
    currentServing: 8,
    totalInQueue: 15,
    estimatedWait: "25 mins",
    status: "active",
    queue: [
      { position: 1, name: "Sarah Wilson", bookingId: "HSP001", waitTime: "8 mins" },
      { position: 2, name: "David Brown", bookingId: "HSP002", waitTime: "16 mins" },
      { position: 3, name: "Lisa Davis", bookingId: "HSP003", waitTime: "25 mins" },
    ],
  },
  {
    id: 3,
    location: "Style Studio",
    currentServing: 2,
    totalInQueue: 6,
    estimatedWait: "30 mins",
    status: "paused",
    queue: [
      { position: 1, name: "Emma Taylor", bookingId: "SAL001", waitTime: "12 mins" },
      { position: 2, name: "Alex Chen", bookingId: "SAL002", waitTime: "24 mins" },
    ],
  },
]

export default function LiveQueuePage() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [currentTime, setCurrentTime] = useState(new Date())
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleNextCustomer = (locationId: number) => {
    toast({
      title: "Customer Called",
      description: "Next customer has been notified to proceed.",
    })
  }

  const handlePauseQueue = (locationId: number) => {
    toast({
      title: "Queue Paused",
      description: "Queue has been temporarily paused.",
    })
  }

  const handleResumeQueue = (locationId: number) => {
    toast({
      title: "Queue Resumed",
      description: "Queue is now active again.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Paused</Badge>
      case "closed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredQueues =
    selectedLocation === "all" ? queueData : queueData.filter((queue) => queue.location === selectedLocation)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AdminHeader />

      {/* PROMINENT Live Queue Background */}
      <div className="absolute inset-0">
        {/* Large Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-400/15 to-teal-400/20" />

        {/* Live Queue Visualization */}
        <div className="absolute top-20 right-20 opacity-60 animate-float">
          <div className="w-48 h-32 bg-gradient-to-br from-green-400/60 to-green-600/60 rounded-xl shadow-2xl border border-green-300/50">
            <div className="p-4">
              <div className="text-white font-bold text-sm mb-2">Live Queue</div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-200/60 rounded-full animate-pulse" />
                    <div className="h-1 bg-green-200/40 rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Queue Numbers Moving */}
        <div className="absolute bottom-32 left-16 opacity-60">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((num, i) => (
              <div
                key={num}
                className="flex items-center space-x-4 animate-queue-move"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/60 to-emerald-600/60 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold">{num}</span>
                </div>
                <div className="w-24 h-2 bg-gradient-to-r from-emerald-400/50 to-transparent rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Large Users Icon */}
        <div className="absolute top-1/3 left-16 opacity-60 animate-bounce-slow">
          <svg width="120" height="120" viewBox="0 0 24 24" className="text-green-500/60">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Live Status Indicators */}
        <div className="absolute top-1/2 right-10 opacity-50">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-gradient-to-br from-red-400/60 to-red-600/60 rounded-full flex items-center justify-center animate-ping shadow-xl"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Queue Progress Bars */}
        <div className="absolute top-32 left-32 opacity-50">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="w-32 h-2 bg-gray-300/50 rounded">
                  <div
                    className="h-2 bg-gradient-to-r from-green-400/60 to-green-600/60 rounded animate-pulse"
                    style={{
                      width: `${30 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Time Display */}
        <div className="absolute bottom-1/4 right-1/4 opacity-40 animate-float">
          <div className="text-6xl font-bold text-green-500/60">LIVE</div>
          <div className="text-lg text-green-500/50 text-center">{currentTime.toLocaleTimeString()}</div>
        </div>

        {/* Floating Queue Icons */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-br from-green-400/40 to-emerald-400/40 rounded-full animate-float shadow-lg flex items-center justify-center"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Users className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>
      </div>

      <main className="container py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="icon" aria-label="Back to Dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Live Queue Management</h1>
                <p className="text-muted-foreground">Monitor and control real-time queues across all locations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Current Time</div>
                <div className="text-lg font-semibold">{currentTime.toLocaleTimeString()}</div>
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {queueData.map((queue) => (
                    <SelectItem key={queue.id} value={queue.location}>
                      {queue.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Queue Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredQueues.map((queue) => (
              <Card key={queue.id} className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{queue.location}</CardTitle>
                    {getStatusBadge(queue.status)}
                  </div>
                  <CardDescription>
                    Currently serving #{queue.currentServing} • {queue.totalInQueue} in queue
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Queue Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{queue.totalInQueue}</div>
                      <div className="text-xs text-muted-foreground">Total in Queue</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{queue.estimatedWait}</div>
                      <div className="text-xs text-muted-foreground">Est. Wait Time</div>
                    </div>
                  </div>

                  {/* Current Queue */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Next in Queue</h4>
                    {queue.queue.slice(0, 3).map((customer) => (
                      <div
                        key={customer.position}
                        className="flex items-center justify-between p-2 bg-muted/30 rounded"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {customer.position}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">{customer.bookingId}</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{customer.waitTime}</div>
                      </div>
                    ))}
                  </div>

                  {/* Queue Controls */}
                  <div className="flex space-x-2 pt-2">
                    {queue.status === "active" ? (
                      <>
                        <Button onClick={() => handleNextCustomer(queue.id)} className="flex-1" size="sm" aria-label="Call Next Customer">
                          <SkipForward className="h-3 w-3 mr-1" />
                          Next
                        </Button>
                        <Button onClick={() => handlePauseQueue(queue.id)} variant="outline" size="sm" aria-label="Pause Queue">
                          <Pause className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => handleResumeQueue(queue.id)} className="flex-1" size="sm" aria-label="Resume Queue">
                        <Play className="h-3 w-3 mr-1" />
                        Resume
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Queue Alerts */}
          <Card className="mt-8 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Queue Alerts</CardTitle>
              <CardDescription>Important notifications and system alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50/80 border border-yellow-200 rounded-lg backdrop-blur-sm">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">High Wait Time Alert</p>
                  <p className="text-xs text-yellow-700">
                    City General Hospital queue exceeding 30 minutes average wait time
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50/80 border border-green-200 rounded-lg backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Queue Running Smoothly</p>
                  <p className="text-xs text-green-700">
                    Shri Ram Temple maintaining optimal flow with 15-minute average wait
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
