"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { DashboardHeader } from "../../components/dashboard-header"
import { Clock, MapPin, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { getNearbyPlaces } from "../../lib/getNearbyPlaces" // Adjust path
import cityList from '../../lib/indianCities.json'; // Adjust path as needed

const services = [
  { id: 1, name: "Temple Visit", icon: "🏛️", locations: [] },
  { id: 2, name: "Hospital Appointment", icon: "🏥", locations: [] },
  { id: 3, name: "Salon Service", icon: "💇", locations: [] },
  { id: 4, name: "Government Office", icon: "🏢", locations: [] },
]

const timeSlots = [
  { time: "9:00 AM", available: 5, total: 10 },
  { time: "10:00 AM", available: 2, total: 10 },
  { time: "11:00 AM", available: 8, total: 10 },
  { time: "12:00 PM", available: 0, total: 10 },
  { time: "1:00 PM", available: 6, total: 10 },
  { time: "2:00 PM", available: 9, total: 10 },
  { time: "3:00 PM", available: 4, total: 10 },
  { time: "4:00 PM", available: 7, total: 10 },
]

const libraries = ["places"]

export default function BookSlotPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [places, setPlaces] = useState([])
  const [mapRef, setMapRef] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }) // Default: New Delhi
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleBooking = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Booking Confirmed! 🎉",
        description: "Your slot has been booked successfully. You'll receive notifications about your queue status.",
      })
      navigate("/my-bookings")
    }, 2000)
  }

  const handleSearch = async () => {
    if (mapRef && selectedCity && selectedService) {
      const results = await getNearbyPlaces(mapRef, mapCenter, selectedService.toLowerCase().replace(" ", "_")); // Use selected service
      setPlaces(results);
      // Update locations for the selected service
      const serviceIndex = services.findIndex(s => s.id.toString() === selectedService);
      if (serviceIndex !== -1) {
        services[serviceIndex].locations = results.map(place => place.name); // Update locations based on fetched results
      }
    }
  }

  const handleCityChange = (city) => {
    setSelectedCity(city);
    const selectedCityData = cityList.find(c => c.name === city);
    if (selectedCityData) {
      setMapCenter({ lat: selectedCityData.lat, lng: selectedCityData.lng }); // Update map center
      handleSearch(); // Fetch nearby places for the selected city and service
    }
  }

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return "text-green-600"
    if (percentage > 20) return "text-orange-600"
    return "text-red-600"
  }

  const selectedServiceData = services.find((s) => s.id.toString() === selectedService)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Background animations here */}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-extrabold">Book a Slot</h1>
              <p className="text-gray-500">Choose your service and preferred time</p>
            </div>
          </div>
           {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step >= stepNumber ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 4 && <div className={`h-0.5 w-12 ${step > stepNumber ? "bg-violet-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Select Service"}
                {step === 2 && "Choose Location"}
                {step === 3 && "Pick Date & Time"}
                {step === 4 && "Confirm Booking"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "What service do you need?"}
                {step === 2 && "Where would you like to go?"}
                {step === 3 && "When would you like to visit?"}
                {step === 4 && "Review your booking details"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Select Service */}
             {step === 1 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {services.map((service) => (
      <div
        key={service.id}
        role="button"
        tabIndex={0}
        aria-pressed={selectedService === service.id.toString()}
        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md focus:outline-none ${
          selectedService === service.id.toString()
            ? "border-violet-600 bg-violet-50"
            : "border-gray-300"
        }`}
        onClick={() => setSelectedService(service.id.toString())}
        onKeyDown={(e) => {
          if (e.key === "Enter") setSelectedService(service.id.toString());
        }}
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{service.icon}</span>
          <div>
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-500">
              {service.locations.length} locations available
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}


              {/* Step 2: Choose Location */}
              {step === 2 && selectedServiceData && (
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Select City</Label>

                  <Select value={selectedCity} onValueChange={handleCityChange}>
                    <SelectTrigger className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                      <SelectValue placeholder="Choose a city" />
                    </SelectTrigger>

                    <SelectContent className="max-h-64 overflow-y-auto bg-white border rounded-md shadow-md z-50">
                      {cityList
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((city) => (
                          <SelectItem
                            key={city.name}
                            value={city.name}
                            className="px-4 py-2 text-sm text-gray-800 hover:bg-primary/10 hover:text-primary cursor-pointer"
                          >
                            <span className="block">{city.name}</span>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Label>Select Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedServiceData.locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{location}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Google Map for Nearby Places */}
                  <LoadScript googleMapsApiKey="AIzaSyCxzHa-x_4y00mtJPLPeBR6ezp5BC0YMf0" libraries={libraries}>
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "400px" }}
                      center={mapCenter}
                      zoom={14}
                      onLoad={map => setMapRef(map)}
                    />
                  </LoadScript>

                  <button onClick={handleSearch} className="mt-4 p-2 bg-blue-600 text-white">
                    Search Nearby {selectedServiceData.name}s
                  </button>

                  <ul className="mt-4">
                    {places.map((place, index) => (
                      <li key={index} className="p-2 border-b">{place.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step 3: Pick Date & Time */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="day-after">Day After Tomorrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDate && (
                    <div className="space-y-2">
                      <Label>Available Time Slots</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <div
                            key={slot.time}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              slot.available === 0
                                ? "opacity-50 cursor-not-allowed bg-muted"
                                : selectedTime === slot.time
                                  ? "border-primary bg-primary/5"
                                  : "hover:shadow-md"
                            }`}
                            onClick={() => slot.available > 0 && setSelectedTime(slot.time)}
                          >
                            <div className="text-center">
                              <div className="font-medium">{slot.time}</div>
                              <div className={`text-xs ${getAvailabilityColor(slot.available, slot.total)}`}>
                                {slot.available > 0 ? `${slot.available} slots left` : "Full"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Confirm Booking */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Service:</span>
                      <span className="font-medium">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="font-medium">{selectedLocation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">City:</span>
                      <span className="font-medium">{selectedCity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">What happens next?</h4>
                        <ul className="text-sm text-blue-700 mt-2 space-y-1">
                          <li>• You'll receive a confirmation with your queue number</li>
                          <li>• Get real-time updates on your queue position</li>
                          <li>• Receive notifications when it's almost your turn</li>
                          <li>• Arrive at your scheduled time to skip the line</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
             <div className="flex justify-between pt-6">
  {/* Previous Button */}
  <Button
    variant="outline"
    onClick={() => setStep(Math.max(1, step - 1))}
    disabled={step === 1}
    className="min-w-[100px]"
  >
    Previous
  </Button>

  {/* Next or Confirm Button */}
  {step < 4 ? (
    <Button
      onClick={() => setStep(step + 1)}
      disabled={
        (step === 1 && !selectedService) ||
        (step === 2 && (!selectedCity || !selectedLocation)) ||
        (step === 3 && (!selectedDate || !selectedTime))
      }
      className="bg-violet-600 hover:bg-violet-700 text-white min-w-[100px] transition-colors"
    >
      Next
    </Button>
  ) : (
    <Button
      onClick={handleBooking}
      disabled={isLoading}
      className="bg-violet-600 hover:bg-violet-700 text-white min-w-[140px] flex items-center justify-center"
    >
      {isLoading ? (
        <>
          <Loader className="h-4 w-4 animate-spin mr-2" />
          Booking...
        </>
      ) : (
        "Confirm Booking"
      )}
    </Button>
  )}
</div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
