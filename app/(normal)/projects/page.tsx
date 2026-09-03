'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import NavBar from '@/component/NavBar';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])

  const fetchProjects = async () => {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(data)
    }
  
    useEffect(() => {
      fetchProjects()
    }, [])
  
  return (
    <div className="min-h-screen bg-secondary text-black">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-primary">Projects</h1>
            {/* <p className="text-gray-500">Selected works</p> */}
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={"/projects/" + project.slug}
                  className="group block cursor-pointer"
                >
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border border-gray-200 overflow-hidden relative hover:border-black transition-all duration-500">
                    {/* Background Image - grayscale, visible on hover */}
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
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
                      <h3 className="text-xl font-medium mb-3">{project.title}</h3>
                      <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                        {project.short_description}
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