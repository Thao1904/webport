"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../../contexts/AdminProvider";
import AdminButton from "@/component/admin/Button";
import RichTextEditor from "@/component/admin/TextEditor";

type ProjectForm = {
  title: string;
  short_description: string;
  content: string;
  thumbnail: string;
  password: string;
  ref_link: string;
  categories: string[];
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
    //kiem tra xem categories o trong form da co gia tri cua category ma dang select
    if (form.categories.includes(categoryId)) {
      //da ton tai => remove categoryId ra khoi form.categories
      setForm((prev) => ({
        ...prev,
        categories: prev.categories.filter((ele) => ele != categoryId),
      }));
    } else {
      //chua ton tai => them categoryId vao form.categories
      setForm((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryId],
      }));
    }
  };

  const handleSubmit = async (isPublish: boolean) => {
    const payload = { ...form, is_publish: isPublish }

    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      alert("Create Project Successfully")
      setForm({
        title: "",
        short_description: "",
        content: "",
        thumbnail: "",
        password: "",
        ref_link: "",
        categories: [],
        is_private: false,
      })
    } else {
      const resJson = await res.json()
      console.log(resJson);
      
      alert("Error creating project: " + resJson.error)
    }
  };

  const handleSetContent = (content: string) => {
    setForm((prev) => ({...prev, content: content }))
  }

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
      <div className="grid grid-cols-1 gap-4 my-4">
        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="input"
          placeholder="Short description"
          value={form.short_description}
          onChange={(e) =>
            setForm({ ...form, short_description: e.target.value })
          }
        />
        <input
          className="input"
          placeholder="Thumbnail"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
        />
        <input
          className="input"
          placeholder="Project link"
          value={form.ref_link}
          onChange={(e) => setForm({ ...form, ref_link: e.target.value })}
        />
      </div>
      <div>
        Visibility
        <div className="flex gap-2">
          <p>Public</p>
          <input
            checked={form.is_private === false}
            type="radio"
            className="radio"
            onChange={() => setForm({ ...form, is_private: false })}
          />
        </div>
        <div className="flex gap-2">
          <p>Private</p>
          <input
            checked={form.is_private === true}
            type="radio"
            className="radio"
            onChange={() => setForm({ ...form, is_private: true })}
          />
        </div>
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={form.is_private === false}
        />
      </div>
      <RichTextEditor value={form.content} setValue={handleSetContent}/>
      <div className="flex gap-2">
        <AdminButton
          label="Save Draft"
          className="border pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
          action={() => {
            handleSubmit(false);
          }}
        />
        <AdminButton
          label="Publish"
          className="border bg-primary pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
          action={() => {
            handleSubmit(true);
          }}
        />
      </div>
    </div>
  );
}
