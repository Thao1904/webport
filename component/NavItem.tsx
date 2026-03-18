'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavItemProps {
  label: string,
  index: number,
  href: string
}

export default function NavItem({ label, index, href = '/#' }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
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
          {/* Circle */}
          <motion.div
              className="w-3 h-3 rounded-full bg-primary"
              animate={{
                scale: isHovered ? 1.5 : 1,
                opacity: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Label */}
          <motion.span
            className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight ease-out transition-colors duration-1000 ${isHovered ? "text-primary" : "text-white"}`}
            animate={{
              x: isHovered ? 20 : 0,
              letterSpacing: isHovered ? '0.05em' : '-0.02em',
            }}
            transition={{ duration: 1, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          >
            {label}
          </motion.span>

        

          {/* Geometric indicator */}
          {/* <motion.div
            className="ml-auto flex items-center gap-4"
            animate={{ x: isHovered ? -10 : 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-primary"
              animate={{
                scale: isHovered ? 1.5 : 1,
                opacity: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            />
            <motion.div
              className="w-12 h-[2px] bg-primary origin-left"
              animate={{
                scaleX: isHovered ? 2 : 1,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            />
          </motion.div> */}
        </div>

        {/* Hover background */}
        {/* <motion.div
          className="absolute inset-0 bg-gray-50 -z-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        /> */}
      </Link>
    </motion.div>
  );
}