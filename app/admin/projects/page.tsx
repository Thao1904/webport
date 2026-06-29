"use client"

import { useEffect, useState } from "react"
import ProjectList from "./components/ProjectList"
import CreateProjectModal from "./components/CreateProjectModal"

export default function ProjectsPage() {
  //init
  const [projects, setProjects] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  //function
  const fetchProjects = async () => {
    const res = await fetch("/api/projects")
    console.log();
    
    const data = await res.json()
    setProjects(data)
  }
  
  useEffect(() => {
    //This useEffect will just be executed 1 time when first load the component
    fetchProjects()
  }, [])
  
  useEffect(() => {
    //This useEffect will be executed when:
    // - First load component
    // - Value of dependencies change (Example: {open})
  }, [open])
  
  useEffect(() => {
    //This useEffect will be executed when:
    // - First load component
    // - Value of any variables change
  })

  return (
    <div style={{ padding: 20 }}>
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