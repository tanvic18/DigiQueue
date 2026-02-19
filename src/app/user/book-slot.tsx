"use client";

import OSMMap from "../../components/OSMMap";
import { db } from "../../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { DashboardHeader } from "../../components/dashboard-header";
import { Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import cityList from "../../lib/indianCities.json";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";

const services = [
  { id: 1, name: "Temple Visit", icon: "🏛️" },
  { id: 2, name: "Hospital Appointment", icon: "🏥" },
  { id: 3, name: "Salon Service", icon: "💇" },
  { id: 4, name: "Government Office", icon: "🏢" },
];

const timeSlots = [
  { time: "9:00 AM", available: 5, total: 10 },
  { time: "10:00 AM", available: 2, total: 10 },
  { time: "11:00 AM", available: 8, total: 10 },
  { time: "12:00 PM", available: 0, total: 10 },
  { time: "1:00 PM", available: 6, total: 10 },
  { time: "2:00 PM", available: 9, total: 10 },
  { time: "3:00 PM", available: 4, total: 10 },
  { time: "4:00 PM", available: 7, total: 10 },
];

export default function BookSlotPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCoords, setSelectedCoords] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = getAuth();

  const selectedServiceData = services.find(
    (s) => s.id.toString() === selectedService
  );

  // Reverse Geocoding (LatLng → Address)
  const getAddress = async (lat: number, lon: number) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    return data.display_name || "";
  };

  const handleMapLocation = async (coords: any) => {
    setSelectedCoords(coords);
    const address = await getAddress(coords.lat, coords.lng);
    setSelectedLocation(address);
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedCity || !selectedLocation || !selectedDate || !selectedTime) {
      toast({ title: "Please complete all fields." });
      return;
    }

    try {
      setIsLoading(true);

      const user = auth.currentUser;
      const userId = user?.uid || "guest";
      const email = user?.email || "guest@example.com";

      await addDoc(collection(db, "bookings"), {
        userId,
        email,
        service: selectedServiceData?.name,
        city: selectedCity,
        location: selectedLocation,
        lat: selectedCoords?.lat || null,
        lng: selectedCoords?.lng || null,
        date: selectedDate,
        time: selectedTime,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      toast({ title: "Booking Confirmed!" });
      navigate("/user/dashboard");
    } catch (error) {
      console.error(error);
      toast({ title: "Booking failed. Try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-green-600";
    if (percentage > 20) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Book a Slot</h1>
              <p className="text-muted-foreground">
                Choose your service and preferred time
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
              <CardDescription>
                Complete all steps to confirm your booking
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* STEP 1 */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedService === service.id.toString()
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedService(service.id.toString())
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{service.icon}</span>
                        <h3 className="font-semibold">{service.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 2 */}
{step === 2 && (
  <div className="space-y-4 relative z-50">
    <Label>Select City</Label>

    <Select
      value={selectedCity}
      onValueChange={(value) => {
        setSelectedCity(value);
        setSelectedLocation("");      // reset old address
        setSelectedCoords(null);      // reset old coords
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose city" />
      </SelectTrigger>

      <SelectContent className="z-[1000] bg-white border shadow-lg">
        {cityList.map((city: any) => (
          <SelectItem key={city.name} value={city.name}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Label>Select Location on Map</Label>

    <div className="relative z-0">
      <OSMMap 
        setLocation={handleMapLocation}
        selectedCity={selectedCity}   // 🔥 important
      />
    </div>

    {selectedLocation && (
      <div className="p-3 bg-muted rounded-md text-sm">
        <strong>Selected Address:</strong>
        <br />
        {selectedLocation}
      </div>
    )}
  </div>
)}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <Label>Select Date</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {selectedDate || "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        onSelect={(date) =>
                          date &&
                          setSelectedDate(
                            date.toISOString().split("T")[0]
                          )
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  {selectedDate && (
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot.time}
                          className={`p-3 border rounded-lg cursor-pointer ${
                            selectedTime === slot.time
                              ? "border-black bg-primary/5"
                              : ""
                          } ${
                            slot.available === 0
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            slot.available > 0 &&
                            setSelectedTime(slot.time)
                          }
                        >
                          <div className="text-center">
                            <div>{slot.time}</div>
                            <div
                              className={`text-xs ${getAvailabilityColor(
                                slot.available,
                                slot.total
                              )}`}
                            >
                              {slot.available} slots left
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-3 text-sm">
                  <p><strong>Service:</strong> {selectedServiceData?.name}</p>
                  <p><strong>City:</strong> {selectedCity}</p>
                  <p><strong>Location:</strong> {selectedLocation}</p>
                  <p><strong>Date:</strong> {selectedDate}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                </div>
              )}

              {/* NAVIGATION */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                >
                  Previous
                </Button>

                {step < 4 ? (
                  <Button onClick={() => setStep(step + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleBooking} disabled={isLoading}>
                    {isLoading ? "Booking..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
