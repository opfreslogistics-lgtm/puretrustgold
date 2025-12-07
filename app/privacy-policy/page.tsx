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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Privacy Policy" subtitle="Your Privacy Matters" />
      
      <div className="max-w-4xl mx-auto px-4 py-32">
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-8">
          <section>
            <h2 className="text-3xl font-serif text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-400 leading-relaxed">
              At PureTrust Gold, we collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Information about items you wish to sell or have appraised</li>
              <li>Appointment scheduling information</li>
              <li>Payment and transaction information</li>
              <li>Communications with our team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-400 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Process and manage your appointments and transactions</li>
              <li>Communicate with you about your inquiries and services</li>
              <li>Provide customer support and respond to your requests</li>
              <li>Send you important updates about our services</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-400 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>With service providers who assist us in operating our business (e.g., secure transport services)</li>
              <li>When required by law or to protect our rights and safety</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">4. Data Security</h2>
            <p className="text-gray-400 leading-relaxed">
              We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">5. Your Rights</h2>
            <p className="text-gray-400 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Access and receive a copy of your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-400 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif text-white mb-4">8. Contact Us</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
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

