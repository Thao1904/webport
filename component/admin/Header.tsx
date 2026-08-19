import { THeader, TTab } from "@/app/(admin)/admin/interface";
import { tabMapping } from "@/app/(admin)/admin/layout";
import React from "react";

interface HeaderProps {
  currentHeader: THeader;
  currentTab: TTab;
  actionButtons: React.ReactNode[] | null;
}

const AdminHeader: React.FC<HeaderProps> = ({ currentHeader, actionButtons }) => {
  return (
    <div className="grid grid-cols-5 py-4 bg-white">
      <div></div>
      <div className="flex justify-between col-span-4 px-4">
        <h1 className="text-2xl font-bold text-black">
          {currentHeader}
        </h1>
        <div className="flex gap-2 items-center">
          {actionButtons?.map((ActionButton, index) => (
            <React.Fragment key={index}>{ActionButton}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
