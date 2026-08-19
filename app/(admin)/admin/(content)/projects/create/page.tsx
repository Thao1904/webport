"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../../contexts/AdminProvider";
import AdminButton from "@/component/admin/Button";

type ProjectForm = {
  title: string;
  short_description: string;
  content: string;
  thumbnail: string;
  password: string;
  ref_link: string;
  categories: string[];
  is_publish: boolean;
  is_private: boolean;
};

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
  const [form, setForm] = useState<ProjectForm>({
    title: "",
    short_description: "",
    content: "",
    thumbnail: "",
    password: "",
    ref_link: "",
    categories: [],
    is_publish: false,
    is_private: false,
  });

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

  const handleSelectCategory = (categoryId: any) => {
    if (form.categories.includes(categoryId)) {
      setForm((prev) => ({
        ...prev,
        categories: prev.categories.filter(
          (category) => category != categoryId,
        ),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryId],
      }));
    }
  };

  return (
    <div className="w-full bg-[#F5F5F5] col-span-4">
      <h2>Create Project</h2>
      <div>
        Categories
        <div className="flex gap-2">
          <p>Selected:</p>
          <div className="flex gap-2">
            {form.categories.map((categoryId) => (
              <p key={categoryId}>{categoryId}</p>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="border-2 border-black"
                style={{ backgroundColor: category.color }}
                onClick={() => handleSelectCategory(category._id)}
              >
                {category.name}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Short description"
        value={form.short_description}
        onChange={(e) =>
          setForm({ ...form, short_description: e.target.value })
        }
      />
      <input
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <input
        placeholder="Thumbnail"
        value={form.thumbnail}
        onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
      />
      <input
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        placeholder="Project link"
        value={form.ref_link}
        onChange={(e) => setForm({ ...form, ref_link: e.target.value })}
      />

      <div>
        Visibility
        <div className="flex gap-2">
          <p>Public</p>
          <input
            checked={form.is_publish === true}
            type="radio"
            name="radio-1"
            className="radio"
            onClick={() => setForm({ ...form, is_publish: true })}
          />
        </div>
        <div className="flex gap-2">
          <p>Private</p>
          <input
            checked={form.is_publish === false}
            type="radio"
            name="radio-1"
            className="radio"
            onClick={() => setForm({ ...form, is_publish: false })}
          />
        </div>
      </div>
    </div>
  );
}
// title: {required: true, type: String},
//     short_description: {required: true, type: String},
//     content: {required: true, type: String}, //html => covert string => save to db
//     thumbnail: {required: true, type: String}, //upload cloud -> get public_url -> thumbnail = public_url => save to db
//     password: {required: false, type: String},
//     ref_link: {required: false, type: String},
//     categories: {required: true, type: [Schema.Types.ObjectId], ref: "Category"},
//     viewed: {required: false, type: Number, default: 0},
//     is_publish: {required: false, type: Boolean, default: true},
//     is_private: {required: false, type: Boolean, default: false}
