'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from './Icons';

interface TransportRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransportRequestModal: React.FC<TransportRequestModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupAddress: '',
    estimatedValue: '',
    itemDescription: '',
    preferredDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const response = await fetch('/api/transport-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          pickupAddress: '',
          estimatedValue: '',
          itemDescription: '',
          preferredDate: '',
          notes: ''
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting transport request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-deep-charcoal border border-gold/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-deep-charcoal border-b border-gray-800 p-6 flex justify-between items-center">
                <h2 className="text-3xl font-serif text-white">Request Secure Transport</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>

              {submitSuccess ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4">Request Submitted!</h3>
                  <p className="text-gray-400">We'll contact you shortly to arrange your secure transport.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="bg-black/30 p-4 border border-gray-800 mb-6">
                    <p className="text-sm text-gray-400">
                      For transactions exceeding $100,000, we provide complimentary secure transport from your location to ours via Brinks or Dunbar Armored.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Estimated Value *</label>
                      <input
                        type="text"
                        name="estimatedValue"
                        value={formData.estimatedValue}
                        onChange={handleChange}
                        placeholder="$100,000+"
                        required
                        className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Pickup Address *</label>
                    <textarea
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Item Description</label>
                    <textarea
                      name="itemDescription"
                      value={formData.itemDescription}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Brief description of items to be transported"
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Preferred Date</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any special instructions or requirements"
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-800">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors uppercase tracking-widest text-sm font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gold hover:bg-white hover:text-black text-black transition-colors uppercase tracking-widest text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

