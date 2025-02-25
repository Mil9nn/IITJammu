import { useState } from "react";

const AppointmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to parent component
    setFormData({ name: "", email: "", date: "", time: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-2xl p-6 rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
      
      <label className="block mb-2">
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded"/>
      </label>

      <label className="block mb-2">
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded"/>
      </label>

      <label className="block mb-2">
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded"/>
      </label>

      <label className="block mb-2">
        Time:
        <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-2 border rounded"/>
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
        Book Now
      </button>
    </form>
  );
};

export default AppointmentForm;
