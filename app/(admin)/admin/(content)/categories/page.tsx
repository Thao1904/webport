"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAdmin } from "../../contexts/AdminProvider";

export default function CategoriesPage() {
  const { setActionButtons, setCurrentHeader } = useAdmin();
  const [form, setForm] = useState({
    name: "",
    color: "",
  });

  useEffect(() => {
    setCurrentHeader("Categories");
    setActionButtons([]);
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setForm({
        name: "", color: ""
      })
    } else {
      const resJson = await res.json()
      console.log(resJson);
      
      alert("Error creating category: " + resJson.error)
    }
  }
  return (
    <div className="pl-4 col-span-4">
      <h1>Categories</h1>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Color"
        value={form.color}
        onChange={(e) => setForm({ ...form, color: e.target.value })}
      />

      <div
        className="w-6 h-6 border-2 border-black"
        style={{ backgroundColor: form.color }}
      />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
