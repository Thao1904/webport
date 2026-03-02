'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const menuItems = [
  { label: 'ABOUT', href: '/about', size: 160, top: '18%', left: '58%', rotateDir: 1, delay: 0 },
  { label: 'ART CORNER', href: '/art-corner', size: 200, top: '20%', left: '22%', rotateDir: -1, delay: 0.15 },
  { label: 'PROJECTS', href: '/projects', size: 175, top: '55%', left: '55%', rotateDir: 1, delay: 0.3 },
  { label: 'EXPERIENCES', href: '/experiences', size: 145, top: '58%', left: '20%', rotateDir: -1, delay: 0.45 },
];

function CircleMenu({ item, scrollYProgress }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-10%' });

  // Scroll-driven rotate and scale
  const rotate = useTransform(scrollYProgress, [0, 1], [0, item.rotateDir * 180]);
  const scaleBase = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);

  // Secondary ring - counter rotate
  const counterRotate = useTransform(rotate, (r) => -r * 0.5);

  return (
    <motion.div
      ref={ref}
      className="absolute flex items-center justify-center"
      style={{
        top: item.top,
        left: item.left,
        transform: 'translate(-50%, -50%)',
        width: item.size,
        height: item.size,
        zIndex: 10,
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
      transition={{
        duration: 1.4,
        delay: item.delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Make the whole circle clickable */}
      <Link
        href={item.href}
        aria-label={item.label}
        className="absolute inset-0 rounded-full"
        style={{ cursor: 'pointer' }}
      >
        <span className="sr-only">{item.label}</span>
      </Link>

      {/* Outer ring - rotates on scroll */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: '1px solid rgba(255,255,255,0.25)',
          rotate,
          scale: scaleBase,
        }}
      />

      {/* Secondary ring - counter rotate */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: 8,
          border: '1px solid rgba(255,255,255,0.10)',
          rotate: counterRotate,
        }}
      />

      {/* Hover fill circle */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        animate={{
          scale: hovered ? 1 : 0.85,
          opacity: hovered ? 1 : 0,
          backgroundColor: hovered ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.00)',
        }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Center filled circle */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: item.size * 0.12,
          backgroundColor: 'rgba(80, 20, 20, 0.85)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Label */}
      <motion.span
        className="relative z-10 text-center font-light tracking-[0.25em] select-none pointer-events-none"
        style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: item.size * 0.075,
          letterSpacing: '0.2em',
        }}
        animate={{
          opacity: hovered ? 1 : 0.7,
          scale: hovered ? 1.05 : 1,
          color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.75)',
        }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        {item.label}
      </motion.span>
    </motion.div>
  );
}

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const bgRotate1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bgRotate2 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: '#1a0a0a',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* Background subtle texture circles */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: '50%',
          left: '50%',
          translate: '-50% -50%',
          border: '1px solid rgba(255,255,255,0.03)',
          rotate: bgRotate1,
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 700,
          height: 700,
          top: '50%',
          left: '50%',
          translate: '-50% -50%',
          border: '1px solid rgba(255,255,255,0.02)',
          rotate: bgRotate2,
        }}
      />

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: 'absolute',
          top: 28,
          left: 32,
          color: 'rgba(255,255,255,0.7)',
          fontSize: 14,
          fontWeight: 300,
          letterSpacing: '0.05em',
          fontFamily: 'Georgia, serif',
          zIndex: 20,
        }}
      >
        Thao Le
      </motion.div>

      {/* Status dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{
          position: 'absolute',
          top: 32,
          right: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 20,
        }}
      >
        <motion.div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'rgba(180,160,120,0.8)',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: '0.15em' }}>
          OPEN TO WORK
        </span>
      </motion.div>

      {/* Circle menu items */}
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {menuItems.map((item) => (
          <CircleMenu key={item.label} item={item} scrollYProgress={scrollYProgress} />
        ))}
      </div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.2)',
          fontSize: 10,
          letterSpacing: '0.3em',
          zIndex: 20,
        }}
      >
        UI / UX DESIGNER — PORTFOLIO
      </motion.div>
    </div>
  );
}