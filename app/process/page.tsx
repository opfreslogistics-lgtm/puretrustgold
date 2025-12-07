'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, CheckIcon } from '@/components/Icons';
import Link from 'next/link';

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

export default function Process() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="The Process" subtitle="Transparent & Secure" />
      <div className="max-w-6xl mx-auto px-4 py-32">
          
          <div className="mb-32">
              <h2 className="text-5xl font-serif text-white mb-16 text-center">From Appraisal to Payment</h2>
              <div className="w-32 h-1 bg-gold mx-auto mb-20"></div>
              
              {[
                  { num: '01', title: 'Consultation', text: 'Meet with our experts in a private, secure office. We review your items initially to sort by metal type and karat. You are offered refreshments while you wait.' },
                  { num: '02', title: 'Scientific Evaluation', text: 'We utilize Olympus Vanta XRF analyzers to determine purity without scratching or damaging your items. For diamonds, we use GIA-standard magnification and thermal conductivity tests.' },
                  { num: '03', title: 'Live Market Valuation', text: 'We weigh your items on state-certified scales (you can see the display). We then calculate the value based on the real-time London Fix gold price, which you can track on our lounge monitors.' },
                  { num: '04', title: 'Immediate Payment', text: 'Once you accept our offer, we process payment immediately. Cash, wire transfer, or check—the choice is yours. We provide a full receipt and documentation for your records.' }
              ].map((step, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-16 mb-24 items-start border-l-2 border-gray-800 pl-10 md:pl-0 md:border-none relative">
                      <div className="hidden md:block absolute left-8 top-8 bottom-0 w-px bg-gray-800 -z-10"></div>
                      <div className="text-9xl font-serif text-gray-900 font-bold leading-none md:w-1/4 text-right">{step.num}</div>
                      <div className="md:w-3/4 bg-deep-charcoal p-12 rounded border border-gray-800 hover:border-gold/30 transition-all shadow-xl">
                          <h3 className="text-3xl font-serif text-gold mb-6">{step.title}</h3>
                          <p className="text-gray-300 text-lg leading-relaxed font-light">{step.text}</p>
                      </div>
                  </div>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div className="bg-deep-charcoal p-12 border border-gold/20">
                <h3 className="text-3xl font-serif text-white mb-6">Security Protocols</h3>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <ShieldCheckIcon className="w-8 h-8 text-gold mr-4 mt-1" />
                        <div>
                            <h4 className="text-white font-bold mb-1">ID Verification</h4>
                            <p className="text-gray-500 text-sm">We comply with all local laws requiring government-issued ID for transactions.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-8 h-8 mr-4 mt-1 border border-gold rounded-full flex items-center justify-center text-gold text-xs font-bold">24/7</div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Surveillance</h4>
                            <p className="text-gray-500 text-sm">All transactions are recorded in HD video for your safety and ours.</p>
                        </div>
                    </div>
                </div>
              </div>

              <div className="bg-deep-charcoal p-12 border border-gray-800">
                  <h3 className="text-3xl font-serif text-white mb-6">What to Bring</h3>
                  <ul className="space-y-4 text-gray-400">
                      <li className="flex items-center"><CheckIcon className="w-5 h-5 text-gold mr-3" /> Valid Government ID (Driver's License or Passport)</li>
                      <li className="flex items-center"><CheckIcon className="w-5 h-5 text-gold mr-3" /> The items you wish to sell</li>
                      <li className="flex items-center"><CheckIcon className="w-5 h-5 text-gold mr-3" /> Any original box or papers (increases value)</li>
                      <li className="flex items-center"><CheckIcon className="w-5 h-5 text-gold mr-3" /> Bank details (if you prefer Wire Transfer)</li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
  );
}

