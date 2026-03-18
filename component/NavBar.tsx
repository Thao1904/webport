"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavItem from "./NavItem";

export default function NavBar() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const distance = 24;

  const positions = [
    { x: distance, y: distance },
    { x: -distance, y: distance },
    { x: distance, y: -distance },
    { x: -distance, y: -distance },
  ];

  const navItems = [
    { label: "About", path: "/about" },
    { label: "Project", path: "/project" },
    { label: "Experience", path: "/experience" },
    { label: "Art Corner", path: "/art-corner" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  // disable scroll when menu open
  useEffect(() => {
    document.body.style.overflow = clicked ? "hidden" : "auto";
  }, [clicked]);

  return (
    <>
      {/* Cursor follower */}
      <motion.div
        className="fixed w-4 h-4 rounded-full border border-black pointer-events-none z-100 mix-blend-difference"
        animate={{ x: cursorPos.x - 8, y: cursorPos.y - 8 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />

      {/* NAVBAR (always fixed) */}
      <div
        className={`fixed top-0 left-0 w-full z-50 flex justify-end ${clicked ? "px-10 py-10" : "px-8 py-8"}`}
        onMouseMove={handleMouseMove}
      >
        <div
          className="grid grid-cols-2 gap-2 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setClicked((prev) => !prev)}
        >
          {/* Dot */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`${
                clicked ? "w-2 h-2" : "w-4 h-4"
              } rounded-full bg-primary`}
              animate={{
                x: hovered && !clicked ? positions[i].x : 0,
                y: hovered && !clicked ? positions[i].y : 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* FULLSCREEN MENU OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: clicked ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 flex justify-center items-center lg:px-40 px-10 z-40 bg-secondary/60 backdrop-blur-md w-full ${clicked ? "pointer-events-auto" : "pointer-events-none"}`}
        onMouseMove={handleMouseMove}
      >
        <nav className="w-full">
          {navItems.map((item, index) => (
            <NavItem
              key={item.label}
              label={item.label}
              index={index}
              href={item.path}
            />
          ))}
        </nav>
      </motion.div>
    </>
  );
}
