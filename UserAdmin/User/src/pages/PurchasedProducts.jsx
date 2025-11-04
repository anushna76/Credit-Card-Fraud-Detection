import React, { useEffect } from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PurchasedProducts() {
  const navigate=useNavigate()

  // Mock purchases data
  const purchases = [
    {
      id: 1,
      name: "Premium Laptop",
      description: "High-performance laptop with 16GB RAM and 512GB SSD",
      amount: 75999,
      date: "15 May 2025",
      status: "Delivered",
      orderId: "#ORD-85967",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones",
      amount: 24999,
      date: "10 May 2025",
      status: "Delivered",
      orderId: "#ORD-85920",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      id: 3,
      name: "Smartwatch",
      description: "Advanced health monitoring and fitness tracking",
      amount: 18999,
      date: "5 May 2025",
      status: "Shipped",
      orderId: "#ORD-85890",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
  ];

  // Calculate total amount
  const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">
        Your Purchased Products
      </h1>
      
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-medium text-neutral-700">Purchase History</h3>
            <div className="text-right">
              <p className="text-neutral-600 mb-1">Total Purchases: <span className="font-medium">{purchases.length} items</span></p>
              <p className="text-neutral-600">Total Amount: <span className="font-medium text-primary">₹{totalAmount.toLocaleString()}</span></p>
            </div>
          </div>
          
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <motion.div 
                key={purchase.id}
                className="flex flex-col md:flex-row border border-neutral-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
              >
                <img src={purchase.image} alt={purchase.name} className="w-full md:w-48 h-48 object-cover" />
                <div className="p-4 flex-1">
                  <div className="flex flex-col md:flex-row justify-between mb-3">
                    <h4 className="font-medium text-neutral-800">{purchase.name}</h4>
                    <div className="mt-2 md:mt-0">
                      <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded">{purchase.status}</span>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm mb-3">{purchase.description}</p>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-auto">
                    <div>
                      <p className="text-xs text-neutral-500">Purchased on: <span className="text-neutral-700">{purchase.date}</span></p>
                      <p className="text-xs text-neutral-500">Order ID: <span className="text-neutral-700">{purchase.orderId}</span></p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <span className="text-lg font-semibold text-primary">₹{purchase.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-end">
        <button
          onClick={handleBack}
          className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-2 px-4 rounded transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}