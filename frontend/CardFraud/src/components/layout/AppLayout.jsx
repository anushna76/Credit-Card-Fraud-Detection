
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Settings, LogOut } from "lucide-react";
import { AdminDataContext } from "../Context/AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const AppLayout = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin } = useContext(AdminDataContext);

  // Ensure adminData is always an object
  const adminData = Array.isArray(admin) ? admin[0] || {} : admin || {};
  console.log(adminData)
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
    toast.success("Logged out successfully");
  };

  // Navigation items
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" },
    { name: "User Authorization", path: "/user-authorisation", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 1 8 0 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" },
    { name: "Card Management", path: "/card-management", icon: "M1 4h22v16H1z M1 10h22" },
    { name: "Fraud Detection", path: "/dashboard", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { name: "Analytics", path: "/analytics", icon: "M12 20v-10 M18 20V4 M6 20v-4" },
    { name: "Customer Accounts", path: "/account", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 1 8 0" },
    { name: "Transactions", path: "/dashboard", icon: "M3 18v-6a9 9 0 0 1 18 0v6 M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 sticky top-0 h-screen flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
              IB
            </div>
            <h1 className="ml-2 text-xl font-semibold text-gray-800">
              {adminData.bankName || "Bank Name"}
            </h1>
          </div>
          {/* Logout Icon */}
          <button
            title="Logout"
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 ml-2"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-[calc(100%-2.5rem)] pb-5">
          <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center">
            <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
            <span className="text-sm">Card fraud detected #4209</span>
          </div>
          <div className="mt-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-sm font-medium text-red-700">
              {adminData.bankName ? adminData.bankName[0] : "RA"}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {adminData.email || "Email"}
              </p>
              <p className="text-xs text-gray-500">
                {adminData.bankName || "Bank Name"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50 z-10 px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded text-gray-600 hover:bg-gray-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button className="p-2 rounded text-gray-600 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
            </button>
            {/* Logout Icon in header (optional, can remove if only in sidebar) */}
            <button
              title="Logout"
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AppLayout;