import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { Calendar, Clock, X, Mail, Phone, Globe, User } from "lucide-react";

const AppointmentBooking = () => {
  const today = new Date();

  const generateDates = () => {
    const dates = [];
    let currentDate = new Date(today);

    while (dates.length < 5) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 12; hour++) {
      slots.push(`${hour}:00 AM`);
      slots.push(`${hour}:30 AM`);
    }
    for (let hour = 2; hour < 5; hour++) {
      slots.push(`${hour}:00 PM`);
      slots.push(`${hour}:30 PM`);
    }
    return slots;
  };

  const [dates] = useState(generateDates());
  const [timeSlots] = useState(generateTimeSlots());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState({ message: "", isError: false });
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentType: "",
  });

  const formatDate = (date) =>
    date ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "";

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setIsDialogOpen(true);
    // Reset feedback when opening dialog
    setSubmitFeedback({ message: "", isError: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Basic validation for required fields
    if (!appointmentDetails.name.trim()) return "Name is required";
    if (!appointmentDetails.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(appointmentDetails.email)) return "Email is invalid";
    if (!appointmentDetails.phone.trim()) return "Phone number is required";
    if (!appointmentDetails.appointmentType) return "Appointment type is required";
    return null; // No validation errors
  };

  const handleSubmitAppointment = async () => {
    // Validate the form
    const validationError = validateForm();
    if (validationError) {
      setSubmitFeedback({ message: validationError, isError: true });
      return;
    }

    setIsSubmitting(true);
    setSubmitFeedback({ message: "", isError: false });

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...appointmentDetails,
          date: selectedDate.toISOString(), // Store as ISO string
          time: selectedTime,
          status: "pending", // Default status
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitFeedback({ message: "Appointment booked successfully!", isError: false });
        // Reset form after short delay
        setTimeout(() => {
          setIsDialogOpen(false);
          setSelectedDate(null);
          setSelectedTime(null);
          setAppointmentDetails({
            name: "",
            email: "",
            phone: "",
            appointmentType: "",
          });
        }, 1500);
      } else {
        setSubmitFeedback({ message: data.message || "Failed to book appointment", isError: true });
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setSubmitFeedback({ 
        message: "Network error. Please check your connection and try again.", 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule an Appointment</h2>
      
      {/* New booking options description section */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Ways to Book Your Appointment</h3>
        <p className="text-gray-700 mb-4">We offer multiple convenient ways to schedule your appointment. Choose the option that works best for you:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Online Portal</h4>
              <p className="text-gray-600 text-sm">Book instantly through our Saral Portal for 24/7 scheduling</p>
              <a href="https://saral.iitjammu.ac.in/" className="text-blue-600 text-sm hover:underline mt-1 inline-block">Visit Portal</a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Email</h4>
              <p className="text-gray-600 text-sm">Send appointment requests to <a href="mailto:counsellingservices@iitjammu.ac.in" className="font-medium">counsellingservices@iitjammu.ac.in</a></p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Phone</h4>
              <p className="text-gray-600 text-sm">Call us at <a href="tel:0191-257-0730" className="font-medium">0191-257-0730</a> during business hours</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">In Person</h4>
              <p className="text-gray-600 text-sm">Visit our office to schedule with our staff directly</p>
            </div>
          </div>
        </div>
        
        <div className="text-sm bg-white p-4 rounded-md border border-blue-200">
          <p className="text-gray-700 font-medium">Quick Scheduling Below</p>
          <p className="text-gray-600">For your convenience, you can also use the form below to schedule your appointment immediately.</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          Select Date
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`p-4 cursor-pointer text-center border rounded-md transition ${
                selectedDate && date.toDateString() === selectedDate.toDateString()
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "hover:border-blue-300"
              }`}
              onClick={() => handleDateSelect(date)}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-500" />
            Select Time for {formatDate(selectedDate)}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                className={`p-3 cursor-pointer border rounded-md transition ${
                  selectedTime === time ? "bg-blue-100 border-blue-500" : "hover:border-blue-300"
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <button className="hidden">Open</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-lg font-semibold">Book Appointment</Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            <div className="grid gap-4 py-4">
              <div>
                <p className="font-medium text-gray-700">Selected Time:</p>
                <p className="text-gray-600">{formatDate(selectedDate)} at {selectedTime}</p>
              </div>

              <div className="space-y-2">
                <input
                  className="w-full p-2 border rounded-sm"
                  name="name"
                  value={appointmentDetails.name}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <input
                  className="w-full p-2 border rounded-sm"
                  name="phone"
                  value={appointmentDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div className="space-y-2">
                <input
                  className="w-full p-2 border rounded-sm"
                  name="email"
                  type="email"
                  value={appointmentDetails.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Appointment Type <span className="text-red-500">*</span></label>
                <Select.Root 
                  onValueChange={(value) => setAppointmentDetails((prev) => ({ ...prev, appointmentType: value }))}
                  value={appointmentDetails.appointmentType}
                >
                  <Select.Trigger className="w-full p-2 border rounded-md cursor-pointer">
                    <Select.Value placeholder="Select appointment type" />
                  </Select.Trigger>
                  <Select.Content className="bg-white border rounded-sm">
                    <Select.Viewport>
                      <Select.Item value="consultation" className="p-2 hover:bg-gray-100 cursor-pointer">
                        <Select.ItemText>General Consultation</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="followup" className="p-2 hover:bg-gray-100 cursor-pointer">
                        <Select.ItemText>Follow-up Visit</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="emergency" className="p-2 hover:bg-gray-100 cursor-pointer">
                        <Select.ItemText>Urgent Care</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="virtual" className="p-2 hover:bg-gray-100 cursor-pointer">
                        <Select.ItemText>Virtual Appointment</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Root>
              </div>

              {submitFeedback.message && (
                <div className={`p-3 rounded-md ${
                  submitFeedback.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}>
                  {submitFeedback.message}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <Dialog.Close asChild>
                <button className="px-4 py-2 border rounded-md cursor-pointer" disabled={isSubmitting}>
                  Cancel
                </button>
              </Dialog.Close>
              <button 
                className={`px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`} 
                onClick={handleSubmitAppointment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default AppointmentBooking;