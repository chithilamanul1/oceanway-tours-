'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function ReviewFilter() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleClick = (value: number) => {
    setRating(value);
    if (value === 5) {
      window.open('https://share.google/S6DsIzcQvoLdH3rYU', '_blank');
      setSubmitted(true);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-white/50 p-4 rounded-xl border border-line">
      {submitted ? (
        <p className="text-sm font-bold text-brand text-center">Thank you for your feedback! Submitted successfully.</p>
      ) : (
        <>
          <p className="text-sm font-bold text-forest">Rate your experience with us!</p>
          <div className="flex gap-1 cursor-pointer">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                size={24}
                className={`transition-colors ${
                  value <= (hoverRating || rating) ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-line'
                }`}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleClick(value)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
