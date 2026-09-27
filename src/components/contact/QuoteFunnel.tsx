'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinationTags, tourThemes } from '@/types/content';
import { Check, ArrowRight, User } from 'lucide-react';

export default function QuoteFunnel() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', destination: '', dates: '', travellers: '2', budget: '', theme: '', message: ''
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    try {
      await fetch('/api/inquiries', { method: 'POST', body: JSON.stringify(formData) });
    } catch (error) {
      console.error(error);
    }
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[28px] shadow-xl border border-line overflow-hidden">
      {/* Progress Bar */}
      <div className="flex border-b border-line">
        {[1, 2, 3, 4].map((i) => (
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
              
              <div>
                <button onClick={handleNext} className="bg-brand text-white px-8 py-3 rounded-full font-bold hover:bg-forest transition-colors">
                  View Sample Quotes
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-3xl font-bold text-forest mb-2 font-display text-center">Your 3 Personalised Quotes</h2>
              <p className="text-center text-forest/70 mb-8">Select the package that best fits your travel style.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {['Essential', 'Premium', 'Luxury'].map((tier, idx) => (
                  <div key={tier} className={`border ${idx === 1 ? 'border-brand bg-brand/5' : 'border-line'} rounded-2xl p-6 text-center cursor-pointer hover:border-brand transition-colors`} onClick={handleNext}>
                    <h3 className="font-bold text-forest mb-2">{tier}</h3>
                    <p className="text-2xl font-bold text-brand mb-4">${(idx + 1) * 1500}</p>
                    <ul className="text-sm text-forest/70 space-y-2 mb-6">
                      <li>3/4 Star Hotels</li>
                      <li>Group Tours</li>
                      <li>Standard Transfers</li>
                    </ul>
                    <button className={`w-full py-2 rounded-full font-bold ${idx === 1 ? 'bg-brand text-white' : 'bg-sand text-forest'}`}>Select</button>
                  </div>
                ))}
              </div>
              <button onClick={handlePrev} className="text-forest/60 hover:text-forest font-medium">Back</button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-3xl font-bold text-forest mb-8 font-display text-center">Secure Your Booking</h2>
              {/* Payment Gateway mock would go here, we'll keep it simple for this component */}
              <div className="bg-sand p-8 rounded-2xl text-center mb-8 border border-line border-dashed">
                <p className="text-forest/70 mb-4">Payment integration simulation...</p>
                <div className="flex gap-4 justify-center">
                  <div className="w-16 h-10 bg-white rounded shadow" />
                  <div className="w-16 h-10 bg-white rounded shadow" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button onClick={handlePrev} className="text-forest/60 hover:text-forest font-medium">Back</button>
                <button className="bg-[#10B981] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#059669] transition-colors">
                  Pay Securely
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
