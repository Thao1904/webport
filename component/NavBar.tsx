'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavItem from './NavItem';
import FloatingShapes from './FloatingShapes';

export default function NavBar() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Project', path: '/project' },
    { label: 'Experience', path: '/experience' },
    { label: 'Art Corner', path: '/art-corner'},
  ];

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="min-h-screen bg-white text-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <FloatingShapes />

      {/* Custom cursor follower */}
      <motion.div
        className="fixed w-4 h-4 rounded-full border border-black pointer-events-none z-50 mix-blend-difference"
        animate={{ x: cursorPos.x - 8, y: cursorPos.y - 8 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">


        {/* Navigation */}
        <nav className="mb-24">
          {navItems.map((item, index) => (
            <NavItem key={item.label} label={item.label} index={index} href={item.path} icon={item.icon} />
          ))}
        </nav>

       
      </div>
    </div>
  );
}