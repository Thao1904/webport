"use client";

import NavBar from "@/component/NavBar";
import NavigationDot from "@/component/NavigationDot";
import NormalDot from "@/component/NormalDot";
import React from "react";

const DOTS = 15;

export default function HomePage() {
  const [currentHovered, setCurrentHovered] = React.useState<string>("");

  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  const [dots, setDots] = React.useState<any[]>([]);

  const navDots = [
    { x: 800, y: 100 }, // about
    { x: 1000, y: 400 }, // art corner
    { x: 800, y: 700 }, // experiences
    { x: 300, y: 400 }, // projects
  ];

  React.useEffect(() => {
    const paddingX = 160;
    const paddingY = 160;
    const minDistance = 120;
    const navSafeDistance = 240; // 👈 adjust based on your nav dot size

    const width = window.innerWidth;
    const height = window.innerHeight;

    const newDots: any[] = [];

    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const maxAttempts = 100;

    for (let i = 0; i < DOTS; i++) {
      let attempts = 0;
      let valid = false;
      let x = 0;
      let y = 0;

      while (!valid && attempts < maxAttempts) {
        x = Math.random() * (width - paddingX * 2) + paddingX;
        y = Math.random() * (height - paddingY * 2) + paddingY;

        // ✅ Check distance with other normal dots
        const farFromDots = newDots.every((dot) => {
          return getDistance(x, y, dot.baseX, dot.baseY) >= minDistance;
        });

        // ✅ Check distance with navigation dots
        const farFromNavDots = navDots.every((nav) => {
          return getDistance(x, y, nav.x, nav.y) >= navSafeDistance;
        });

        valid = farFromDots && farFromNavDots;

        attempts++;
      }

      newDots.push({
        baseX: x,
        baseY: y,
        size: Math.random() * 20 + 10,
      });
    }

    setDots(newDots);
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const notHoverAbout = {
    "art corner": {
      x: 40,
      y: -80,
      scale: 0.8,
    },
    experiences: {
      x: -200,
      y: 40,
      scale: 0.8,
    },
    projects: {
      x: 150,
      y: -50,
      scale: 0.8,
    },
  };

  const notHoverArtCorner = {
    about: {
      x: 0,
      y: 100,
      scale: 0.8,
    },
    experiences: {
      x: 100,
      y: -100,
      scale: 0.8,
    },
    projects: {
      x: 100,
      y: -50,
      scale: 0.8,
    },
  };

  const notHoverExperiences = {
    about: {
      x: -200,
      y: 20,
      scale: 0.8,
    },
    "art corner": {
      x: -200,
      y: -100,
      scale: 0.8,
    },
    projects: {
      x: 80,
      y: 20,
      scale: 0.8,
    },
  };

  const notHoverProjects = {
    about: {
      x: 0,
      y: 0,
      scale: 0.8,
    },
    "art corner": {
      x: 20,
      y: -20,
      scale: 0.95,
    },
    experiences: {
      x: -50,
      y: 100,
      scale: 0.8,
    },
  };

  return (
    <div className="h-screen bg-secondary relative">
      <NavBar />
      {/* About */}
      <NavigationDot
        title={"about"}
        x={"800px"}
        y={"100px"}
        xHoveredAnimate={80}
        yHoveredAnimate={40}
        notHover={notHoverAbout}
        hovered={currentHovered}
        setHovered={setCurrentHovered}
        link="/about"
      />
      {/* Art Corner */}
      <NavigationDot
        title={"art corner"}
        x={"1000px"}
        y={"400px"}
        xHoveredAnimate={-40}
        yHoveredAnimate={-40}
        notHover={notHoverArtCorner}
        hovered={currentHovered}
        setHovered={setCurrentHovered}
        link="/art"
      />
      {/* Experiences */}
      <NavigationDot
        title={"experiences"}
        x={"800px"}
        y={"700px"}
        xHoveredAnimate={-40}
        yHoveredAnimate={-40}
        notHover={notHoverExperiences}
        hovered={currentHovered}
        setHovered={setCurrentHovered}
        link="/experiences"
      />
      {/* Projects */}
      <NavigationDot
        title={"projects"}
        x={"300px"}
        y={"400px"}
        xHoveredAnimate={40}
        yHoveredAnimate={-40}
        notHover={notHoverProjects}
        hovered={currentHovered}
        setHovered={setCurrentHovered}
        link="/projects"
      />
      {dots.map((dot, index) => {
        const dx = dot.baseX - mouse.x;
        const dy = dot.baseY - mouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        // movement intensity
        const force = Math.min(100 / distance, 5);

        const moveX = dot.baseX + dx * force * 0.5;
        const moveY = dot.baseY + dy * force * 0.5;

        return <NormalDot key={index} x={moveX} y={moveY} size={dot.size} />;
      })}
    </div>
  );
}
