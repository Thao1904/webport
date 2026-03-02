'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Large circle - top right */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-gray-200"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Small filled circle */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full bg-black opacity-10"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Semicircle - bottom left */}
      <motion.div
        className="absolute bottom-20 left-10 w-32 h-16 bg-gray-100"
        style={{ borderTopLeftRadius: 100, borderTopRightRadius: 100 }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ring - center right */}
      <motion.div
        className="absolute top-1/2 right-10 w-20 h-20 rounded-full border-2 border-gray-200"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Dot grid - subtle */}
      <div className="absolute bottom-1/4 right-1/3 grid grid-cols-3 gap-3 opacity-20">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-black"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Large pill shape */}
      <motion.div
        className="absolute top-1/3 -left-10 w-40 h-8 rounded-full bg-gray-100"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}