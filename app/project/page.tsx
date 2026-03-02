'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'clarity',
    name: 'Clarity',
    description: 'A minimalist task management app focused on simplicity and flow.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Real-time analytics dashboard for monitoring user engagement.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
  },
  {
    id: 'echo',
    name: 'Echo',
    description: 'Voice-first note-taking app with AI transcription.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&q=80',
  },
  {
    id: 'drift',
    name: 'Drift',
    description: 'Meditation and mindfulness platform with ambient soundscapes.',
    image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=400&q=80',
  },
  {
    id: 'forge',
    name: 'Forge',
    description: 'Design system toolkit for rapid prototyping.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80',
  },
  {
    id: 'bloom',
    name: 'Bloom',
    description: 'E-commerce platform for sustainable plant retailers.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
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
            <Link href="/projects" className="text-sm text-black font-medium">
              Projects
            </Link>
            <Link
              href="/experiences"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Experiences
            </Link>
            <Link href="/art-corner" className="text-sm text-gray-600 hover:text-black transition-colors">
              Art Corner
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Projects</h1>
            <p className="text-gray-500">Selected works</p>
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/project-detail?id=${project.id}`}
                  className="group block cursor-pointer"
                >
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border border-gray-200 overflow-hidden relative hover:border-black transition-all duration-500">
                    {/* Background Image - grayscale, visible on hover */}
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 224px, 256px"
                      className="object-cover grayscale opacity-0 group-hover:opacity-100 transition-all duration-500"
                      // optional; remove if you don't want it
                      priority={index < 3}
                    />

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-white group-hover:bg-black/60 transition-all duration-500" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 group-hover:text-white transition-colors duration-500">
                      <h3 className="text-xl font-medium mb-3">{project.name}</h3>
                      <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                        {project.description}
                      </p>
                      <ArrowUpRight className="w-4 h-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400 tracking-widest">© 2026</p>
      </footer>
    </div>
  );
}