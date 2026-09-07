"use client";

import NavBar from "@/component/NavBar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const params = useParams();
  const { slug } = params;
  const [project, setProject] = useState<any>();

  const fetchDetailProject = async () => {
    const res = await fetch("/api/projects/" + slug);
    const data = await res.json();
    setProject(data[0]);
  };

  useEffect(() => {
    fetchDetailProject();
  }, []);

  return (
    <div className="min-h-screen bg-secondary text-white">
      <NavBar />

      <main className="w-full px-4 pb-12 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pb-16 lg:px-12 lg:pt-32 xl:px-16">

        {/* PROJECT CONTENT */}
        <div className="mx-auto w-full max-w-[1600px]">

          <section className="grid grid-cols-1 gap-y-10 md:grid-cols-[210px_minmax(0,1fr)] md:gap-x-8 md:gap-y-0 lg:grid-cols-[240px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[260px_minmax(0,1fr)_minmax(0,1fr)] xl:gap-x-12">

            {/* COLUMN 1 — PROJECT INFO */}

            <aside className="w-full md:sticky md:top-28 md:self-start lg:top-32">

              {/* TITLE */}
              <h1 className="max-w-[280px] text-3xl font-semibold uppercase leading-[1.05] tracking-wide text-primary sm:text-4xl md:text-3xl lg:text-4xl">
                {project.title}
              </h1>


              {/* CATEGORY */}
              <p className="mt-5 text-sm leading-relaxed text-white/60 sm:mt-6 md:mt-7">
                {project.category}
              </p>


              {/* DESCRIPTION */}
              <p className="mt-4 max-w-[320px] text-sm leading-relaxed text-white/70 md:max-w-[210px] lg:max-w-[240px]">
                {project.short_description}
              </p>


              {/* VISIT PROJECT */}
              <a href={project.ref_link} className="mt-5 inline-block text-sm text-white transition-opacity duration-300 hover:opacity-50 sm:mt-6">
                Visit Project
              </a>

            </aside>


            {/* COLUMN 2 + 3 — CONTENT */}

            <div className="min-w-0 md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2">

              {/* THUMBNAIL — ALWAYS FIRST */}

              <div className="w-full overflow-hidden">
                <img src={project.thumbnail} alt={project.title} className="block h-auto w-full object-cover" />
              </div>


              {/* EDITOR CONTENT */}

              <div className="mt-5 w-full sm:mt-6 md:mt-7 lg:mt-8">
              </div>

            </div>

          </section>

        </div>


        <div className="mt-16 grid w-full grid-cols-5 items-center text-[10px] text-white/50 sm:mt-20 sm:text-xs md:mt-24 lg:mt-28">

          {/* PREVIOUS */}
          <motion.button
            className="justify-self-center whitespace-nowrap px-6 py-4 text-center font-light tracking-tight transition-colors duration-1000 hover:text-primary"
            whileHover={{ letterSpacing: "0.05em" }}
            whileTap={{ letterSpacing: "0.03em" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            Previous
          </motion.button>

          {/* DOT 1 */}
          <span className="h-1.5 w-1.5 justify-self-center rounded-full bg-primary" />

          {/* PROJECT */}
          <motion.button
            className="justify-self-center whitespace-nowrap px-6 py-4 text-center font-light tracking-tight transition-colors duration-1000 hover:text-primary"
            whileHover={{ letterSpacing: "0.05em" }}
            whileTap={{ letterSpacing: "0.03em" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            Project
          </motion.button>

          {/* DOT 2 */}
          <span className="h-1.5 w-1.5 justify-self-center rounded-full bg-primary" />

          {/* NEXT */}
          <motion.button
            className="justify-self-center whitespace-nowrap px-6 py-4 text-center font-light tracking-tight transition-colors duration-1000 hover:text-primary"
            whileHover={{ letterSpacing: "0.05em" }}
            whileTap={{ letterSpacing: "0.03em" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            Next
          </motion.button>

        </div>
      </main>
    </div>
  );
}

