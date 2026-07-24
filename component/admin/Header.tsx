import { TTab } from "@/app/(admin)/admin/interface";
import { tabMapping } from "@/app/(admin)/admin/layout";
import React from "react";

interface HeaderProps {
  currentTab: TTab;
  actionButtons: React.ReactNode[] | null;
}

const AdminHeader: React.FC<HeaderProps> = ({ currentTab, actionButtons }) => {
  return (
    <div className="grid grid-cols-5 my-4">
      <div></div>
      <div className="flex justify-between col-span-4 px-4">
        <h1 className="text-4xl font-bold text-black">
          {tabMapping[currentTab]}
        </h1>
        {actionButtons?.map((ActionButton, index) => (
          <React.Fragment key={index}>{ActionButton}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminHeader;
