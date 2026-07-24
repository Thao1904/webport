'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';


type Artwork = {
  _id: string;
  title: string;
  medium: string;
  year: string;
  imageUrl: string;
};

type Position = {
  x: number;
  y: number;
};

type FloatingBallProps = {
  artwork: Artwork;
  targetX: number;
  targetY: number;
  index: number;
};


const BALL_SIZE = 160;
const PADDING = 20;

function computePositions(
  count: number,
  containerW: number,
  containerH: number
): Position[] {
  const zoneTop = containerH * 0.18;
  const zoneBottom = containerH * 0.82;
  const zoneLeft = PADDING + BALL_SIZE / 2;
  const zoneRight = containerW - PADDING - BALL_SIZE / 2;
  const zoneW = zoneRight - zoneLeft;
  const zoneH = zoneBottom - zoneTop;

  const positions: Position[] = [];
  const maxAttempts = 300;

  for (let i = 0; i < count; i++) {
    let placed = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = zoneLeft + Math.random() * zoneW;
      const y = zoneTop + Math.random() * zoneH;

      const tooClose = positions.some(
        (p) => Math.hypot(p.x - x, p.y - y) < BALL_SIZE + PADDING
      );

      if (!tooClose) {
        positions.push({ x, y });
        placed = true;
        break;
      }
    }

    if (!placed) {
      const cols = Math.ceil(Math.sqrt(count));
      const col = i % cols;
      const row = Math.floor(i / cols);
      const gx = zoneLeft + (col / cols) * zoneW + (zoneW / cols) * 0.5;
      const gy = zoneTop + (row / Math.ceil(count / cols)) * zoneH + 40;
      positions.push({ x: gx, y: gy });
    }
  }

  return positions;
}

function FloatingBall({
  artwork,
  targetX,
  targetY,
  index,
}: FloatingBallProps) {
  const floatX = (Math.random() - 0.5) * 14;
  const floatY = (Math.random() - 0.5) * 14;
  const duration = 3 + Math.random() * 2;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: targetX - BALL_SIZE / 2,
        top: targetY - BALL_SIZE / 2,
        width: BALL_SIZE,
        height: BALL_SIZE,
      }}
      initial={{ y: -(targetY + BALL_SIZE + 100), opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        x: [0, floatX, -floatX * 0.6, floatX * 0.4, 0],
      }}
      transition={{
        y: {
          delay: index * 0.12,
          duration: 0.9 + index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          delay: index * 0.12,
          duration: 0.9 + index * 0.05,
        },
        x: {
          delay: index * 0.12 + 0.9,
          duration,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        },
      }}
      className="group cursor-pointer"
    >
      <motion.div
        animate={{
          y: [0, floatY, -floatY * 0.8, floatY * 0.3, 0],
        }}
        transition={{
          delay: index * 0.12 + 0.9,
          duration,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
        className="w-full h-full"
      >
        <div
          className="w-full h-full rounded-full border border-gray-200 overflow-hidden relative hover:border-black transition-all duration-500 hover:shadow-xl"
          style={{ borderRadius: '50%' }}
        >
          <div className="absolute inset-0 bg-white" />

          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-0 group-hover:opacity-100 transition-all duration-500"
          />

          <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-all duration-500 rounded-full" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-sm font-medium group-hover:text-white transition-colors duration-500 leading-tight">
              {artwork.title}
            </h3>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 mt-1 transition-colors duration-500">
              {artwork.medium}
            </p>
            <span className="text-xs text-gray-300 group-hover:text-gray-400 mt-0.5 transition-colors duration-500">
              {artwork.year}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ArtCorner() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [arts, setArts] = useState<Artwork[]>([])

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDims({ w, h });
      setPositions(computePositions(arts.length, w, h));
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [arts.length]);


  const fetchArts = async () => {
    const res = await fetch("/api/arts")
    const data = await res.json()
    setArts(data)
  }

  useEffect(() => {
    fetchArts()
  }, [])
  console.log(arts)

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-sm text-gray-600 hover:text-black transition-colors">
              Projects
            </Link>
            <Link href="/experiences" className="text-sm text-gray-600 hover:text-black transition-colors">
              Experiences
            </Link>
            <Link href="/art-corner" className="text-sm text-black font-medium">
              Art Corner
            </Link>
          </nav>
        </div>
      </header>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <p className="text-xs text-gray-300 tracking-widest uppercase">Art Corner</p>
      </div>

      {positions.length > 0 && (
        <div style={{ width: dims.w, height: dims.h, position: 'relative' }}>
          {arts.map((art, index) => (
            <FloatingBall
              key={art._id}
              artwork={art}
              targetX={positions[index]?.x ?? dims.w / 2}
              targetY={positions[index]?.y ?? dims.h / 2}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}