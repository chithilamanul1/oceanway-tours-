import React from 'react';
import { splitFirstWord } from '@/utils/text';

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
}

export default function SectionIntro({ eyebrow, title, children, align = 'center' }: SectionIntroProps) {
  const { firstWord, rest } = splitFirstWord(title);

  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}>
      {eyebrow && (
        <span className="inline-block py-1 px-3 rounded-full bg-sand text-brand text-sm font-semibold tracking-wider uppercase mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-forest mb-6">
        <span className="text-brand">{firstWord}</span> {rest}
      </h2>
      {children && (
        <div className="text-forest/70 text-lg leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
