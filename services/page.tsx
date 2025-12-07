'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GoldBarIcon, DiamondIcon, ScaleIcon, ShieldCheckIcon } from '@/components/Icons';

const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="bg-deep-charcoal py-40 md:py-52 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-40"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-9xl font-serif text-white font-bold mb-8"
      >
        {title}
      </motion.h1>
      {subtitle && <p className="text-gold text-xl uppercase tracking-[0.2em]">{subtitle}</p>}
    </div>
  </div>
);

const ServiceCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}> = ({ icon: Icon, title, description, features }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-deep-charcoal border border-gray-800 hover:border-gold/50 transition-all p-10 group"
  >
    <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:border-gold transition-all">
      <Icon className="w-8 h-8 text-gold group-hover:text-black transition-colors" />
    </div>
    <h3 className="text-3xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{title}</h3>
    <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start text-gray-300">
          <span className="w-2 h-2 bg-gold rounded-full mr-3 mt-2 shrink-0"></span>
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function Services() {
  const services = [
    {
      icon: GoldBarIcon,
      title: 'Sell Gold',
      description: 'We offer the highest payouts for gold jewelry, bullion, and coins. Our transparent pricing is based on live spot prices, ensuring you receive maximum value.',
      features: [
        'Highest payout for 24k, 18k, 14k gold',
        'Immediate cash payment or wire transfer',
        'Professional XRF testing in front of you',
        'No hidden fees or commissions'
      ]
    },
    {
      icon: DiamondIcon,
      title: 'Sell Diamonds',
      description: 'Our GIA-certified gemologists evaluate loose and mounted diamonds with precision. We use advanced grading technology to ensure accurate valuations.',
      features: [
        'GIA certified gemologists',
        'Loose or mounted diamonds accepted',
        'Advanced grading technology',
        'Competitive market pricing'
      ]
    },
    {
      icon: GoldBarIcon,
      title: 'Sell Bullion',
      description: 'We purchase gold, silver, platinum, and palladium bullion in all forms: bars, rounds, and ingots. Get up to 98% of spot price for pure bullion.',
      features: [
        'Bars, rounds, and ingots accepted',
        'Up to 98% of spot price',
        'Immediate payment',
        'All precious metals: Gold, Silver, Platinum, Palladium'
      ]
    },
    {
      icon: ScaleIcon,
      title: 'Assay Process',
      description: 'Our state-of-the-art testing process ensures complete transparency. Watch as we test your items using XRF technology and specific gravity tests.',
      features: [
        'Non-destructive XRF testing',
        'Specific gravity verification',
        'Complete transparency - you watch the process',
        'Calibrated daily for 99.9% accuracy'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Our Services" subtitle="Premium Asset Liquidation" />
      
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            We provide a secure, private environment for the valuation and purchase of your most precious assets.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            At PureTrust Gold, we understand that selling valuable assets requires trust, expertise, and discretion. Our comprehensive services are designed to provide you with the highest payouts and the most professional experience in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>

        {/* Process Overview */}
        <div className="bg-deep-charcoal border border-gray-800 p-12 md:p-16 mb-24">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-serif text-white mb-4">How It Works</h3>
            <p className="text-gray-400">A simple, secure process designed for your peace of mind</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Book Appointment', desc: 'Schedule a private consultation at one of our secure locations.' },
              { step: '2', title: 'Professional Evaluation', desc: 'Our experts test your items using advanced technology right in front of you.' },
              { step: '3', title: 'Get Paid Instantly', desc: 'Accept our offer and receive immediate payment via cash, check, or wire transfer.' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif text-gold">
                  {item.step}
                </div>
                <h4 className="text-xl font-serif text-white mb-3">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-black p-16 border border-gray-800">
          <h3 className="text-4xl font-serif text-white mb-6">Ready to Sell Your Asse