"use client"

import { useEffect, useState } from "react"
import { useAdmin } from "../../contexts/AdminProvider"

export default function DashboardPage() {
  const { setActionButtons, setCurrentHeader } = useAdmin();

  useEffect(() => {
    setCurrentHeader("Dashboard")
    setActionButtons([])
  }, [])
  return (
    <div>
      
    </div>
  )
}