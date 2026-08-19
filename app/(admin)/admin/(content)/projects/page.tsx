"use client";

import { useEffect, useState } from "react";
import ProjectList from "./components/ProjectList";
import CreateProjectModal from "./components/CreateProjectModal";
import { useAdmin } from "../../contexts/AdminProvider";
import AdminButton from "@/component/admin/Button";
import { useRouter } from "next/navigation";

const actionButtons = (router: ReturnType<typeof useRouter>) => [
  <AdminButton
    label="+ New Project"
    className="border bg-primary pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
    action={() => { router.push("/admin/projects/create")}}
  />,
];

export default function ProjectsPage() {
  const router = useRouter();
  const { setActionButtons, setCurrentHeader } = useAdmin();
  const [projects, setProjects] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");

    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setCurrentHeader("Projects")
    setActionButtons(actionButtons(router));
  }, []);
  return (
    <div className="pl-4">
      <h1>Projects</h1>

      <button onClick={() => setOpen(true)}>+ Add Project</button>

      <ProjectList projects={projects} />

      <CreateProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchProjects}
      />
    </div>
  );
}
