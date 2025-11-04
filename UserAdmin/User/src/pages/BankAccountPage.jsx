import React, { useEffect } from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../components/Context/UserContext";
import Layout from "../components/layout/Layout";

export default function BankAccountPage() {
  
 const navigate = useNavigate();
 const {user}=useContext(UserDataContext)
  const accountActions = [
    {
      icon: "info-circle",
      title: "My Account Details",
      description: "View your current account information and status",
      action: "MyAccountDetails",
    },
    // {
    //   icon: "plus-circle",
    //   title: "Create Bank Account",
    //   description: "Open a new bank account or link an existing one",
    //   action: "createBankAccount",
    // },
    {
      icon: "money-bill-wave",
      title: "Add Money",
      description: "Deposit funds to your account",
      action: "addMoney",
    },
  ];

  const handleActionClick = (action) => {
    if (action === "MyAccountDetails") {
      navigate("/account-info");
    } else if (action === "addMoney") {
      navigate("/transfer-money");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Layout>
    <div>
      <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">
        User {user?.first || "raj"}'s Account
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {accountActions.map((action, index) => (
          <motion.div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleActionClick(action.action)}
          >
            <div className="text-primary mb-3">
              <i className={`fas fa-${action.icon} text-2xl`}></i>
            </div>
            <h3 className="text-lg font-medium mb-2">{action.title}</h3>
            <p className="text-neutral-600 text-sm">{action.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={handleBack}
          className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-2 px-4 rounded transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
    </Layout>
  );
}