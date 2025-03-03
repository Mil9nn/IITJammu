import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { Calendar, Clock, X } from "lucide-react";

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
    reason: "",
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

  // Updated handleSubmitAppointment function for Appointments.jsx
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
    const API_URL = "https://iitjammu.onrender.com";
    console.log("Sending request to:", `${API_URL}/api/appointments`);
    
    const response = await fetch(`${API_URL}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...appointmentDetails,
        date: selectedDate.toISOString(),
        time: selectedTime,
        status: "pending",
      }),
    });

    console.log("Response status:", response.status);
    
    // Check if response is ok before trying to parse JSON
    if (response.ok) {
      // Only try to parse JSON if there's content
      if (response.headers.get("content-length") !== "0") {
        const data = await response.json();
        console.log("Response data:", data);
        
        setSubmitFeedback({ 
          message: "Appointment booked successfully! An admin will review your request shortly.", 
          isError: false 
        });
      } else {
        // Handle empty but successful response
        setSubmitFeedback({ 
          message: "Appointment booked successfully! An admin will review your request shortly.", 
          isError: false 
        });
      }
      
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
          reason: "",
        });
      }, 1500);
    } else {
      // Try to get error message from response if possible
      try {
        const errorData = await response.json();
        setSubmitFeedback({ 
          message: errorData.message || `Error: ${response.status} - ${response.statusText}`, 
          isError: true 
        });
      } catch (jsonError) {
        // If we can't parse JSON, just use status text
        setSubmitFeedback({ 
          message: `Error: ${response.status} - ${response.statusText}`, 
          isError: true 
        });
      }
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    setSubmitFeedback({ 
      message: `Network error: ${error.message}. Please check your connection and try again.`, 
      isError: true 
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule an Appointment</h2>

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
          <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-100">
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
                <label className="font-medium">Full Name <span className="text-red-500">*</span></label>
                <input
                  className="w-full p-2 border rounded-md"
                  name="name"
                  value={appointmentDetails.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Phone Number <span className="text-red-500">*</span></label>
                <input
                  className="w-full p-2 border rounded-md"
                  name="phone"
                  value={appointmentDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Email Address <span className="text-red-500">*</span></label>
                <input
                  className="w-full p-2 border rounded-md"
                  name="email"
                  type="email"
                  value={appointmentDetails.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
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
                  <Select.Content className="bg-white border rounded-md">
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

              <div className="space-y-2">
                <label className="font-medium">Reason for Visit (Optional)</label>
                <textarea
                  className="w-full p-2 border rounded-md resize-none"
                  name="reason"
                  value={appointmentDetails.reason}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your reason for the appointment"
                  rows={3}
                />
              </div>

              <div className="p-3 bg-blue-50 text-blue-800 rounded-md">
                <p className="text-sm">Your appointment will be reviewed by our admin team once submitted.</p>
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