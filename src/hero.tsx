import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { ArrowRight, Clock, Users, MapPin, Shield } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/20 py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Skip the Line, <span className="gradient-text">Save Your Time</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
              Book your service slots online in advance. Whether it's a temple visit, hospital appointment, salon
              service, or government office - DigiQueue ensures you never wait in long queues again.
            </p>
          </div>

          {/* Access Options */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">I'm a User</h3>
                <p className="text-muted-foreground mb-6">Book slots, track queues, and manage your appointments</p>
                <Link to="/user/login">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 group" aria-label="Access User Portal">
                    Access User Portal
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">I'm an Admin</h3>
                <p className="text-muted-foreground mb-6">Manage queues, slots, and monitor system analytics</p>
                <Link to="/admin/signup">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 group" aria-label="Access Admin Panel">
                    Access Admin Panel
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center animate-slide-in-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="mt-4 text-2xl font-bold">2+ Hours</div>
              <div className="text-sm text-muted-foreground">Average Time Saved</div>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="mt-4 text-2xl font-bold">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="flex flex-col items-center animate-slide-in-right">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="mt-4 text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROMINENT Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Gradient Orbs */}
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 blur-3xl animate-pulse-slow" />
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-0 left-0 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />

        {/* Prominent Queue Lines Pattern */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 bg-gradient-to-r from-violet-600/40 via-violet-300/60 to-transparent rounded-full animate-slide-right"
              style={{
                top: `${5 + i * 4.5}%`,
                left: "-10%",
                width: `${200 + Math.random() * 300}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "6s",
              }}
            />
          ))}
        </div>

        {/* Large Floating Clock Icons */}
        <div className="absolute top-20 right-20 animate-bounce-slow opacity-60">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-violet-500/40"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="absolute bottom-32 left-20 animate-bounce-slow opacity-50" style={{ animationDelay: "1s" }}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500/40"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Large People Queue Visualization */}
        <div className="absolute bottom-10 right-10 opacity-50">
          <div className="flex space-x-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-20 bg-gradient-to-t from-violet-600/60 to-violet-400/30 rounded-full animate-pulse shadow-lg"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "2s",
                  height: `${60 + Math.random() * 20}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Large Moving Dots Pattern */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-violet-600/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Queue Numbers Floating */}
        <div className="absolute top-1/4 left-1/4 opacity-40 animate-float">
          <div className="text-8xl font-bold text-purple-500/50">#1</div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-30 animate-float" style={{ animationDelay: "1s" }}>
          <div className="text-6xl font-bold text-purple-500/50">#2</div>
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-35 animate-float" style={{ animationDelay: "2s" }}>
          <div className="text-7xl font-bold text-blue-500/50">#3</div>
        </div>
      </div>
    </section>
  )
}
