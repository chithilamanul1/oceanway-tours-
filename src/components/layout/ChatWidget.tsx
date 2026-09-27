'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactInfo } from '@/data/siteContent';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-xl border border-line overflow-hidden"
          >
            <div className="bg-[#25D366] p-4 text-white">
              <h4 className="font-semibold text-lg">Chat with us</h4>
              <p className="text-white/80 text-sm">We typically reply within minutes.</p>
            </div>
            <div className="p-6 bg-sand min-h-[120px] flex items-center justify-center">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1DA851] transition-colors flex items-center gap-2 shadow-md"
              >
                <MessageCircle size={20} />
                Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
