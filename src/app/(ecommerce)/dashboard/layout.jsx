import React from "react";
import Sidebar from "../../../components/Sidebar";
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
