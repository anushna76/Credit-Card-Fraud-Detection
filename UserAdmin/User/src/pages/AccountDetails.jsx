import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../components/Context/UserContext";
import Layout from "../components/layout/Layout";
// Assuming you have an Auth context

export default function AccountDetails() {
  const navigate = useNavigate();
  // Fetch user data from Auth context
  const [loading, setLoading] = useState(false);
  const {user,accounts}=useContext(UserDataContext)


  const firstAccount = accounts && accounts.length > 0 ? accounts[0] : null;

const defaultUser = {
  firstName: user?.first || "raj",
  email: user?.email || "raj@example.com",
  lastName: user?.last || "Kumar",
  gender: user?.gender || "Male",
  phone: "+91 123-456-7890",
  address: user?.street || "123 Main St, Bangalore, India",
  dateOfBirth: user?.dob
    ? new Date(user.dob).toLocaleDateString("en-GB")
    : "1990-01-15",
  accountnumber: firstAccount?.accountNumber || "N/A",
  createdat: firstAccount?.createdAt
    ? new Date(firstAccount.createdAt).toLocaleDateString("en-GB")
    : "2023-05-10",
  zipcode: user?.zip || "503111",
  state: user?.state || "nizamabad",
  balance: firstAccount?.balance || "0",
};

  const userData = defaultUser;

  // Animation variants for smooth transitions
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-neutral-600">Loading...</div>
      </div>
    );
  }

  return (
    <Layout>   <div className="p-6 max-w-4xl mx-auto">
      <motion.h1
        className="text-2xl md:text-3xl font-light text-primary mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Account Details
      </motion.h1>

      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80"
            alt="Account details background"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <h2 className="absolute bottom-4 left-4 text-white text-2xl font-medium">
            {userData.firstName} {userData.lastName}
          </h2>
        </div>

        {/* Account Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={cardVariants} whileHover="hover">
              <h3 className="text-lg font-medium text-neutral-700 mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p className="text-neutral-600">
                  <span className="font-medium">First Name:</span> {userData.firstName}
                
                </p>
                 <p className="text-neutral-600">
                  <span className="font-medium">Last Name:</span> {userData.lastName}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Email:</span> {userData.email}
                </p>
            
               
                <p className="text-neutral-600">
                  <span className="font-medium">Gender:</span> {userData.gender}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Phone:</span> {userData.phone}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Date of Birth:</span> {userData.dateOfBirth}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">State:</span> {userData.state}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Zip Code:</span> {userData.zipcode}
                </p>

              </div>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <h3 className="text-lg font-medium text-neutral-700 mb-2">Account Information</h3>
              <div className="space-y-2">
                <p className="text-neutral-600">
                  <span className="font-medium">Account Number:</span> {userData.accountnumber}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Account Balance:</span> {userData.balance}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Address:</span> {userData.address}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Account Created:</span> {userData.createdat}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-neutral-200 pt-4 mt-6">
            <h4 className="font-medium mb-3 text-neutral-700">Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              <button
                className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
                onClick={() => navigate("/profile")}
              >
                <i className="fas fa-user-edit mr-2"></i> Edit Profile
              </button>
              <button
                className="bg-secondary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
                onClick={() => navigate("/bank-account")}
              >
                <i className="fas fa-university mr-2"></i> View Bank Accounts
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </Layout>
 
  );
}