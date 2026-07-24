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
    title: "",
    short_description: "",
    content: "",
    thumbnail: "",
    password: "",
    ref_link: "",
    categories: ["1", "2"],
    is_public: false,
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
        title: "",
        short_description: "",
        content: "",
        thumbnail: "",
        password: "",
        ref_link: "",
        categories: [],
        is_public: false,
      })
    } else {
      const resJson = await res.json()
      console.log(resJson);
      
      alert("Error creating project: " + resJson.error)
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Create Project</h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Short Description"
          value={form.short_description}
          onChange={(e) =>
            setForm({ ...form, short_description: e.target.value })
          }
        />

        <input
          placeholder="Content"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <input
          placeholder="Thumbnail"
          value={form.thumbnail}
          onChange={(e) =>
            setForm({ ...form, thumbnail: e.target.value })
          }
        />

        <input
          placeholder="Password"
          // type="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          placeholder="Ref Link"
          value={form.ref_link}
          onChange={(e) =>
            setForm({ ...form, ref_link: e.target.value })
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