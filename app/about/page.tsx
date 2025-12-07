'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, ShieldCheckIcon, CheckIcon } from '@/components/Icons';

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

const ContentBlock: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-20">
        <h3 className="text-4xl font-serif text-white mb-8 border-b border-gray-800 pb-6">{title}</h3>
        <div className="text-gray-400 leading-relaxed text-xl font-light space-y-6">
            {children}
        </div>
    </div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Our Legacy" subtitle="Trust • Heritage • Excellence" />
      <div className="max-w-6xl mx-auto px-4 py-32">
        
        {/* Intro */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
             <p className="text-3xl text-white font-serif italic leading-relaxed">
                "We believe that selling precious assets should be as dignified and luxurious as buying them. It is not just a transaction; it is a transfer of legacy."
             </p>
             <p className="text-gold mt-6 font-bold uppercase tracking-widest text-sm">- James Sterling, Founder</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start mb-24">
             <div>
                <ContentBlock title="The History">
                    <p>Founded on the principles of absolute transparency and premium service, PureTrust Gold has established itself as the premier destination for selling high-value precious metals and diamonds.</p>
                    <p>What started as a private concierge service for estate liquidations has grown into an international network of secure buying offices. We recognized a gap in the market: the lack of a high-end, professional outlet for selling gold and diamonds that didn't feel like a pawn shop.</p>
                    <p>Today, we serve a global clientele ranging from private individuals to estate attorneys and wealth managers, handling millions in transactions monthly with the same discretion and care as day one.</p>
                </ContentBlock>
             </div>
             <div>
                 <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" alt="Meeting" className="rounded-lg shadow-2xl opacity-80 mb-8" />
                 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="High Rise" className="rounded-lg shadow-2xl opacity-60" />
             </div>
        </div>

        <div className="mt-16 bg-deep-charcoal p-16 rounded-sm border border-gray-800">
            <ContentBlock title="Our Sustainability Commitment">
                <p>PureTrust Gold is committed to the responsible sourcing and recycling of precious metals. By facilitating the secondary market for gold and diamonds, we reduce the need for new mining operations, which often have significant environmental impacts.</p>
                <p>Every piece we purchase is either refined back into pure bullion for investment markets or refurbished for a new life, contributing to a circular economy in the luxury sector.</p>
            </ContentBlock>
        </div>

        <div className="mt-24 mb-24">
             <h3 className="text-5xl font-serif text-white text-center mb-16">Leadership Team</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                 {[
                     { name: 'Marisol Santiago', role: 'Head Gemologist', img: 'https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/Marisol.png' },
                     { name: 'Javier Cruz', role: 'Senior Assayer', img: 'https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/Javier.png' },
                     { name: 'Adam Whitmore', role: 'Director of Operations', img: 'https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/Adam.png' }
                 ].map((member, i) => (
                     <div key={i} className="bg-deep-charcoal p-12 border border-gray-800 hover:border-gold transition-all group">
                         <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-2 border-gold grayscale group-hover:grayscale-0 transition-all" />
                         <h4 className="text-2xl text-white font-serif">{member.name}</h4>
                         <p className="text-gold text-xs uppercase tracking-widest mt-2">{member.role}</p>
                     </div>
                 ))}
             </div>
        </div>

        <ContentBlock title="Philanthropy">
            <p>We are proud to partner with global initiatives. A percentage of our annual yield is donated to "Gold for Good," an organization dedicated to cleaning up mercury pollution in artisanal mining communities.</p>
        </ContentBlock>
      </div>
    </div>
  );
}

