"use client"

import { useState } from "react"

export default function CreateExperienceModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [form, setForm] = useState({
    jobTitle: "",
    year: "",
    position: "",
    shortDescription: "",
    responsibilities: "",
    achievements: "",
  })

  if (!open) return null

  const handleSubmit = async () => {
    const res = await fetch("/api/experiences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      onSuccess()
      onClose()
      setForm({
        jobTitle: "",
        year: "",
        position: "",
        shortDescription: "",
        responsibilities: "",
        achievements: "",
      })
    } else {
      const error = await res.json()
      alert(error?.error || "Error creating experience")
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Create Experience</h2>

        <input
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={(e) =>
            setForm({ ...form, jobTitle: e.target.value })
          }
        />

        <input
          placeholder="Year (e.g. 2024 - Present)"
          value={form.year}
          onChange={(e) =>
            setForm({ ...form, year: e.target.value })
          }
        />

        <input
          placeholder="Position (e.g. Junior)"
          value={form.position}
          onChange={(e) =>
            setForm({ ...form, position: e.target.value })
          }
        />

        <textarea
          placeholder="Short Description"
          value={form.shortDescription}
          onChange={(e) =>
            setForm({
              ...form,
              shortDescription: e.target.value,
            })
          }
          rows={3}
        />

        <textarea
          placeholder={`Responsibilities (mỗi dòng là 1 bullet)\nDeveloping responsive web applications\nCollaborating with designers`}
          value={form.responsibilities}
          onChange={(e) =>
            setForm({
              ...form,
              responsibilities: e.target.value,
            })
          }
          rows={6}
        />

        <textarea
          placeholder={`Achievements (mỗi dòng là 1 bullet)\nImproved UI consistency\nReduced page load time`}
          value={form.achievements}
          onChange={(e) =>
            setForm({
              ...form,
              achievements: e.target.value,
            })
          }
          rows={6}
        />

        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <button onClick={handleSubmit}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
}

const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
  width: 500,
}