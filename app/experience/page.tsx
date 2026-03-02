'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    id: 1,
    company: 'Tech Corp',
    role: 'Senior Developer',
    duration: '2024 - Present',
    description: 'Leading frontend development for enterprise applications.',
    responsibilities: [
      'Architecting scalable React applications',
      'Mentoring junior developers',
      'Implementing CI/CD pipelines',
      'Collaborating with design teams on UX improvements',
    ],
    achievements: [
      'Reduced load time by 40% through optimization',
      'Led migration to TypeScript across 3 major projects',
      'Received Employee of the Quarter award',
    ],
  },
  {
    id: 2,
    company: 'Design Studio',
    role: 'Full Stack Developer',
    duration: '2022 - 2024',
    description: 'Built custom web solutions for creative agencies.',
    responsibilities: [
      'Developing responsive web applications',
      'Managing database architecture',
      'Client communication and requirements gathering',
      'Code reviews and quality assurance',
    ],
    achievements: [
      'Delivered 15+ client projects on time',
      'Implemented automated testing reducing bugs by 60%',
      'Built internal tools saving 10 hours/week',
    ],
  },
  {
    id: 3,
    company: 'Startup Inc',
    role: 'Junior Developer',
    duration: '2020 - 2022',
    description: 'Contributed to early-stage product development.',
    responsibilities: ['Building UI components', 'Writing unit tests', 'Bug fixing and maintenance', 'Documentation'],
    achievements: [
      'Promoted within 8 months',
      'Contributed to successful Series A funding demo',
      'Open-sourced 2 internal libraries',
    ],
  },
  {
    id: 4,
    company: 'University Lab',
    role: 'Research Assistant',
    duration: '2018 - 2020',
    description: 'Conducted research in human-computer interaction.',
    responsibilities: [
      'Developing research prototypes',
      'Conducting user studies',
      'Data analysis and visualization',
      'Co-authoring research papers',
    ],
    achievements: ['Published 2 peer-reviewed papers', 'Presented at CHI conference', 'Received research excellence award'],
  },
];

function ExperienceCard({ experience, isExpanded, onToggle }) {
  return (
    <motion.div layout className="relative">
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 z-10" />

      {/* Card */}
      <div className={`ml-8 md:ml-0 ${experience.id % 2 === 0 ? 'md:mr-[52%]' : 'md:ml-[52%]'}`}>
        <motion.div
          layout
          onClick={onToggle}
          className="bg-white border border-gray-200 rounded-3xl p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <motion.div layout="position" className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-medium">{experience.company}</h3>
              <p className="text-gray-500 text-sm">{experience.role}</p>
            </div>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{experience.duration}</span>
          </motion.div>

          <motion.p layout="position" className="text-gray-600 text-sm mb-4">
            {experience.description}
          </motion.p>

          <motion.div layout="position" className="flex items-center gap-2 text-xs text-gray-400">
            <span>View details</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Responsibilities</h4>
                    <ul className="space-y-2">
                      {experience.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Achievements</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExperiencesPage() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleCard = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Next.js Link uses href (no createPageUrl) */}
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
            <Link href="/experiences" className="text-sm text-black font-medium">
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Experiences</h1>
            <p className="text-gray-500">My professional journey</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ExperienceCard
                    experience={experience}
                    isExpanded={expandedId === experience.id}
                    onToggle={() => toggleCard(experience.id)}
                  />
                </motion.div>
              ))}
            </div>
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