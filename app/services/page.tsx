'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GoldBarIcon, DiamondIcon, ScaleIcon, ShieldCheckIcon } from '@/components/Icons';

const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="bg-deep-charcoal py-20 md:py-32 relative overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/hero.jpeg')` }}
    ></div>
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
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

export default function Services() {
  const services = [
    {
      title: 'Sell Gold',
      subtitle: 'Highest payout for 24k, 18k, 14k',
      description: 'We buy all forms of gold jewelry, coins, and bullion. Our XRF technology ensures accurate purity testing, and we pay up to 98% of spot price for pure bullion. Whether you have broken chains, old rings, or investment bars, we provide immediate valuation and payment.',
      icon: GoldBarIcon,
      features: ['Any karat accepted (10k-24k)', 'Highest payout in the industry', 'Immediate payment', 'No minimum weight requirement']
    },
    {
      title: 'Sell Diamonds',
      subtitle: 'GIA certified gemologists',
      description: 'Our team includes GIA-certified gemologists with decades of experience. We evaluate loose diamonds, mounted stones, and estate jewelry. Every diamond is assessed using professional grading standards, and we offer competitive prices based on current market valuations.',
      icon: DiamondIcon,
      features: ['GIA certified experts', 'Loose or mounted stones', 'Estate jewelry accepted', 'Professional grading']
    },
    {
      title: 'Sell Bullion',
      subtitle: 'Bars, rounds, and ingots',
      description: 'We specialize in buying gold, silver, platinum, and palladium bullion. From 1-ounce rounds to 400-ounce bars, we offer premium prices for investment-grade precious metals. Our transparent pricing is based on live spot prices, updated in real-time.',
      icon: GoldBarIcon,
      features: ['All precious metals', 'Bars, rounds, ingots', 'Up to 98% of spot price', 'Live market pricing']
    },
    {
      title: 'Assay Process',
      subtitle: 'How we test your purity',
      description: 'Transparency is our foundation. Watch as our experts test your items using state-of-the-art X-Ray Fluorescence (XRF) spectrometers. We explain every step of the process, showing you the exact purity and weight measurements that determine your payout.',
      icon: ScaleIcon,
      features: ['Non-destructive testing', 'XRF technology', 'Transparent process', 'You watch every step']
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Our Services" subtitle="Premium Asset Liquidation" />
      
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">We provide a secure, private environment for the valuation and purchase of your most precious assets.</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            At PureTrust Gold, we understand that selling valuable assets requires trust, expertise, and discretion. Our comprehensive services cover all aspects of precious metal and diamond transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-deep-charcoal border border-gray-800 hover:border-gold/50 transition-all p-10 group"
            >
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <service.icon className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-gold transition-colors">{service.title}</h3>
                  <p className="text-gold text-sm uppercase tracking-widest">{service.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed text-base">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <ShieldCheckIcon className="w-4 h-4 text-gold mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-black p-12 border border-gray-800 text-center">
          <h3 className="text-3xl font-serif text-white mb-6">Ready to Sell Your Assets?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Book a private appointment at one of our secure locations. Our experts will provide a transparent valuation and immediate payment.
          </p>
          <Link href="/book">
            <button className="px-10 py-4 bg-gold hover:bg-white hover:text-black text-black font-bold text-sm uppercase tracking-widest transition-all">
              Book Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

