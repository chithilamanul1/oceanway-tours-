'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, ChevronDown, Search, X } from 'lucide-react';
import { SUPPORTED_LANGUAGES, Language, DEFAULT_LANGUAGE } from '@/lib/languages';
import { setSiteLanguage, getCurrentLanguageCode } from './GoogleTranslateScript';

interface LanguageSelectorProps {
  variant?: 'topbar' | 'header' | 'mobile';
  className?: string;
}

export default function LanguageSelector({
  variant = 'header',
  className = '',
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState<string>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read active language on mount
    const code = getCurrentLanguageCode();
    setCurrentCode(code);

    // Sync when another selector instance changes the language
    const handleLangChange = (e: any) => {
      if (e.detail?.langCode) {
        setCurrentCode(e.detail.langCode);
      }
    };
    window.addEventListener('oceanway_language_change', handleLangChange);

    // Click outside listener
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('oceanway_language_change', handleLangChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeLang: Language =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentCode) || DEFAULT_LANGUAGE;

  const handleSelectLanguage = (code: string) => {
    setCurrentCode(code);
    setIsOpen(false);
    setSearchQuery('');
    setSiteLanguage(code);
  };

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((lang) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const matchesName = lang.name.toLowerCase().includes(q);
    const matchesNative = lang.nativeName.toLowerCase().includes(q);
    const matchesCode = lang.code.toLowerCase().includes(q);
    const matchesAlias = lang.aliases?.some(
      (a) => a.toLowerCase().includes(q) || q.includes(a.toLowerCase())
    );
    return matchesName || matchesNative || matchesCode || matchesAlias;
  });

  return (
    <div ref={dropdownRef} className={`relative notranslate ${className}`}>
      {/* Trigger Button based on Variant */}
      {variant === 'topbar' && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="hover:text-mint transition-colors flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full font-medium cursor-pointer"
          aria-expanded={isOpen}
          title="Change language / تغيير اللغة"
        >
          <span className="text-sm">{activeLang.flag}</span>
          <span>{activeLang.nativeName}</span>
          <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {variant === 'header' && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line hover:border-brand bg-sand/50 text-forest text-xs font-semibold transition-all hover:bg-white shadow-sm cursor-pointer"
          aria-expanded={isOpen}
          title="Change language (14 languages available)"
        >
          <Globe size={14} className="text-brand shrink-0" />
          <span className="text-sm leading-none">{activeLang.flag}</span>
          <span className="hidden sm:inline font-medium">{activeLang.nativeName}</span>
          <ChevronDown size={12} className={`text-charcoal/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {variant === 'mobile' && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-line bg-sand/30 hover:bg-sand text-forest text-sm font-semibold transition-colors"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2.5">
            <Globe size={16} className="text-brand" />
            <span>Language / ලැන්ග්වේජ් / لغة:</span>
          </div>
          <div className="flex items-center gap-1.5 text-brand font-bold">
            <span>{activeLang.flag}</span>
            <span>{activeLang.nativeName}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>
      )}

      {/* Dropdown Menu Modal */}
      {isOpen && (
        <div
          className={`absolute z-[100] mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-line p-4 transition-all duration-200 ${
            variant === 'mobile' ? 'left-0 right-0 max-w-full' : 'right-0'
          }`}
          style={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-brand" />
              <h4 className="text-sm font-bold text-forest">Choose Language (14 Available)</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-charcoal/40 hover:text-charcoal p-1 rounded-full hover:bg-sand transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search language / සොයන්න..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-sand/50 border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-brand focus:bg-white"
            />
          </div>

          {/* Quick Popular Picks */}
          {!searchQuery && (
            <div className="mb-3 pb-3 border-b border-line/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 block mb-1.5">
                Popular with Our Travelers
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORTED_LANGUAGES.filter((l) => l.popular).map((lang) => {
                  const isSelected = lang.code === currentCode;
                  return (
                    <button
                      key={`pop-${lang.code}`}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                        isSelected
                          ? 'bg-brand text-white border-brand shadow-xs'
                          : 'bg-sand/40 border-line hover:border-brand text-forest hover:bg-white'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Languages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
            {filteredLanguages.map((lang) => {
              const isSelected = lang.code === currentCode;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-brand text-white shadow-sm font-bold'
                      : 'hover:bg-sand/70 text-forest'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="text-lg leading-none shrink-0">{lang.flag}</span>
                    <div className="truncate">
                      <p className={`text-xs font-semibold leading-tight truncate ${isSelected ? 'text-white' : 'text-forest'}`}>
                        {lang.nativeName}
                      </p>
                      <p className={`text-[10px] leading-tight truncate ${isSelected ? 'text-white/80' : 'text-charcoal/60'}`}>
                        {lang.name}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check size={14} className="shrink-0 text-white ml-1" />}
                </button>
              );
            })}
          </div>

          {filteredLanguages.length === 0 && (
            <p className="text-xs text-center text-charcoal/50 py-4">No matching language found.</p>
          )}

          <div className="mt-3 pt-2.5 border-t border-line text-center">
            <p className="text-[10px] text-charcoal/60">
              Translates all tour packages, destinations, reviews & journal entries in real-time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
