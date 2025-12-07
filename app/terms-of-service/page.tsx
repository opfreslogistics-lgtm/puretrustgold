'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Terms of Service" subtitle="Legal Agreement" />
      
      <div className="max-w-4xl mx-auto px-4 py-32">
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-8">
          <section>
            <h2 className="text-3xl font-serif text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              By accessing and using PureTrust Gold's services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">2. Services Provided</h2>
            <p className="text-gray-400 leading-relaxed">
              PureTrust Gold provides professional appraisal and purchase services for precious metals, diamonds, and luxury items. Our services include:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Professional assay and valuation services</li>
              <li>Purchase of gold, silver, platinum, and palladium</li>
              <li>Purchase of diamonds and gemstones</li>
              <li>Secure transport services for high-value transactions</li>
              <li>Private consultation and appointment services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">3. Appointments and Transactions</h2>
            <p className="text-gray-400 leading-relaxed">
              All appointments are subject to availability. We reserve the right to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Request identification and verification documents</li>
              <li>Refuse service if items do not meet our criteria</li>
              <li>Modify or cancel appointments due to unforeseen circumstances</li>
              <li>Set minimum transaction values for certain services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">4. Pricing and Payment</h2>
            <p className="text-gray-400 leading-relaxed">
              All prices are based on current market rates and are subject to change. Final offers are determined after professional assay and evaluation. Payment methods include cash, certified check, or wire transfer, subject to transaction size and our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">5. Ownership and Authenticity</h2>
            <p className="text-gray-400 leading-relaxed">
              You represent and warrant that you are the lawful owner of all items presented for sale and have the right to sell them. We reserve the right to refuse any transaction if we suspect items are stolen, counterfeit, or obtained illegally.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-400 leading-relaxed">
              To the maximum extent permitted by law, PureTrust Gold shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the value of the transaction in question.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">7. Privacy and Confidentiality</h2>
            <p className="text-gray-400 leading-relaxed">
              We maintain strict confidentiality regarding all transactions and client information, subject to legal requirements. Please review our Privacy Policy for detailed information.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">8. Intellectual Property</h2>
            <p className="text-gray-400 leading-relaxed">
              All content on this website, including text, graphics, logos, and images, is the property of PureTrust Gold and is protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">9. Modifications to Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">10. Governing Law</h2>
            <p className="text-gray-400 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">11. Contact Information</h2>
            <p className="text-gray-400 leading-relaxed">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-deep-charcoal p-6 border border-gray-800 mt-4">
              <p className="text-white mb-2"><strong>PureTrust Gold</strong></p>
              <p className="text-gray-400">Email: vip@puretrustgold.com</p>
              <p className="text-gray-400">Phone: +1 (800) 555-GOLD</p>
              <p className="text-gray-400">Address: 100 Gold St, Suite 500, New York, NY 10038</p>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-800 mt-12">
            <p className="text-gray-500 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

