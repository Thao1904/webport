"use client"

import { useEffect, useState } from "react"
import ExperienceList from "./components/ExperienceList"
import CreateExperienceModal from "./components/CreateExperienceModal"

type Experience = {
  _id: string
  jobTitle: string
  year: string
  position: string
  shortDescription: string
  responsibilities: string[]
  achievements: string[]
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [open, setOpen] = useState(false)

  const fetchExperiences = async () => {
    const res = await fetch("/api/experiences")
    const data = await res.json()
    setExperiences(data)
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Experiences</h1>

      <button onClick={() => setOpen(true)}>
        + Add Experience
      </button>

      <ExperienceList experiences={experiences} />

      <CreateExperienceModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchExperiences}
      />
    </div>
  )
}