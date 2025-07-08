"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { useToast } from "../hooks/use-toast"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Message Sent! 📧",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />

      {/* PROMINENT Contact Background */}
      <div className="absolute inset-0">
        {/* Large Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/15 via-pink-400/10 to-red-400/15" />

        {/* Contact Form Visualization */}
        <div className="absolute top-20 right-20 opacity-50 animate-float">
          <div className="w-40 h-32 bg-gradient-to-br from-orange-400/60 to-orange-600/60 rounded-xl shadow-2xl border border-orange-300/50">
            <div className="p-4">
              <div className="text-white font-bold text-sm mb-2">Get in Touch</div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-2 bg-orange-200/60 rounded w-full" />
                ))}
                <div className="h-4 bg-orange-200/40 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Communication Icons */}
        <div className="absolute bottom-32 left-16 opacity-60">
          <div className="space-y-4">
            {[Mail, Phone, MessageCircle].map((Icon, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-gradient-to-br from-pink-400/60 to-pink-600/60 rounded-full animate-bounce-slow shadow-xl flex items-center justify-center"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Large Contact Icon */}
        <div className="absolute top-1/3 left-16 opacity-60 animate-bounce-slow">
          <svg width="120" height="120" viewBox="0 0 24 24" className="text-orange-500/60">
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Support Hours Display */}
        <div className="absolute bottom-1/4 right-1/4 opacity-40 animate-float">
          <div className="text-6xl font-bold text-orange-500/60">24/7</div>
          <div className="text-lg text-orange-500/50 text-center">Support</div>
        </div>

        {/* Location Markers */}
        <div className="absolute top-1/2 right-10 opacity-50">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-gradient-to-br from-red-400/60 to-red-600/60 rounded-full flex items-center justify-center animate-pulse shadow-xl"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <MapPin className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Message Lines */}
        <div className="absolute top-32 left-32 opacity-50">
          <div className="space-y-3">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-2 bg-gradient-to-r from-orange-400/60 to-transparent rounded animate-slide-right shadow-lg"
                style={{
                  width: `${90 + Math.random() * 100}px`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Contact Icons */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-br from-orange-400/40 to-pink-400/40 rounded-full animate-float shadow-lg flex items-center justify-center"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Send className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">Get in Touch</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
                Have questions about DigiQueue? We're here to help! Reach out to our team and we'll get back to you as
                soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll respond within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What is this regarding?" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Multiple ways to reach our support team</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Email Support</h4>
                        <p className="text-muted-foreground">support@digiqueue.com</p>
                        <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Phone Support</h4>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Office Address</h4>
                        <p className="text-muted-foreground">123 Innovation Drive</p>
                        <p className="text-muted-foreground">New York, NY 10001</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Business Hours</h4>
                        <p className="text-muted-foreground">Monday - Friday: 9 AM - 6 PM</p>
                        <p className="text-muted-foreground">Saturday - Sunday: 10 AM - 4 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How do I book a slot?</h4>
                      <p className="text-sm text-muted-foreground">
                        Simply sign up, choose your service and location, select an available time slot, and confirm
                        your booking.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Can I cancel my booking?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, you can cancel or reschedule your booking up to 30 minutes before your scheduled time.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Is DigiQueue free to use?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, DigiQueue is completely free for users. We partner with service providers to offer this
                        service.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
