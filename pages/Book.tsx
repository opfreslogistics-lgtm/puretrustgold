import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabaseService } from '../services/mockServices';
import { CalendarIcon, MapPinIcon, UploadIcon, CheckIcon } from '../components/Icons';

const Book: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    itemType: '',
    date: '',
    time: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    await supabaseService.createAppointment({
      ...formData,
      dateTime: `${formData.date}T${formData.time}`,
    });

    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-deep-charcoal border border-gold p-10 text-center rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.1)]"
        >
          <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="w-10 h-10 text-deep-black" />
          </div>
          <h2 className="text-3xl font-serif text-white mb-4">Appointment Confirmed</h2>
          <p className="text-gray-400 mb-8">
            Thank you, {formData.name}. We have received your request. A confirmation email has been sent to {formData.email}.
          </p>
          <button onClick={() => window.location.href = '/'} className="text-gold uppercase tracking-widest border-b border-gold pb-1 hover:text-white hover:border-white transition-colors">
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-black bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Secure Your Appointment</h1>
          <p className="text-gray-400">Private. Professional. Premium.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-deep-charcoal border border-gray-800 rounded-lg p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-gold transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }}></div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-serif text-white mb-8 border-b border-gray-800 pb-4">Personal Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                    <input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none transition-colors" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Preferred Location</label>
                    <select required name="location" value={formData.location} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none transition-colors appearance-none">
                      <option value="">Select a location</option>
                      <option value="New York">New York, USA</option>
                      <option value="Puerto Rico">San Juan, Puerto Rico</option>
                      <option value="Toronto">Toronto, Canada</option>
                      <option value="Mexico City">Mexico City, Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                   <button type="button" onClick={() => setStep(2)} className="bg-white text-black px-8 py-3 uppercase font-bold tracking-widest hover:bg-gold transition-colors">
                     Next Step
                   </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-serif text-white mb-8 border-b border-gray-800 pb-4">Item & Schedule</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Item Type</label>
                    <select required name="itemType" value={formData.itemType} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none transition-colors appearance-none">
                      <option value="">Select Item Type</option>
                      <option value="Gold Jewelry">Gold Jewelry</option>
                      <option value="Diamond Jewelry">Diamond Jewelry</option>
                      <option value="Loose Diamonds">Loose Diamonds</option>
                      <option value="Bullion">Bullion / Bars</option>
                      <option value="Coins">Rare Coins</option>
                      <option value="Luxury Watch">Luxury Watch</option>
                      <option value="Estate">Entire Estate</option>
                    </select>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Date</label>
                        <input required name="date" type="date" value={formData.date} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Time</label>
                        <input required name="time" type="time" value={formData.time} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none transition-colors" />
                      </div>
                   </div>
                </div>

                <div className="mb-6">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Additional Notes / Description</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none transition-colors" placeholder="Please describe your items..." />
                </div>

                {/* File Upload Simulation */}
                <div className="mb-8 border border-dashed border-gray-700 p-6 text-center rounded hover:border-gold transition-colors cursor-pointer bg-black/50">
                    <UploadIcon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Upload a photo of your item (Optional)</p>
                    <input type="file" className="hidden" />
                </div>

                <div className="flex justify-between items-center">
                   <button type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-white uppercase text-sm tracking-widest">
                     Back
                   </button>
                   <button type="submit" disabled={loading} className="bg-gold hover:bg-white hover:text-black text-black px-10 py-3 uppercase font-bold tracking-widest transition-all shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed">
                     {loading ? 'Processing...' : 'Confirm Appointment'}
                   </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Book;