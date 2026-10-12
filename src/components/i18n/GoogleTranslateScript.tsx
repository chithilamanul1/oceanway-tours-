'use client';

import React, { useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslateScript() {
  useEffect(() => {
    // 1. Initialize direction based on stored language (e.g. Arabic RTL)
    const stored = typeof window !== 'undefined' ? localStorage.getItem('oceanway_user_lang') : null;
    if (stored) {
      const match = SUPPORTED_LANGUAGES.find((l) => l.code === stored);
      if (match) {
        document.documentElement.dir = match.dir;
      }
    }

    // 2. Setup Google Translate Callback
    window.googleTranslateElementInit = function () {
      if (window.google && window.google.translate) {
        const langCodes = SUPPORTED_LANGUAGES.map((l) => l.code).join(',');
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: langCodes,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // 3. Inject Google Translate script if not present
    const SCRIPT_ID = 'google-translate-script';
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="google_translate_element" className="notranslate" style={{ display: 'none' }} />;
}

/**
 * Programmatically triggers Google Translate to translate the site
 * into one of the 14 supported languages.
 */
export function setSiteLanguage(langCode: string) {
  if (typeof window === 'undefined') return;

  const target = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  const dir = target?.dir || 'ltr';
  document.documentElement.dir = dir;

  const domain = window.location.hostname;

  if (langCode === 'en') {
    // Clear translation cookies
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
    localStorage.removeItem('oceanway_user_lang');
  } else {
    // Set translation cookies
    const cookieVal = `/en/${langCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${domain};`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domain};`;
    localStorage.setItem('oceanway_user_lang', langCode);
  }

  // Dispatch custom event to sync all UI selectors
  window.dispatchEvent(new CustomEvent('oceanway_language_change', { detail: { langCode } }));

  // Trigger Google Translate select element
  const select = document.querySelector<HTMLSelectElement>('#google_translate_element select');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  } else {
    // If widget not initialized yet, reload to let Google Translate read cookie
    window.location.reload();
  }
}

/**
 * Gets the current active language code from localStorage or cookies
 */
export function getCurrentLanguageCode(): string {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem('oceanway_user_lang');
  if (stored) return stored;

  const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
  if (match && match[1]) {
    return match[1];
  }

  return 'en';
}
