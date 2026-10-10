'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, MessageCircle, Info } from 'lucide-react';
import { contactInfo } from '@/data/siteContent';

interface PriceCalculatorProps {
  basePrice: number;
  itineraryId: string;
  itineraryTitle: string;
  destinationName?: string;
  duration?: number;
}

export default function PriceCalculator({
  basePrice,
  itineraryId,
  itineraryTitle,
  destinationName = 'Sri Lanka',
  duration = 7,
}: PriceCalculatorProps) {
  const [travelers, setTravelers] = useState<number>(2);

  const price = Number(basePrice) || 850;
  const totalPrice = price * travelers;

  const handleDecrement = () => {
    if (travelers > 1) {
      setTravelers(travelers - 1);
    }
  };

  const handleIncrement = () => {
    if (travelers < 30) {
      setTravelers(travelers + 1);
    }
  };

  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 50) {
      setTravelers(val);
    } else if (e.target.value === '') {
      setTravelers(1);
    }
  };

  // Preset quick buttons
  const presets = [
    { label: '1 Solo', count: 1 },
    { label: '2 Couple', count: 2 },
    { label: '4 Family', count: 4 },
    { label: '6 Group', count: 6 },
  ];

  // WhatsApp prefilled message
  const whatsappMsg = encodeURIComponent(
    `Hello OceanWay Tours! I would like to inquire about the "${itineraryTitle}" tour package for ${travelers} ${travelers === 1 ? 'person' : 'people'}. The estimated calculation is $${totalPrice.toLocaleString()} ($${price}/person). Could you please share the detailed quotation and availability?`
  );
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${whatsappMsg}`;

  // Contact quote link with query params
  const quoteUrl = `/contact?itinerary=${encodeURIComponent(itineraryId)}&title=${encodeURIComponent(itineraryTitle)}&travellers=${travelers}&destination=${encodeURIComponent(destinationName)}&total=${totalPrice}`;

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-b from-white to-sand/40 p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
            Interactive Price Calculator
          </span>
          <h3 className="text-lg font-bold text-forest font-display">
            Calculate Tour Cost
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-forest/60 uppercase tracking-wider block font-medium">Per Person Rate</span>
          <span className="text-lg font-extrabold text-forest">${price}</span>
          <span className="text-xs text-forest/60"> / person</span>
        </div>
      </div>

      {/* People Count Selector */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-forest flex items-center gap-1.5">
            <Users size={14} className="text-brand" />
            <span>Select Number of People / Travelers:</span>
          </label>
          <span className="text-xs font-medium text-forest/70">
            {travelers} {travelers === 1 ? 'Person' : 'People'}
          </span>
        </div>

        {/* Counter UI */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={travelers <= 1}
            className="w-11 h-11 rounded-xl bg-sand hover:bg-mist active:scale-95 border border-line flex items-center justify-center text-forest font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Decrease traveler count"
          >
            <Minus size={16} />
          </button>

          <div className="flex-1 relative">
            <input
              type="number"
              min={1}
              max={50}
              value={travelers}
              onChange={handleDirectInput}
              className="w-full h-11 text-center font-bold text-forest text-base rounded-xl border border-line bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand shadow-inner"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-forest/50 pointer-events-none">
              {travelers === 1 ? 'person' : 'people'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={travelers >= 50}
            className="w-11 h-11 rounded-xl bg-sand hover:bg-mist active:scale-95 border border-line flex items-center justify-center text-forest font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Increase traveler count"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {presets.map((preset) => (
            <button
              key={preset.count}
              type="button"
              onClick={() => setTravelers(preset.count)}
              className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                travelers === preset.count
                  ? 'bg-brand text-white border-brand shadow-sm'
                  : 'bg-white text-forest/80 border-line hover:bg-sand/60'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Price Calculation Box */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-forest to-[#0d2a4a] text-white p-5 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between text-xs text-white/70 mb-1">
          <span>Calculation:</span>
          <span>{travelers} {travelers === 1 ? 'person' : 'people'} × ${price}</span>
        </div>

        <div className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-3 mb-3">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 block">
              Total Package Estimate
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              ${totalPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-xs text-white/80 font-medium bg-white/10 px-2.5 py-1 rounded-full shrink-0">
            USD Total
          </span>
        </div>

        <p className="text-[11px] leading-relaxed text-white/80">
          Estimated price for <strong>{travelers} {travelers === 1 ? 'traveler' : 'travelers'}</strong> covering the full <strong>{duration}-day</strong> private tour.
        </p>
      </div>

      {/* Package Perks */}
      <div className="mt-5 space-y-2 text-xs text-forest/80">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
          <span>Private AC Vehicle with Dedicated Chauffeur Guide</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-amber-500 shrink-0" />
          <span>Handpicked Hotels & Daily Breakfast Included</span>
        </div>
        <div className="flex items-center gap-2">
          <Info size={14} className="text-sky-600 shrink-0" />
          <span>100% Tailor-Made: Adjust route, hotels & stops freely</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-6 space-y-2.5">
        <Link
          href={quoteUrl}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-forest hover:shadow-lg"
        >
          <span>Request Quote for {travelers} {travelers === 1 ? 'Person' : 'People'}</span>
          <ArrowRight size={16} />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-6 py-3 text-sm font-bold text-white transition-all shadow-sm"
        >
          <MessageCircle size={16} />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>

      <p className="mt-3 text-center text-[10px] text-charcoal/60">
        Prices adjust based on season and luxury hotel preferences. Final quote is 100% free with no obligation.
      </p>
    </div>
  );
}
