import React from "react";
import Sidebar from "./Sidebar";


export default function Layout({ children }) {



  // If not authenticated and not on login page, only show children (login component)
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}