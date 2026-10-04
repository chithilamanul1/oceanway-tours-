'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: ScrollRevealProps) {
  const directions = {
    up: { y: 25, x: 0 },
    down: { y: -25, x: 0 },
    left: { x: 15, y: 0 },
    right: { x: -15, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={`max-w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
