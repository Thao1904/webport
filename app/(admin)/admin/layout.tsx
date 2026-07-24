"use client";

import AdminHeader from "@/component/admin/Header";
import React from "react";
import { TTab } from "./interface";
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
  const [actionButtons, setActionButtons] = React.useState<React.ReactNode[] | null>(null);

  return (
    <AdminContext.Provider value={{setActionButtons, setCurrentTab}}>
      <AdminHeader currentTab={currentTab} actionButtons={actionButtons}/>
      <div className="grid grid-cols-5">
        <AdminSidebar currentTab={currentTab}/>
        {children}
      </div>
    </AdminContext.Provider>
  );
}
