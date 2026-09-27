import React from 'react';
import { splitFirstWord } from '@/utils/text';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
}

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  const { firstWord, rest } = splitFirstWord(title);

  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-forest text-white">
      {image && (
        <div className="absolute inset-0 z-0">
          <img src={image} alt={title} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest to-forest/50" />
        </div>
      )}
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        {eyebrow && (
          <span className="inline-block py-1 px-3 rounded-full bg-brand/20 text-brand border border-brand/30 text-sm font-semibold tracking-wider uppercase mb-6">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
          <span className="text-brand">{firstWord}</span> {rest}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-mist/80 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
