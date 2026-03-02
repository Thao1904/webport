'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NavItem({ label, index, href = '#' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.3 + index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {/* Make it navigable in Next.js */}
      <Link href={href} className="block cursor-pointer">
        <div className="flex items-center gap-6 py-8 border-b border-gray-200">
          {/* Number */}
          <motion.span
            className="text-sm font-light text-gray-400 w-8"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            0{index + 1}
          </motion.span>

          {/* Label */}
          <motion.span
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight"
            animate={{
              x: isHovered ? 20 : 0,
              letterSpacing: isHovered ? '0.05em' : '-0.02em',
            }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          >
            {label}
          </motion.span>

        

          {/* Geometric indicator */}
          <motion.div
            className="ml-auto flex items-center gap-4"
            animate={{ x: isHovered ? -10 : 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-black"
              animate={{
                scale: isHovered ? 1.5 : 1,
                opacity: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            />
            <motion.div
              className="w-12 h-[2px] bg-black origin-left"
              animate={{
                scaleX: isHovered ? 2 : 1,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            />
          </motion.div>
        </div>

        {/* Hover background */}
        <motion.div
          className="absolute inset-0 bg-gray-50 -z-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />
      </Link>
    </motion.div>
  );
}