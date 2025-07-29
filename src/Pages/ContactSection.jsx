import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData); // replace with API call if needed
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded shadow">
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded h-32"
                ></textarea>
              </div>
              <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-red-500 text-xl" />
              <span className="text-lg font-medium">+880 1234-567890</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-red-500 text-xl" />
              <span className="text-lg font-medium">support@donorsync.org</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
