"use client"

import { useEffect, useState } from "react"
import { useAdmin } from "../../contexts/AdminProvider"

export default function DashboardPage() {
  const { setActionButtons } = useAdmin();

  useEffect(() => {
    setActionButtons([])
  }, [])
  return (
    <div>
      
    </div>
  )
}