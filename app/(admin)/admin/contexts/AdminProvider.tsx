import { createContext, useContext } from "react";
import { TTab } from "../interface";

type AdminContextType = {
  setActionButtons: (buttons: React.ReactNode[]) => void;
  setCurrentTab: React.Dispatch<React.SetStateAction<TTab>>;
};

export const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within AdminLayout");
  }

  return context;
};