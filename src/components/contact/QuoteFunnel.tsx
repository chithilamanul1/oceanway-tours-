'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinationTags, tourThemes } from '@/types/content';
import { Check, ArrowRight, User } from 'lucide-react';

export default function QuoteFunnel() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', destination: '', dates: '', travellers: '2', budget: '', theme: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const dest = params.get('destination') || '';
      const travelersParam = params.get('travellers') || params.get('travelers') || '';
      const title = params.get('title') || '';
      const total = params.get('total') || '';

      if (dest || travelersParam || title) {
        setFormData((prev) => ({
          ...prev,
          destination: dest || prev.destination,
          travellers: travelersParam || prev.travellers,
          message: title 
            ? `Inquiring about package "${title}" for ${travelersParam || '2'} travelers${total ? ` (Calculated estimate: $${Number(total).toLocaleString()})` : ''}. ${prev.message}`
            : prev.message,
        }));
      }
    }
  }, []);

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      handleNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[28px] shadow-xl border border-line overflow-hidden">
      {/* Progress Bar */}
      <div className="flex border-b border-line">
        {[1, 2].map((i) => (
          <div key={i} className={`flex-1 h-2 ${i <= step ? 'bg-brand' : 'bg-line/30'} transition-colors duration-300`} />
        ))}
      </div>

      <div className="p-8 md:p-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-3xl font-bold text-forest mb-6 font-display">Let's Plan Your Trip</h2>
              <form onSubmit={submitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-forest mb-2">Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-xl border border-line bg-sand/50 focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-forest mb-2">Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-xl border border-line bg-sand/50 focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-forest mb-2">Destination</label>
                    <select required name="destination" value={formData.destination} onChange={handleChange} className="w-full p-3 rounded-xl border border-line bg-sand/50 focus:border-brand focus:ring-1 focus:ring-brand outline-none">
                      <option value="">Select Destination</option>
                      {destinationTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-forest mb-2">Interests</label>
                    <select name="theme" value={formData.theme} onChange={handleChange} className="w-full p-3 rounded-xl border border-line bg-sand/50 focus:border-brand focus:ring-1 focus:ring-brand outline-none">
                      <option value="">Select Theme</option>
                      {tourThemes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-forest mb-2">Additional Details</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full p-3 rounded-xl border border-line bg-sand/50 focus:border-brand focus:ring-1 focus:ring-brand outline-none" placeholder="Any specific requirements?" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-brand text-white px-8 py-3 rounded-full font-bold hover:bg-forest transition-colors flex items-center gap-2">
                    Submit Details <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-8">
              <div className="w-20 h-20 bg-[#10B981]/10 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} />
              </div>
              <h2 className="text-3xl font-bold text-forest mb-4 font-display">Details Received!</h2>
              <p className="text-forest/70 mb-8 max-w-md mx-auto">We're connecting you with a local destination expert to craft your perfect itinerary.</p>
              
              <div className="bg-sand p-6 rounded-2xl inline-block text-left mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-brand">
                    <User size={24} className="text-brand" />
                  </div>
                  <div>
                    <p className="font-bold text-forest">Sarah Jenkins</p>
                    <p className="text-sm text-forest/70">Senior Travel Consultant</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
