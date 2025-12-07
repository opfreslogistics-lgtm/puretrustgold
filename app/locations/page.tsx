'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from '@/components/Icons';
import Link from 'next/link';
import { TransportRequestModal } from '@/components/TransportRequestModal';

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

export default function Locations() {
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const locs = [
    { 
      city: 'New York', 
      address: '100 Gold St, Suite 500, NY 10038', 
      phone: '+1 (212) 555-0100', 
      desc: "Our flagship location in the heart of the Financial District. Features 3 private viewing suites and armored transport access.",
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.361456793814!2d-74.00601558459418!3d40.70774097932981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a165bedccab%3A0x40cb6784adce77c2!2s100%20Gold%20St%2C%20New%20York%2C%20NY%2010038!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus'
    },
    { 
      city: 'Toronto', 
      address: '150 Bay St, Toronto, ON M5J 2N8', 
      phone: '+1 (416) 555-0100', 
      desc: "Located in the historic Canada Permanent Trust Building. Full bullion exchange services available.",
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.1234567890123!2d-79.37845678901234!3d43.64812345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d68bf33a9b%3A0x15edd8c4de1c7581!2s150%20Bay%20St%2C%20Toronto%2C%20ON%20M5J%202N8!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca'
    },
    { 
      city: 'San Juan', 
      address: '1055 Ashford Ave, San Juan, 00907', 
      phone: '+1 (787) 555-0100', 
      desc: "Ocean view private offices in the Condado Vanderbilt Hotel complex. VIP concierge available.",
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1234567890123!2d-66.06245678901234!3d18.45612345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c036f1234567890%3A0x1234567890abcdef!2s1055%20Ashford%20Ave%2C%20San%20Juan%2C%2000907!5e0!3m2!1sen!2spr!4v1234567890123!5m2!1sen!2spr'
    },
    { 
      city: 'Mexico City', 
      address: 'Av. Pdte. Masaryk 111, Polanco', 
      phone: '+52 (55) 555-0100', 
      desc: "Exclusive secure facility in Polanco. By appointment only for high-value estate liquidations.",
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.1234567890123!2d-99.19845678901234!3d19.42812345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2012345678901%3A0x1234567890abcdef!2sAv.%20Pdte.%20Masaryk%20111%2C%20Polanco!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx'
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Global Presence" subtitle="Find Us Near You" />
      <div className="max-w-7xl mx-auto px-4 py-32">
        
        <div className="mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-white mb-6">The Lounge Experience</h2>
            <p className="text-gray-400 text-lg">
                Forget standing at a counter. At PureTrust, you are escorted to a private, secure lounge. Enjoy espresso or champagne while our experts evaluate your items right in front of you. Security is paramount, and comfort is guaranteed.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {locs.map((l, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-deep-charcoal border border-gray-800 hover:border-gold transition-all duration-300 group overflow-hidden"
            >
              <div className="h-64 bg-gray-900 relative overflow-hidden">
                   <iframe
                     src={l.mapEmbed}
                     width="100%"
                     height="100%"
                     style={{ border: 0 }}
                     allowFullScreen
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                     className="absolute inset-0"
                   ></iframe>
              </div>
              <div className="p-10">
                <div className="flex items-start justify-between mb-6">
                     <h3 className="text-4xl font-serif text-white group-hover:text-gold transition-colors">{l.city}</h3>
                     <MapPinIcon className="text-gold w-8 h-8" />
                </div>
                <p className="text-white mb-2 font-medium text-lg">{l.address}</p>
                <p className="text-gold mb-6 font-mono">{l.phone}</p>
                <p className="text-gray-400 text-base leading-relaxed mb-10">{l.desc}</p>
                <div className="flex space-x-4">
                    <button className="flex-1 py-4 border border-white text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-bold">Get Directions</button>
                    <Link href="/book" className="flex-1 py-4 bg-gold text-black text-xs uppercase tracking-widest font-bold text-center hover:bg-white transition-colors">Book Here</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIP Transport */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-12 border border-gray-800 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-12">
                <h3 className="text-3xl font-serif text-white mb-4">Secure Armored Transport</h3>
                <p className="text-gray-400">For transactions exceeding $100,000, we provide complimentary secure transport from your location to ours via Brinks or Dunbar Armored.</p>
            </div>
            <button 
              onClick={() => setIsTransportModalOpen(true)}
              className="px-8 py-4 bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-colors uppercase tracking-widest text-sm font-bold whitespace-nowrap"
            >
                Request Transport
            </button>
        </div>
      </div>
      <TransportRequestModal 
        isOpen={isTransportModalOpen} 
        onClose={() => setIsTransportModalOpen(false)} 
      />
    </div>
  );
}

