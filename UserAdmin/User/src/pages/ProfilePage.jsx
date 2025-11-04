import React, { useEffect } from "react";


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../components/Context/UserContext";
import Layout from "../components/layout/Layout";

export default function ProfilePage() {


  const navigate=useNavigate()
  const {user}=useContext(UserDataContext)
 
  // User profile data
  const profileData = {
    bankName: user?.first||   "N/A",
    email: user?.email||"raj@gmail.com",
    mobile: "9392491012",
    address: user?.street|| "Somarampet Bamjepally,Marrthanda",
    dob:user?.dob ? new Date(user.dob).toLocaleDateString("en-GB"): "2000"
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Layout>
    <div>
      <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">
        User { user?.first|| "raj"}'s Details
      </h1>
      
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              {/* Profile image placeholder */}
              <div className="w-48 h-48 bg-neutral-200 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-medium text-neutral-700 bg-neutral-50 w-1/3">Customer Name</th>
                    <td className="py-3 px-4">{profileData.bankName}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-medium text-neutral-700 bg-neutral-50">E-Mail</th>
                    <td className="py-3 px-4">{profileData.email}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-medium text-neutral-700 bg-neutral-50">Mobile</th>
                    <td className="py-3 px-4">{profileData.mobile}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-medium text-neutral-700 bg-neutral-50">Address</th>
                    <td className="py-3 px-4">{profileData.address}</td>
                  </tr>
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-neutral-700 bg-neutral-50">Date of Birth</th>
                    <td className="py-3 px-4">{profileData.dob}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-50 px-6 py-3 flex justify-end">
          <button 
            className="bg-amber-600 cursor-pointer hover:bg-opacity-90 text-white py-2 px-4 rounded mr-2 transition"
          >
            <i className="fas fa-edit mr-1"></i> Edit Profile
          </button>
          <button 
            className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-2 px-4 rounded transition"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </motion.div>
    </div>
    </Layout>
  );
}