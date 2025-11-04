import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function Sidebar() {
 
 
  const [searchQuery, setSearchQuery] = useState("");
  const navigate=useNavigate()

  // Menu items change based on authentication status
  const menuItems = [
        { id: "home", label: "Home", icon: "home", path: "/dashboard" },
        { id: "profile", label: "View My Profile", icon: "user", path: "/profile" },
        { id: "bankAccount", label: "Manage Bank Account", icon: "university", path: "/bank-account" },
        { id: "requestCard", label: "Request Credit Card", icon: "credit-card", path: "/request-credit-card" },
        { id: "cardDetails", label: "View Credit Card Details", icon: "info-circle", path: "/credit-card-details" },
        { id: "transferMoney", label: "Transfer Money To Card", icon: "exchange-alt", path: "/transfer-money" },
        { id: "searchProducts", label: "Search For Products", icon: "search", path: "/search-products" },
        { id: "purchasedProducts", label: "View Purchased Products", icon: "shopping-bag", path: "/purchased-products" },
        { id: "logout", label: "Logout", icon: "sign-out-alt", path: "/" },
      ]
   

  const handleNavClick = (path, id) => {
    if (id === "logout") {
      localStorage.removeItem("token");
      navigate("/");
      toast.success("Logged out successfully");
      return
    }
    navigate(path);
  };

  return (
    <div className="w-full md:w-64 bg-white shadow-md md:min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">Sidebar Menu</h2>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search our site:"
            className="w-full py-2 pl-3 pr-10 rounded-full border border-neutral-300 focus:outline-none focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-2.5 text-neutral-500">
            <Search size={16} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <a
                  href={item.path}
                  className={`block py-2 px-4 rounded hover:bg-neutral-100 transition ${
                    location === item.path 
                      ? "text-primary bg-neutral-50" 
                      : "text-neutral-700 hover:text-primary"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path, item.id);
                  }}
                >
                  <i className={`fas fa-${item.icon} mr-2`}></i> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    
    </div>
  );
}