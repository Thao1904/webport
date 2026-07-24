import { useAdmin } from "@/app/(admin)/admin/contexts/AdminProvider";
import {
  TTab,
  TTabContentTitle,
  TTabSiteTitle,
} from "@/app/(admin)/admin/interface";
import { tabMapping, tabTitleMapping } from "@/app/(admin)/admin/layout";
import {
  GlobeIcon,
  Heart,
  Info,
  LayoutDashboard,
  Rows3,
  Settings,
  Tag,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface TabProps {
  tabTitle: TTabContentTitle | TTabSiteTitle;
  isCurrent: boolean;
  Icon: React.ReactElement;
}

const Tab: React.FC<TabProps> = ({ tabTitle, isCurrent, Icon }) => {
  const { setCurrentTab } = useAdmin();
  const router = useRouter();

  const handleSelectTab = () => {
    router.push(`/admin/${tabTitleMapping[tabTitle]}`);
    setCurrentTab(tabTitleMapping[tabTitle]);
  };

  return (
    <div
      className={`${isCurrent ? "bg-primary" : "bg-secondary"} pl-4 py-2 hover:cursor-pointer`}
      onClick={handleSelectTab}
    >
      <h3
        className={`${isCurrent ? "text-secondary " : "text-primary opacity-50"} font-semibold flex items-center gap-2`}
      >
        {Icon}
        {tabTitle}
      </h3>
    </div>
  );
};

interface SidebarProps {
  currentTab: TTab;
}

const AdminSidebar: React.FC<SidebarProps> = ({ currentTab }) => {
  const tabsContentList: TTabContentTitle[] = [
    "Dashboard",
    "Projects",
    "Arts",
    "Categories",
    "Experiences",
    "About",
  ];
  const tabsSiteList: TTabSiteTitle[] = ["Social", "Settings"];

  const iconMapping = {
    Dashboard: <LayoutDashboard className="w-4 h-4" />,
    Projects: <Target className="w-4 h-4" />,
    Arts: <Heart className="w-4 h-4" />,
    Categories: <Tag className="w-4 h-4" />,
    Experiences: <Rows3 className="w-4 h-4" />,
    About: <Info className="w-4 h-4" />,
    Social: <GlobeIcon className="w-4 h-4" />,
    Settings: <Settings className="w-4 h-4" />,
  };

  return (
    <div className="bg-secondary pt-4 min-h-screen">
      <h3 className="text-primary text-xs opacity-30 pl-4 font-bold mb-2">
        CONTENT
      </h3>
      {tabsContentList.map((tabContent: TTabContentTitle) => (
        <Tab
          key={tabContent}
          tabTitle={tabContent}
          isCurrent={tabMapping[currentTab] === tabContent}
          Icon={iconMapping[tabContent]}
        />
      ))}
      <h3 className="text-primary text-xs opacity-30 pl-4 font-bold my-2">
        SITE
      </h3>
      {tabsSiteList.map((tabSite: TTabSiteTitle) => (
        <Tab
          key={tabSite}
          tabTitle={tabSite}
          isCurrent={tabMapping[currentTab] === tabSite}
          Icon={iconMapping[tabSite]}
        />
      ))}
    </div>
  );
};

export default AdminSidebar;
