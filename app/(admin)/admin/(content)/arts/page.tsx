"use client"

import { useEffect, useState } from "react"
import CreateArtModal from "./components/CreateArtModal"
import ArtList from "./components/ArtList"
import { IArt } from "@/server/models/Art"

export default function ArtsPage() {
  const [arts, setArts] = useState<IArt[]>([])
  const [open, setOpen] = useState(false)

  const fetchArts = async () => {
    const res = await fetch("/api/arts")
    const data = await res.json()
    setArts(data)
  }

  useEffect(() => {
    fetchArts()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Arts</h1>

      <button onClick={() => setOpen(true)}>
        + Add Art
      </button>

      <ArtList arts={arts} />

      <CreateArtModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchArts}
      />
    </div>
  )
}