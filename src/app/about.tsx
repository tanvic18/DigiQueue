"use client"

import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Card, CardContent } from "../components/ui/card"
import { Clock, Users, MapPin, Shield, Award, Target } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
    description: "Visionary leader with 10+ years in tech innovation",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/placeholder.svg?height=200&width=200",
    description: "Expert in scalable systems and queue management",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    image: "/placeholder.svg?height=200&width=200",
    description: "UX specialist focused on seamless user experiences",
  },
]

const achievements = [
  { icon: Users, number: "10,000+", label: "Happy Users" },
  { icon: MapPin, number: "500+", label: "Locations" },
  { icon: Clock, number: "2M+", label: "Hours Saved" },
  { icon: Award, number: "99.9%", label: "Uptime" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />

      {/* PROMINENT About Background */}
      <div className="absolute inset-0">
        {/* Large Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 via-purple-400/10 to-teal-400/15" />

        {/* Company Vision Visualization */}
        <div className="absolute top-20 right-20 opacity-50 animate-float">
          <div className="w-48 h-32 bg-gradient-to-br from-blue-400/60 to-blue-600/60 rounded-xl shadow-2xl border border-blue-300/50">
            <div className="p-4 text-center">
              <div className="text-white font-bold text-lg">Our Vision</div>
              <div className="text-blue-100 text-sm">Queue-Free World</div>
              <div className="mt-2 flex justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-blue-200/60 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement Floating */}
        <div className="absolute bottom-32 left-16 opacity-60">
          <div className="space-y-4">
            {["Innovation", "Efficiency", "Excellence"].map((value, i) => (
              <div
                key={value}
                className="w-32 h-12 bg-gradient-to-r from-purple-400/60 to-purple-600/60 rounded-lg animate-slide-in-left shadow-xl flex items-center justify-center"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <span className="text-white font-medium text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Large Company Icons */}
        <div className="absolute top-1/3 left-16 opacity-60 animate-bounce-slow">
          <svg width="120" height="120" viewBox="0 0 24 24" className="text-blue-500/60">
            <path
              d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Achievement Numbers */}
        <div className="absolute bottom-1/4 right-1/4 opacity-40 animate-float">
          <div className="text-8xl font-bold text-blue-500/60">5</div>
          <div className="text-lg text-blue-500/50 text-center">Years</div>
        </div>

        {/* Team Collaboration Visualization */}
        <div className="absolute top-1/2 right-10 opacity-50">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-gradient-to-br from-teal-400/60 to-teal-600/60 rounded-full flex items-center justify-center animate-pulse shadow-xl"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <Users className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Innovation Lines */}
        <div className="absolute top-32 left-32 opacity-50">
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-2 bg-gradient-to-r from-blue-400/60 to-transparent rounded animate-slide-right shadow-lg"
                style={{
                  width: `${100 + Math.random() * 120}px`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating About Icons */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full animate-float shadow-lg flex items-center justify-center"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Target className="w-3 h-3 text-white" />
            </div>
          ))}
        </div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">About DigiQueue</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
                We're on a mission to eliminate waiting lines and transform how people access services. Founded in 2019,
                DigiQueue has revolutionized queue management across multiple industries.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-muted/20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 mb-6">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To create a world where waiting in line is a thing of the past. We believe everyone's time is
                    valuable, and technology should work to give people more control over their schedules and
                    experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 mb-6">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the global leader in smart queue management, enabling seamless service experiences across
                    temples, hospitals, government offices, and beyond. We envision a future where efficiency and
                    convenience are accessible to all.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">Our Impact</h2>
              <p className="mt-4 text-lg text-muted-foreground">Numbers that showcase our commitment to excellence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="text-center bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-4">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{achievement.number}</div>
                    <div className="text-muted-foreground">{achievement.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">Meet Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The passionate individuals behind DigiQueue's success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="text-center bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">Our Values</h2>
              <p className="mt-4 text-lg text-muted-foreground">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 mx-auto mb-6">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Time is Precious</h3>
                  <p className="text-muted-foreground">
                    We respect everyone's time and work tirelessly to eliminate unnecessary waiting.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-6">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">User-Centric</h3>
                  <p className="text-muted-foreground">
                    Every feature we build is designed with our users' needs and experiences in mind.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 mx-auto mb-6">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Trust & Security</h3>
                  <p className="text-muted-foreground">
                    We maintain the highest standards of security and reliability in all our services.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
