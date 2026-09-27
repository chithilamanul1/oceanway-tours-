'use client';

import React, { useState } from 'react';
import { CreditCard, Lock, Smartphone } from 'lucide-react';

export default function PaymentGateway() {
  const [method, setMethod] = useState<'card' | 'apple' | 'google'>('card');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-line overflow-hidden max-w-xl mx-auto">
      <div className="bg-sand p-6 border-b border-line flex gap-4">
        <button 
          onClick={() => setMethod('card')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
            method === 'card' ? 'bg-white shadow-sm text-brand border border-line' : 'text-forest/60 hover:bg-white/50'
          }`}
        >
          <CreditCard size={18} />
          Credit Card
        </button>
        <button 
          onClick={() => setMethod('apple')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
            method === 'apple' ? 'bg-white shadow-sm text-forest border border-line' : 'text-forest/60 hover:bg-white/50'
          }`}
        >
          <Smartphone size={18} />
          Digital Wallets
        </button>
      </div>

      <div className="p-6 md:p-8">
        {method === 'card' ? (
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-forest mb-1.5">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  className="w-full p-3 pl-10 rounded-xl border border-line bg-sand/30 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                />
                <CreditCard size={18} className="absolute left-3.5 top-3.5 text-forest/40" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-forest mb-1.5">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full p-3 rounded-xl border border-line bg-sand/30 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-1.5">CVV</label>
                <input 
                  type="text" 
                  placeholder="123" 
                  className="w-full p-3 rounded-xl border border-line bg-sand/30 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest mb-1.5">Name on Card</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full p-3 rounded-xl border border-line bg-sand/30 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>

            <button className="w-full bg-forest text-white py-4 rounded-xl font-bold mt-2 hover:bg-forest/90 transition-colors flex items-center justify-center gap-2">
              <Lock size={16} />
              Pay Securely
            </button>
          </form>
        ) : (
          <div className="space-y-4 py-4">
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-colors">
              Pay with Apple Pay
            </button>
            <button className="w-full bg-white text-forest border border-line py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sand transition-colors">
              Pay with Google Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
