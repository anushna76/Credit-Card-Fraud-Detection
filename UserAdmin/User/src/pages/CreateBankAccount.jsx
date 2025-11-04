import React, { useEffect, useState } from "react";


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../components/Context/UserContext";
import { useContext } from "react";

export default function CreateBankAccount() {
 
    const {user}=useContext(UserDataContext)
  
  // Form state
  const [bankName, setBankName] = useState("Indian Bank");
  const [accountName, setAccountName] = useState(user?.first || "raj");
  const [nickName, setNickName] = useState("");
  const [address, setAddress] = useState("SomarampetBamjepally,Marrthanda");
  const [creditLimit, setCreditLimit] = useState("");
  const [cashLimit, setCashLimit] = useState("");
  const [errors, setErrors] = useState({});
  const navigate=useNavigate()


  // Redirect to login if not authenticated


  const validateForm = () => {
    const newErrors = {};
    if (!bankName) newErrors.bankName = "Bank name is required";
    if (!accountName) newErrors.accountName = "Account name is required";
    if (!nickName) newErrors.nickName = "Nick name is required";
    if (!creditLimit) newErrors.creditLimit = "Credit limit is required";
    if (!cashLimit) newErrors.cashLimit = "Cash limit is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Bank Account Request Sent",
        description: "Your bank account request has been submitted successfully.",
      });
      
      // Navigate back to dashboard after submission
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    navigate("/bank-account");
  };

  return (
    <div>
      <h1 className="text-2xl text-amber-500 md:text-3xl font-light text-primary mb-6">Create Bank Account</h1>
      
      <motion.div
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} id="createBankAccountForm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="bankName">
                Bank Name (required)
              </label>
              <input
                id="bankName"
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
              />
              {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="accountName">
                Account Name (required)
              </label>
              <input
                id="accountName"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter account name"
              />
              {errors.accountName && <p className="text-red-500 text-sm mt-1">{errors.accountName}</p>}
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="nickName">
                Nick Name (required)
              </label>
              <input
                id="nickName"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter nickname"
              />
              {errors.nickName && <p className="text-red-500 text-sm mt-1">{errors.nickName}</p>}
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter address"
              />
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="creditLimit">
                Credit Limit (required)
              </label>
              <input
                id="creditLimit"
                type="number"
                value={creditLimit}
                onChange={(e) => setCreditLimit(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter credit limit"
              />
              {errors.creditLimit && <p className="text-red-500 text-sm mt-1">{errors.creditLimit}</p>}
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="cashLimit">
                Cash Limit (required)
              </label>
              <input
                id="cashLimit"
                type="number"
                value={cashLimit}
                onChange={(e) => setCashLimit(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter cash limit"
              />
              {errors.cashLimit && <p className="text-red-500 text-sm mt-1">{errors.cashLimit}</p>}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-amber-600  cursor-pointer hover:bg-opacity-90 text-white py-2 px-6 rounded focus:outline-none transition"
            >
              Send Request
            </button>
            
            <button
              type="button"
              onClick={handleBack}
              className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-2 px-4 rounded transition"
            >
              Back
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}