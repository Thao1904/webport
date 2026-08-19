"use client";

import AdminHeader from "@/component/admin/Header";
import React from "react";
import { THeader, TTab } from "./interface";
import AdminSidebar from "@/component/admin/Sidebar";
import { AdminContext } from "./contexts/AdminProvider";

export const tabMapping = {
  dashboard: "Dashboard",
  projects: "Projects",
  arts: "Arts",
  categories: "Categories",
  experiences: "Experiences",
  about: "About",
  social: "Social",
  settings: "Settings",
  projects_create: "Project Editor"
};

export const tabTitleMapping: Record<string, TTab> = {
  "Dashboard": "dashboard",
  "Projects": "projects",
  "Arts": "arts",
  "Categories": "categories",
  "Experiences": "experiences",
  "About": "about",
  "Social": "social",
  "Settings": "settings",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentTab, setCurrentTab] = React.useState<TTab>("dashboard");
  const [currentHeader, setCurrentHeader] = React.useState<THeader>("Dashboard");
  const [actionButtons, setActionButtons] = React.useState<React.ReactNode[]>([]);

  return (
    <AdminContext.Provider value={{setActionButtons, setCurrentTab, setCurrentHeader}}>
      <AdminHeader currentHeader={currentHeader} currentTab={currentTab} actionButtons={actionButtons}/>
      <div className="grid grid-cols-5">
        <AdminSidebar currentTab={currentTab}/>
        {children}
      </div>
    </AdminContext.Provider>
  );
}
