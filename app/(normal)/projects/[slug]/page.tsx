"use client";

import NavBar from "@/component/NavBar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const params = useParams();
  const { slug } = params;
  const [project, setProject] = useState<any[]>([]);

  const fetchDetailProject = async () => {
    const res = await fetch("/api/projects/" + slug);
    const data = await res.json();
    setProject(data[0]);
  };

  useEffect(() => {
    fetchDetailProject();
  }, []);

  return (
    <div className="min-h-screen bg-secondary text-black">
      <NavBar />
    </div>
  );
}
