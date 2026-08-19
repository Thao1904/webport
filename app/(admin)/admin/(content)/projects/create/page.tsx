"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../../contexts/AdminProvider";
import AdminButton from "@/component/admin/Button";

const actionButtons = [
  <AdminButton
    label="Preview"
    className="border pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
    action={() => { }}
  />,
  <AdminButton
    label="Save Draft"
    className="border pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
    action={() => { }}
  />,
  <AdminButton
    label="Publish"
    className="border bg-primary pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
    action={() => { }}
  />,
];

export default function CreateProjectPage() {
  const { setActionButtons, setCurrentHeader } = useAdmin();
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState(
    {
      title: "",
      short_description: "",
      content: "",
      thumbnail: "",
      password: "",
      ref_link: "",
      categories: [],
      is_publish: false,
      is_private: false
    },


  );

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
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
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
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <input
        placeholder="Project link"
        value={form.ref_link}
        onChange={(e) =>
          setForm({ ...form, ref_link: e.target.value })
        }
      />
      

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