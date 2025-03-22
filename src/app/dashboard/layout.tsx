"use client"
import { useState } from "react";
import { UserSidebar } from "./sidebar/UserSidebar";
import { AdminSidebar } from "./sidebar/AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Layout for Dashboard
const LayoutDashboard = ({ children, isAdmin = false }: { children: React.ReactNode; isAdmin?: boolean; }) => {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const { user, users, token } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col lg:flex-row">
      {user && user.role=='admin' ? <AdminSidebar onSelectSection={setSelectedSection} /> : <UserSidebar onSelectSection={setSelectedSection} />}
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;