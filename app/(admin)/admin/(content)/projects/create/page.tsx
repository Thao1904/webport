"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../../contexts/AdminProvider";
import AdminButton from "@/component/admin/Button";

const actionButtons = [
  <AdminButton
    label="Preview"
    className="border pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
    action={() => {}}
  />,
  <AdminButton
    label="Save Draft"
    className="border pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
    action={() => {}}
  />,
  <AdminButton
    label="Publish"
    className="border bg-primary pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
    action={() => {}}
  />,
];

export default function CreateProjectPage() {
  const { setActionButtons, setCurrentHeader } = useAdmin();
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");

    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    setCurrentHeader("Project Editor");
    setActionButtons(actionButtons);
    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-[#F5F5F5] col-span-4">
      <h2>Create Project</h2>
      <div>
        Categories
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              className="border-2 border-black"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
