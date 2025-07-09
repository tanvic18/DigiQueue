"use client"

import { useEffect, useState } from "react" // Import useEffect
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { DashboardHeader } from "../../components/dashboard-header"
import { Calendar, Clock, MapPin, Plus, Bell, CheckCircle, Users, TrendingUp } from "lucide-react"
import { auth, db } from "../../firebase/firebase" // Import auth and db
import { doc, onSnapshot } from "firebase/firestore" // Import Firestore functions

const upcomingBookings = [
  {
    id: 1,
    service: "Temple Visit",
    location: "Shri Ram Temple",
    date: "Today",
    time: "2:30 PM",
    status: "confirmed",
    queuePosition: 3,
    estimatedWait: "15 mins",
  },
  {
    id: 2,
    service: "Hospital Appointment",
    location: "City General Hospital",
    date: "Tomorrow",
    time: "10:00 AM",
    status: "confirmed",
    queuePosition: 1,
    estimatedWait: "5 mins",
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Booking Confirmed",
    service: "Salon Service",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    action: "Queue Update",
    service: "Temple Visit",
    time: "30 mins ago",
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: 3,
    action: "Reminder Sent",
    service: "Hospital Appointment",
    time: "1 hour ago",
    icon: Bell,
    color: "text-orange-600",
  },
]

export default function DashboardPage() {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    // Add other user-specific fields if you store them in Firestore
  } | null>(null);

  // Fetch user data in real-time
  useEffect(() => {
    // Ensure user is logged in before trying to fetch data
    if (!auth.currentUser) {
      // Optionally, redirect to login if no user is found
      // navigate("/user/login");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data() as { name: string; email: string });
      } else {
        console.log("No user document found for UID:", auth.currentUser?.uid);
        setUserData(null); // Clear data if document doesn't exist
      }
    }, (error) => {
      console.error("Error fetching user data:", error);
      // Handle error, e.g., show a toast notification
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <DashboardHeader />

      {/* PROMINENT Dashboard Background */}
      <div className="absolute inset-0">
        {/* Large Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 via-blue-400/10 to-purple-400/15" />

        {/* Success Celebration Animation */}
        <div className="absolute top-20 right-20 opacity-60 animate-bounce-slow">
          <svg width="120" height="120" viewBox="0 0 24 24" className="text-green-500/60">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Large Floating Booking Cards */}
        <div className="absolute bottom-32 right-32 opacity-50">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-32 h-8 bg-gradient-to-r from-primary/60 to-primary/40 rounded-lg animate-slide-in-right shadow-xl"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>

        {/* Time Saved Visualization - Large */}
        <div className="absolute top-1/2 left-10 opacity-60">
          <div className="flex items-center space-x-4 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400/60 to-green-600/60 flex items-center justify-center shadow-2xl">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <div className="text-2xl text-green-600/70 font-bold">2+ Hours Saved!</div>
          </div>
        </div>

        {/* Queue Position Indicators - Prominent */}
        <div className="absolute bottom-20 left-20 opacity-60">
          <div className="flex space-x-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-blue-400/60 to-blue-600/60 rounded-full animate-pulse shadow-lg"
                style={{
                  width: "20px",
                  height: `${40 + Math.random() * 40}px`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Large Dashboard Stats Floating */}
        <div className="absolute top-32 left-32 opacity-50 animate-float">
          <div className="text-6xl font-bold text-primary/60">24</div>
          <div className="text-sm text-primary/50">Total Bookings</div>
        </div>

        {/* Notification Bells */}
        <div className="absolute top-1/4 right-1/4 opacity-50">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${i * 30}px`,
                top: `${i * 20}px`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400/60 to-orange-600/60 rounded-full flex items-center justify-center shadow-xl">
                <Bell className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Pages Floating */}
        <div className="absolute bottom-1/3 right-10 opacity-50 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-24 h-32 bg-gradient-to-b from-blue-100/80 to-blue-200/80 rounded-lg border border-blue-300/50 shadow-2xl">
            <div className="h-6 bg-blue-400/60 rounded-t-lg" />
            <div className="p-3 space-y-2">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-400/60 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Large Moving Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-br from-primary/40 to-purple-400/40 rounded-full animate-float shadow-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <main className="container py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {userData ? `${getGreeting()}, ${userData.name}! 👋` : "Welcome back! 👋"}
          </h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your bookings today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Bookings</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                  <p className="text-2xl font-bold">3.5h</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Your scheduled appointments and visits</CardDescription>
                </div>
                <Link to="/book-slot"> {/* Changed href to to */}
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Slot
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg bg-white/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{booking.service}</h4>
                        <p className="text-sm text-muted-foreground">{booking.location}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.date} at {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        Position #{booking.queuePosition}
                      </Badge>
                      <p className="text-sm text-muted-foreground">~{booking.estimatedWait}</p>
                    </div>
                  </div>
                ))}

                {upcomingBookings.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming bookings</p>
                    <Link to="/book-slot"> {/* Changed href to to */}
                      <Button className="mt-4">Book Your First Slot</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/book-slot"> {/* Changed href to to */}
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New Slot
                  </Button>
                </Link>
                <Link to="/my-bookings"> {/* Changed href to to */}
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    View All Bookings
                  </Button>
                </Link>
                <Link to="/notifications"> {/* Changed href to to */}
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.service}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
