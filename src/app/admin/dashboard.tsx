"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { AdminHeader } from "../../components/admin-header"
import { Users, Calendar, Clock, TrendingUp, AlertCircle, CheckCircle, Eye } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { auth, db } from "../../firebase/firebase"
import { doc, onSnapshot } from "firebase/firestore"

const todayStats = {
  totalBookings: 156,
  activeQueues: 8,
  completedToday: 89,
  avgWaitTime: "12 mins",
}

const recentBookings = [
  {
    id: 1,
    service: "Temple Visit",
    location: "Shri Ram Temple",
    customer: "John Doe",
    time: "2:30 PM",
    status: "active",
    queuePosition: 3,
  },
  {
    id: 2,
    service: "Hospital Appointment",
    location: "City General Hospital",
    customer: "Jane Smith",
    time: "10:00 AM",
    status: "completed",
    queuePosition: null,
  },
  {
    id: 3,
    service: "Salon Service",
    location: "Style Studio",
    customer: "Mike Johnson",
    time: "3:00 PM",
    status: "pending",
    queuePosition: 1,
  },
]

const chartData = [
  { name: "Mon", bookings: 45, completed: 42 },
  { name: "Tue", bookings: 52, completed: 48 },
  { name: "Wed", bookings: 38, completed: 35 },
  { name: "Thu", bookings: 61, completed: 58 },
  { name: "Fri", bookings: 73, completed: 69 },
  { name: "Sat", bookings: 89, completed: 84 },
  { name: "Sun", bookings: 67, completed: 63 },
]

const hourlyData = [
  { hour: "9 AM", visitors: 12 },
  { hour: "10 AM", visitors: 18 },
  { hour: "11 AM", visitors: 25 },
  { hour: "12 PM", visitors: 32 },
  { hour: "1 PM", visitors: 28 },
  { hour: "2 PM", visitors: 35 },
  { hour: "3 PM", visitors: 42 },
  { hour: "4 PM", visitors: 38 },
]

export default function AdminDashboardPage() {
  const [adminData, setAdminData] = useState<{
    name: string;
    organization: string;
    email: string;
  } | null>(null);

  // Fetch admin data in real-time
  useEffect(() => {
    if (!auth.currentUser) return;

    const adminRef = doc(db, "admins", auth.currentUser.uid);
    const unsubscribe = onSnapshot(adminRef, (doc) => {
      if (doc.exists()) {
        setAdminData(doc.data() as {
          name: string;
          organization: string;
          email: string;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AdminHeader />

      {/* PROMINENT Admin Dashboard Background */}
      <div className="absolute inset-0">
        {/* Large Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-indigo-400/15 to-pink-400/20" />

        {/* Live Data Streams - Much Larger */}
        <div className="absolute top-20 right-10 opacity-60">
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-2 bg-gradient-to-r from-green-400/60 to-transparent rounded animate-pulse shadow-lg"
                style={{
                  width: `${100 + Math.random() * 80}px`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Large Analytics Charts Preview */}
        <div className="absolute bottom-32 left-10 opacity-60 animate-data-flow">
          <svg width="160" height="120" viewBox="0 0 160 120" className="text-primary/40">
            <path
              d="M20 100 L40 60 L60 80 L80 40 L100 70 L120 30 L140 50"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="40" cy="60" r="4" fill="currentColor" />
            <circle cx="80" cy="40" r="4" fill="currentColor" />
            <circle cx="120" cy="30" r="4" fill="currentColor" />
            <rect x="20" y="90" width="8" height="20" fill="currentColor" opacity="0.7" />
            <rect x="35" y="70" width="8" height="40" fill="currentColor" opacity="0.7" />
            <rect x="50" y="85" width="8" height="25" fill="currentColor" opacity="0.7" />
            <rect x="65" y="60" width="8" height="50" fill="currentColor" opacity="0.7" />
          </svg>
        </div>

        {/* Queue Management Visualization - Larger */}
        <div className="absolute top-1/2 left-16 opacity-50">
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400/60 to-blue-600/60 animate-pulse shadow-lg"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                <div className="w-32 h-3 bg-gradient-to-r from-blue-400/40 to-transparent rounded shadow-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Large System Status Grid */}
        <div className="absolute bottom-20 right-20 opacity-50">
          <div className="grid grid-cols-4 gap-3">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded bg-gradient-to-br from-green-400/60 to-green-600/60 animate-pulse shadow-lg"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Large Admin Numbers */}
        <div className="absolute top-1/4 right-1/4 opacity-40 animate-float">
          <div className="text-8xl font-bold text-purple-500/60">156</div>
          <div className="text-lg text-purple-500/50 text-center">Bookings</div>
        </div>

        {/* Notification Bubbles - Larger */}
        <div className="absolute top-1/4 left-1/4 opacity-50">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-orange-400/50 to-orange-600/50 animate-ping shadow-xl"
              style={{
                left: `${i * 25}px`,
                top: `${i * 20}px`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Management Control Panels */}
        <div className="absolute top-32 left-32 opacity-50 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-32 h-20 bg-gradient-to-br from-indigo-400/60 to-indigo-600/60 rounded-xl shadow-2xl border border-indigo-300/50">
            <div className="p-3">
              <div className="text-white font-bold text-sm">Control Panel</div>
              <div className="text-indigo-100 text-xs">Live Management</div>
            </div>
          </div>
        </div>

        {/* Floating Admin Icons */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-br from-purple-400/40 to-indigo-400/40 rounded-full animate-float shadow-lg flex items-center justify-center"
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              {adminData && (
                <div className="flex items-center space-x-2 mt-2">
                  <p className="text-lg">
                    {getGreeting()}, <span className="font-semibold text-primary">{adminData.name}</span>
                  </p>
                  <Badge variant="outline">{adminData.organization}</Badge>
                </div>
              )}
            </div>
            <div className="text-right">
              {adminData && (
                <p className="text-sm text-muted-foreground">
                  Logged in as: <span className="font-medium">{adminData.email}</span>
                </p>
              )}
            </div>
          </div>
          <p className="text-muted-foreground mt-2">Overview of today's bookings and queue management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{todayStats.totalBookings}</p>
                  <p className="text-xs text-green-600">+12% from yesterday</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Queues</p>
                  <p className="text-2xl font-bold">{todayStats.activeQueues}</p>
                  <p className="text-xs text-blue-600">Across all locations</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold">{todayStats.completedToday}</p>
                  <p className="text-xs text-green-600">57% completion rate</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Wait Time</p>
                  <p className="text-2xl font-bold">{todayStats.avgWaitTime}</p>
                  <p className="text-xs text-orange-600">-3 mins from avg</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Bookings Chart */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Weekly Bookings Overview</CardTitle>
                <CardDescription>Bookings vs Completed appointments this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bookings: {
                      label: "Bookings",
                      color: "hsl(var(--primary))",
                    },
                    completed: {
                      label: "Completed",
                      color: "hsl(142.1 76.2% 36.3%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="bookings" fill="var(--color-bookings)" />
                      <Bar dataKey="completed" fill="var(--color-completed)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Hourly Visitors */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Today's Hourly Visitors</CardTitle>
                <CardDescription>Real-time visitor count throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    visitors: {
                      label: "Visitors",
                      color:"hsl(var(--primary))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData}>
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="visitors" stroke="var(--color-visitors)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Live Queues
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add New Slots
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Bookings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest customer bookings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
  {recentBookings.map((booking) => (
    <div
      key={booking.id}
      className="flex items-center justify-between p-3 border rounded-lg bg-white/50"
    >
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm">{booking.customer}</span>
          {getStatusBadge(booking.status)}
        </div>
        <p className="text-xs text-muted-foreground">{booking.service}</p>
        <p className="text-xs text-muted-foreground">{booking.location}</p>
        <p className="text-xs text-muted-foreground">{booking.time}</p>
      </div>

      {booking.queuePosition && (
        <div className="text-right">
          <p className="text-sm font-medium">#{booking.queuePosition}</p>
          <p className="text-xs text-muted-foreground">in queue</p>
        </div>
      )}
    </div>
  ))}
</CardContent>

            </Card>

            {/* System Alerts */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50/80 border border-yellow-200 rounded-lg backdrop-blur-sm">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">High Queue Volume</p>
                    <p className="text-xs text-yellow-700">Temple visits are experiencing longer wait times</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50/80 border border-blue-200 rounded-lg backdrop-blur-sm">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">System Update</p>
                    <p className="text-xs text-blue-700">Queue management system updated successfully</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
