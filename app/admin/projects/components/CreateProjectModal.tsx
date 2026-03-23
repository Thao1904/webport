import { useState } from "react"

export default function CreateProjectModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    refLink: "",
  })

  if (!open) return null

  const handleSubmit = async () => {
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(form),
    })

    if (res.ok) {
      onSuccess()
      onClose()
      setForm({
        name: "",
        description: "",
        imageUrl: "",
        refLink: "",
      })
    } else {
      alert("Error creating project")
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Create Project</h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({ ...form, imageUrl: e.target.value })
          }
        />

        <input
          placeholder="Ref Link"
          value={form.refLink}
          onChange={(e) =>
            setForm({ ...form, refLink: e.target.value })
          }
        />

        <div style={{ marginTop: 10 }}>
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
}

const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
  width: 300,
}