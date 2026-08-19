"use client"

import { useEffect, useState } from "react"
import CreateArtModal from "./components/CreateArtModal"
import ArtList from "./components/ArtList"
import { IArt } from "@/server/models/Art"
import { useAdmin } from "../../contexts/AdminProvider"
import AdminButton from "@/component/admin/Button"

const actionButtons = [
  <AdminButton label="+ New Artwork" redirectUrl="" />,
  <>a</>
]

export default function ArtsPage() {
  const { setActionButtons, setCurrentHeader } = useAdmin();
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

  useEffect(() => {
    setCurrentHeader("Arts")
    setActionButtons(actionButtons);
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