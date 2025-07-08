"use client"

import { useState } from "react"
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { AdminHeader } from "../../components/admin-header"
import { ArrowLeft, Search, MoreHorizontal, User, Mail, Phone, Calendar, Ban, CheckCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { useToast } from "../../hooks/use-toast"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15",
    totalBookings: 24,
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2024-02-20",
    totalBookings: 18,
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2024-03-10",
    totalBookings: 12,
    status: "suspended",
    lastActive: "1 week ago",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2024-01-05",
    totalBookings: 31,
    status: "active",
    lastActive: "30 minutes ago",
  },
]

const userStats = {
  total: 1247,
  active: 1156,
  suspended: 91,
  newThisMonth: 156,
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const handleSuspendUser  = (userId: number) => {
    toast({
      title: "User  Suspended",
      description: "User  account has been suspended successfully.",
    })
  }

  const handleActivateUser  = (userId: number) => {
    toast({
      title: "User  Activated",
      description: "User  account has been activated successfully.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AdminHeader />

      {/* PROMINENT Users Management Background */}
      <div className="absolute inset-0">
        {/* Large Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 via-purple-400/15 to-pink-400/20" />

        {/* Large User Icons */}
        <div className="absolute top-20 right-20 opacity-60 animate-float">
          <div className="w-40 h-32 bg-gradient-to-br from-indigo-400/60 to-indigo-600/60 rounded-xl shadow-2xl border border-indigo-300/50">
            <div className="p-4 text-center">
              <div className="text-white font-bold text-lg">Users</div>
              <div className="text-indigo-100 text-sm">Management</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-indigo-200/60 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Cards Floating */}
        <div className="absolute bottom-32 left-16 opacity-50">
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-32 h-16 bg-gradient-to-r from-purple-400/60 to-purple-600/60 rounded-lg animate-slide-in-left shadow-xl"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="p-2 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-200/60 rounded-full" />
                  <div className="space-y-1">
                    <div className="h-2 bg-purple-200/40 rounded w-12" />
                    <div className="h-1 bg-purple-200/30 rounded w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Large User Statistics */}
        <div className="absolute top-1/3 left-16 opacity-60 animate-bounce-slow">
          <svg width="120" height="120" viewBox="0 0 24 24" className="text-indigo-500/60">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* User Count Display */}
        <div className="absolute bottom-1/4 right-1/4 opacity-40 animate-float">
          <div className="text-8xl font-bold text-indigo-500/60">{userStats.total.toLocaleString()}</div>
          <div className="text-lg text-indigo-500/50 text-center">Users</div>
        </div>

        {/* Activity Indicators */}
        <div className="absolute top-1/2 right-10 opacity-50">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-gradient-to-br from-green-400/60 to-green-600/60 rounded-full flex items-center justify-center animate-pulse shadow-xl"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* User Management Lines */}
        <div className="absolute top-32 left-32 opacity-50">
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-2 bg-gradient-to-r from-indigo-400/60 to-transparent rounded animate-slide-right shadow-lg"
                style={{
                  width: `${60 + Math.random() * 80}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating User Management Icons */}
        <div className="absolute inset-0">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 rounded-full animate-float shadow-lg flex items-center justify-center"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <User  className="w-4 h-4 text-white" />
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
              <h1 className="text-3xl font-bold">User  Management</h1>
              <p className="text-muted-foreground">Manage user accounts and monitor user activity</p>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{userStats.total.toLocaleString()}</p>
                  </div>
                  <User  className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">{userStats.active.toLocaleString()}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                    <p className="text-2xl font-bold">{userStats.suspended}</p>
                  </div>
                  <Ban className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                    <p className="text-2xl font-bold">{userStats.newThisMonth}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage and monitor user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-white/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                        <User  className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          {getStatusBadge(user.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>Joined: {user.joinDate}</span>
                          <span>Bookings: {user.totalBookings}</span>
                          <span>Last active: {user.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="More Options">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Bookings</DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleSuspendUser (user.id)} className="text-red-600">
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateUser (user.id)} className="text-green-600">
                            Activate User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
