import React, { useEffect } from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useContext } from "react";
import { UserDataContext } from "../components/Context/UserContext";

export default function Dashboard() {
  const navigate=useNavigate()

  const {user}=useContext(UserDataContext)
  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  const featuredCards = [
    {
      icon: "credit-card",
      title: "Manage Cards",
      description: "View and manage your credit and debit cards securely.",
    },
    {
      icon: "shopping-cart",
      title: "Shop Online",
      description: "Browse and purchase products from our marketplace.",
    },
    {
      icon: "exchange-alt",
      title: "Transfer Money",
      description: "Easy and secure money transfers to your cards.",
    },
  ];

  const quickActions = [
    { icon: "plus-circle", label: "Request New Card", path: "/request-credit-card" },
    { icon: "money-bill-wave", label: "Add Money", path: "/transfer-money" },
    { icon: "search", label: "Shop Now", path: "/search-products" },
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (

    <Layout>
    <div>
  
      <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">
        Welcome User :: { user?.first||"raj"}
      </h1>
      
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Credit cards showcase image */}
        <img 
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80" 
          alt="Credit cards collection" 
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {featuredCards.map((card, index) => (
              <motion.div 
                key={index}
                className="bg-neutral-100 p-4 rounded-lg hover:shadow-md transition"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <i className={`fas fa-${card.icon} text-primary text-2xl mr-3`}></i>
                  <h3 className="font-medium text-lg">{card.title}</h3>
                </div>
                <p className="text-neutral-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="border-t border-neutral-200 pt-4">
            <h4 className="font-medium mb-3 text-neutral-700">Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`${
                    index === 0 
                      ? "bg-primary" 
                      : index === 1 
                      ? "bg-secondary" 
                      : "bg-neutral-700"
                  } text-white  cursor-pointer py-2 px-4 rounded hover:bg-opacity-90 transition`}
                  onClick={() => handleActionClick(action.path)}
                >
                  <i className={`fas fa-${action.icon} mr-2`}></i> {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </Layout>
  );
}