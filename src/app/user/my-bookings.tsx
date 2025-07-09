"use client"

import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DashboardHeader } from "../../components/dashboard-header"
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { useToast } from "../../hooks/use-toast"
import { db } from "../../firebase/firebase"
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore"
import { parse, isAfter, isBefore } from "date-fns"
import { auth } from "../../firebase/firebase"

export default function MyBookingsPage() {
  const { toast } = useToast()
  const userId = auth.currentUser?.uid

  const [bookings, setBookings] = useState({
    upcoming: [],
    past: [],
    cancelled: [],
  })

  useEffect(() => {
    if (!userId) return

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId),
      orderBy("date", "asc"),
      orderBy("time", "asc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date()
      const upcoming = []
      const past = []
      const cancelled = []

      snapshot.forEach((doc) => {
        const data = doc.data()
        const date = data.date?.toDate?.() || new Date(data.date)
        const time = data.time
        const status = data.status

        const parsedTime = parse(time, "hh:mm a", new Date())
        date.setHours(parsedTime.getHours(), parsedTime.getMinutes(), 0, 0)
        const bookingDateTime = date

        const booking = {
          id: doc.id,
          ...data,
          bookingDateTime,
        }

        if (status === "cancelled") {
          cancelled.push(booking)
        } else if (isAfter(bookingDateTime, now)) {
          upcoming.push(booking)
        } else {
          past.push(booking)
        }
      })

      setBookings({
        upcoming,
        past,
        cancelled,
      })
    })

    return () => unsubscribe()
  }, [userId])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking Cancelled",
      description: `Booking ${bookingId} has been cancelled successfully.`,
    })
  }

  const handleReschedule = (bookingId: string) => {
    toast({
      title: "Reschedule Request",
      description: `Redirecting to reschedule booking ${bookingId}...`,
    })
  }

  const BookingCard = ({ booking, showActions = true }: { booking: any; showActions?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              {getStatusIcon(booking.status)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold">{booking.service}</h3>
                {getStatusBadge(booking.status)}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{booking.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {booking.date} at {booking.time}
                  </span>
                </div>
                {booking.queuePosition && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>
                      Position #{booking.queuePosition} • ~{booking.estimatedWait}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Booking ID: {booking.bookingId}</span>
              </div>
            </div>
          </div>

          {showActions && booking.status !== "completed" && booking.status !== "cancelled" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleReschedule(booking.bookingId)}>Reschedule</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCancelBooking(booking.bookingId)} className="text-red-600">
                  Cancel Booking
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">My Bookings</h1>
              <p className="text-muted-foreground">Manage all your appointments and visits</p>
            </div>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming ({bookings.upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({bookings.past.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({bookings.cancelled.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {bookings.upcoming.length > 0 ? (
                bookings.upcoming.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Upcoming Bookings</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any upcoming appointments or visits scheduled.
                    </p>
                    <Link to="/book-slot">
                      <Button>Book Your First Slot</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {bookings.past.length > 0 ? (
                bookings.past.map((booking) => <BookingCard key={booking.id} booking={booking} showActions={false} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Past Bookings</h3>
                    <p className="text-muted-foreground">Your completed bookings will appear here.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {bookings.cancelled.length > 0 ? (
                bookings.cancelled.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} showActions={false} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Cancelled Bookings</h3>
                    <p className="text-muted-foreground">Your cancelled bookings will appear here.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}