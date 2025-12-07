'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@/components/Icons';
import { supabaseService } from '@/lib/supabaseService';

const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="bg-deep-charcoal py-20 md:py-32 relative overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/hero.jpeg')` }}
    ></div>
    <div className="absolute inset-0 bg-black/80"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-serif text-white font-bold mb-6"
      >
        {title}
      </motion.h1>
      {subtitle && <p className="text-gold text-lg uppercase tracking-[0.2em]">{subtitle}</p>}
    </div>
  </div>
);

export default function Contact() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        // Save message to Supabase
        const result = await supabaseService.sendMessage(formData);
        
        if (result.error) {
          alert('Error saving message: ' + result.error);
          setLoading(false);
          return;
        }

        // Send email notification
        const emailResponse = await fetch('/api/send-contact-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const emailData = await emailResponse.json();

        if (!emailResponse.ok) {
          console.error('Email sending failed:', emailData.error);
          // Don't fail the form submission if email fails, message is still saved
        }

        setLoading(false);
        setSent(true);
      } catch (error: any) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
        setLoading(false);
      }
    };

    return (
        <div className="min-h-screen bg-black">
            <PageHeader title="Contact Concierge" subtitle="We are here to assist" />
            <div className="max-w-7xl mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 gap-20">
                
                <div>
                    <h3 className="text-4xl text-white font-serif mb-8">Get in Touch</h3>
                    <p className="text-gray-400 mb-12 leading-relaxed text-lg">
                        Have a question about an item? Need to arrange a special appointment outside of business hours? 
                        Our concierge team is available 24/7 to assist high-net-worth clients with complete discretion.
                    </p>
                    
                    <div className="space-y-10">
                        <div>
                            <p className="text-gold text-xs uppercase tracking-widest mb-2">General Inquiries</p>
                            <p className="text-white text-2xl font-serif">info@puretrustgold.com</p>
                        </div>
                        <div>
                            <p className="text-gold text-xs uppercase tracking-widest mb-2">VIP & Estates</p>
                            <p className="text-white text-2xl font-serif">vip@puretrustgold.com</p>
                        </div>
                        <div>
                            <p className="text-gold text-xs uppercase tracking-widest mb-2">Toll Free</p>
                            <p className="text-white text-2xl font-serif">+1 (800) 555-GOLD</p>
                        </div>
                    </div>
                </div>

                <div className="bg-deep-charcoal p-12 border border-gray-800 shadow-2xl">
                    {sent ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-8">
                                <ShieldCheckIcon className="text-black w-10 h-10" />
                            </div>
                            <h3 className="text-3xl text-white font-serif mb-4">Message Sent</h3>
                            <p className="text-gray-400">Our concierge will respond shortly.</p>
                            <button onClick={() => { setSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); }} className="mt-8 text-gold text-sm underline">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <h3 className="text-2xl text-white font-serif mb-8">Send a Message</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest">Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} className="bg-black border border-gray-700 p-4 text-white w-full focus:border-gold outline-none transition-colors" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest">Email</label>
                                    <input name="email" type="email" value={formData.email} onChange={handleChange} className="bg-black border border-gray-700 p-4 text-white w-full focus:border-gold outline-none transition-colors" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase tracking-widest">Subject</label>
                                <input name="subject" value={formData.subject} onChange={handleChange} className="bg-black border border-gray-700 p-4 text-white w-full focus:border-gold outline-none transition-colors" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase tracking-widest">Message</label>
                                <textarea name="message" rows={5} value={formData.message} onChange={handleChange} className="bg-black border border-gray-700 p-4 text-white w-full focus:border-gold outline-none transition-colors" required></textarea>
                            </div>
                            <button type="submit" disabled={loading} className="bg-gold text-black uppercase font-bold tracking-widest py-5 px-8 hover:bg-white transition-colors w-full disabled:opacity-50">
                              {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

