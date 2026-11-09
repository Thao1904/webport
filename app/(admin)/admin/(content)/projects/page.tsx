"use client";

import { useEffect, useState } from "react";
import ProjectList from "./components/ProjectList";
import { useAdmin } from "../../contexts/AdminProvider";
import AdminButton from "@/component/admin/Button";
import { useRouter } from "next/navigation";

const actionButtons = (router: ReturnType<typeof useRouter>) => [
  <AdminButton
    label="+ New Project"
    className="border bg-primary pl-2 pr-6 py-1 text-secondary font-semibold text-sm hover:cursor-pointer"
    action={() => {
      router.push("/admin/projects/create");
    }}
  />,
];

export default function ProjectsPage() {
  const router = useRouter();
  const { setActionButtons, setCurrentHeader } = useAdmin();
  const [projects, setProjects] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 2,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchProjects = async () => {
    const res = await fetch(
      `/api/projects?page=${pagination.page}&limit=${pagination.limit}`,
    );

    const data = await res.json();

    setProjects(data.projects);
    setPagination(data.pagination);
  };

  useEffect(() => {
    fetchProjects();
  }, [pagination.page]);

  useEffect(() => {
    setCurrentHeader("Projects")
    setActionButtons(actionButtons(router));
  }, []);
  return (
    <div className="pl-4 w-full col-span-4">
      <ProjectList
        projects={projects}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
