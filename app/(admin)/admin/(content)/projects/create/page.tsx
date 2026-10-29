
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

type ProjectErrors = Partial<Record<keyof ProjectForm, string>>;

type Category = {
  _id: string;
  name: string;
  color: string;
};

const INITIAL_FORM: ProjectForm = {
  title: "",
  short_description: "",
  content: "",
  thumbnail: "",
  password: "",
  ref_link: "",
  categories: [],
  is_private: false,
};

// Validate absolute HTTP/HTTPS URLs.
const validateUrl = (value: string): boolean => {
  try {
    const url = new URL(value);

    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      !!url.hostname
    );
  } catch {
    return false;
  }
};

// Extract meaningful text from HTML content.
const getPlainText = (html: string): string => {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;|&#xA0;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .trim();
};

const validateProjectForm = (
  form: ProjectForm
): ProjectErrors => {
  const errors: ProjectErrors = {};

  // Title
  if (!form.title.trim()) {
    errors.title = "Title is required.";
  } else if (form.title.trim().length > 150) {
    errors.title = "Title must not exceed 150 characters.";
  }

  // Short description
  if (!form.short_description.trim()) {
    errors.short_description = "Short description is required.";
  } else if (form.short_description.trim().length > 300) {
    errors.short_description =
      "Short description must not exceed 300 characters.";
  }

  // Thumbnail
  if (!form.thumbnail.trim()) {
    errors.thumbnail = "Thumbnail URL is required.";
  } else if (!validateUrl(form.thumbnail.trim())) {
    errors.thumbnail =
      "Please enter a valid HTTP or HTTPS URL.";
  }

  // Reference link is optional.
  if (
    form.ref_link.trim() &&
    !validateUrl(form.ref_link.trim())
  ) {
    errors.ref_link =
      "Please enter a valid HTTP or HTTPS URL.";
  }

  // Categories
  if (form.categories.length === 0) {
    errors.categories =
      "Please select at least one category.";
  }

  // Rich-text content
  if (!getPlainText(form.content)) {
    errors.content = "Project content is required.";
  }

  // Private project password
  if (form.is_private && !form.password.trim()) {
    errors.password =
      "Password is required for private projects.";
  } else if (
    form.is_private &&
    form.password.trim().length < 6
  ) {
    errors.password =
      "Password must be at least 6 characters.";
  }

  return errors;
};

const FieldError = ({
  message,
}: {
  message?: string;
}) => {
  if (!message) return null;

  return (
    <p
      className="mt-1 text-sm text-red-600"
      role="alert"
    >
      {message}
    </p>
  );
}

export default function CreateProjectPage() {
  const { setActionButtons, setCurrentHeader } = useAdmin();

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProjectForm>({
    ...INITIAL_FORM,
  });
  const [errors, setErrors] = useState<ProjectErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  // Fetch categories from the API.
  useEffect(() => {
    setCurrentHeader("Project Editor");

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");

        if (!res.ok) {
          throw new Error("Failed to load categories.");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid categories response.");
        }

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, [setCurrentHeader]);

  // Update a field and clear its validation error.
  const updateField = <K extends keyof ProjectForm>(
    field: K,
    value: ProjectForm[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  // Select or deselect a category.
  const handleSelectCategory = (categoryId: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));

    setErrors((prev) => ({
      ...prev,
      categories: undefined,
    }));
  };

  // Update rich-text content.
  const handleSetContent = (content: string) => {
    setForm((prev) => ({
      ...prev,
      content,
    }));

    setErrors((prev) => ({
      ...prev,
      content: undefined,
    }));
  };

  // Validate and submit the form.
  const handleSubmit = async (isPublish: boolean) => {
    if (isSubmitting) return;

    const validationErrors = validateProjectForm(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        title: form.title.trim(),
        short_description: form.short_description.trim(),
        thumbnail: form.thumbnail.trim(),
        ref_link: form.ref_link.trim(),
        password: form.is_private ? form.password : "",
        is_publish: isPublish,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          resJson.error || "Failed to create project."
        );
      }

      alert(
        isPublish
          ? "Project published successfully!"
          : "Project draft saved successfully!"
      );

      setForm({ ...INITIAL_FORM });
      setErrors({});
    } catch (error) {
      console.error("Error creating project:", error);

      alert(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keep the admin action buttons synchronized with submission state.
  useEffect(() => {
    setActionButtons([
      <AdminButton
        key="preview"
        label="Preview"
        className="border pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
        action={() => {
          const validationErrors = validateProjectForm(form);
          setErrors(validationErrors);

          if (Object.keys(validationErrors).length === 0) {
            alert("Form is valid and ready to preview.");
          }
        }}
      />,
      <AdminButton
        key="draft"
        label={isSubmitting ? "Saving..." : "Save Draft"}
        className="border pl-2 pr-6 py-1 text-secondary font-semibold text-sm"
        action={() => handleSubmit(false)}
      />,
      <AdminButton
        key="publish"
        label={isSubmitting ? "Publishing..." : "Publish"}
        className="border bg-primary pl-2 pr-6 py-1 text-secondary font-semibold text-sm"
        action={() => handleSubmit(true)}
      />,
    ]);
  }, [form, isSubmitting, setActionButtons]);

  return (
    <div className="w-full min-h-screen bg-[#F5F5F5] col-span-4 p-4">
      <h2 className="text-xl font-semibold mb-6">
        Create Project
      </h2>

      {/* Categories */}
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm font-medium">
            Selected:
          </span>

          {form.categories.length > 0 ? (
            form.categories.map((categoryId) => {
              const category = categories.find(
                (item) => item._id === categoryId
              );

              return (
                <span
                  key={categoryId}
                  className="rounded px-2 py-1 text-sm border"
                  style={{
                    backgroundColor: category?.color || "#eee",
                  }}
                >
                  {category?.name || categoryId}
                </span>
              );
            })
          ) : (
            <span className="text-sm text-gray-500">
              No categories selected
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = form.categories.includes(
              category._id
            );

            return (
              <button
                key={category._id}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  handleSelectCategory(category._id)
                }
                className={`border-2 rounded px-3 py-2 text-sm transition ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-200"
                    : "border-black/20 hover:border-black"
                }`}
                style={{
                  backgroundColor: category.color || "#fff",
                }}
              >
                {category.name}
                {isSelected ? " ✓" : ""}
              </button>
            );
          })}
        </div>

        <FieldError message={errors.categories} />

        {categoryError && (
          <p className="mt-1 text-sm text-red-600">
            {categoryError}
          </p>
        )}
      </section>

      {/* Project information */}
      <section className="grid grid-cols-1 gap-4 my-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title *
          </label>
          <input
            className="input w-full"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
            maxLength={150}
            aria-invalid={!!errors.title}
          />
          <FieldError message={errors.title} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Short description *
          </label>
          <textarea
            className="input w-full"
            placeholder="Short description"
            value={form.short_description}
            onChange={(e) =>
              updateField(
                "short_description",
                e.target.value
              )
            }
            maxLength={300}
            rows={3}
            aria-invalid={!!errors.short_description}
          />
          <FieldError message={errors.short_description} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Thumbnail URL *
          </label>
          <input
            className="input w-full"
            type="url"
            placeholder="https://example.com/thumbnail.png"
            value={form.thumbnail}
            onChange={(e) =>
              updateField("thumbnail", e.target.value)
            }
            aria-invalid={!!errors.thumbnail}
          />
          <FieldError message={errors.thumbnail} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Project link
          </label>
          <input
            className="input w-full"
            type="url"
            placeholder="https://example.com (optional)"
            value={form.ref_link}
            onChange={(e) =>
              updateField("ref_link", e.target.value)
            }
            aria-invalid={!!errors.ref_link}
          />
          <FieldError message={errors.ref_link} />
        </div>
      </section>

      {/* Visibility */}
      <section className="mb-6">
        <h3 className="font-semibold mb-3">Visibility</h3>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visibility"
              className="radio"
              checked={!form.is_private}
              onChange={() => {
                updateField("is_private", false);
                updateField("password", "");
              }}
            />
            Public
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visibility"
              className="radio"
              checked={form.is_private}
              onChange={() =>
                updateField("is_private", true)
              }
            />
            Private
          </label>
        </div>

        {form.is_private && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Password *
            </label>
            <input
              className="input w-full"
              placeholder="At least 6 characters"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) =>
                updateField("password", e.target.value)
              }
              aria-invalid={!!errors.password}
            />
            <FieldError message={errors.password} />
          </div>
        )}
      </section>

      {/* Rich-text content */}
      <section className="mb-6">
        <h3 className="font-semibold mb-2">
          Project Content *
        </h3>

        <RichTextEditor
          value={form.content}
          setValue={handleSetContent}
          storageFolder="projects"
        />

        <FieldError message={errors.content} />
      </section>

      {/* Submit actions */}
      <div className="flex flex-wrap gap-2">
        <AdminButton
          label={isSubmitting ? "Saving..." : "Save Draft"}
          className="border pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
          action={() => handleSubmit(false)}
        />

        <AdminButton
          label={
            isSubmitting ? "Publishing..." : "Publish"
          }
          className="border bg-primary pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
          action={() => handleSubmit(true)}
        />
      </div>
    </div>
  );
}
