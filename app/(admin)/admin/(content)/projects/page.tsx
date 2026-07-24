"use client"

import { useEffect, useState } from "react"
import ProjectList from "./components/ProjectList"
import CreateProjectModal from "./components/CreateProjectModal"
import { useAdmin } from "../../contexts/AdminProvider"

const actionButtons = [
  <button>+ New Project</button>
]

export default function ProjectsPage() {
  const { setActionButtons } = useAdmin();
  const [projects, setProjects] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const fetchProjects = async () => {
    const res = await fetch("/api/projects")
    
    const data = await res.json()
    setProjects(data)
  }
  
  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    setActionButtons(actionButtons);
  }, [])

  return (
    <div className="pl-4">
      <h1>Projects</h1>

      <button onClick={() => setOpen(true)}>
        + Add Project
      </button>

      <ProjectList projects={projects} />

      <CreateProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchProjects}
      />
    </div>
  )
}