

import React, { useState, useContext,useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../components/Context/UserContext";
import Layout from "../components/layout/Layout";
import axios from "axios";



export default function TransferMoney() {
  const [transferAmount, setTransferAmount] = useState("0");
  const [loading, setLoading] = useState(false);
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const navigate = useNavigate();

  const { user, accounts ,url} = useContext(UserDataContext);



  const handleTransfer = async (req,res) => {
    if (!accounts) {
      toast.error("You must have a bank account to request a deposit.");
      return;
    }
    if (!transferAmount || Number(transferAmount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${url}/users/deposit`,
        {
          accountId: accounts._id,
          amount: transferAmount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
     toast.success("Your deposit request is pending admin approval.");
      setTransferAmount("0");
      // Refresh pending deposits
      const res = await axios.get(`${url}/users/deposits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingDeposits(res.data.deposits || []);
       
    } catch (err) {
      //toast.error(err.response?.data?.message || "Failed to request deposit.");
      res.json({success:false,message:"Failed to request deposit."})
    }
    setLoading(false);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">
          Transfer Money To Credit Card
        </h1>
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Account Number</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">User Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Bank</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Transfer Amount</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 border-b">{accounts ? accounts[0].accountNumber : "N/A"}</td>
                  <td className="py-3 px-4 border-b">{user?.first || "raj"}</td>
                  <td className="py-3 px-4 border-b">{accounts ? accounts[0].bankName : "N/A"}</td>
                  <td className="py-3 px-4 border-b">
                    <input
                      type="number"
                      className="w-32 p-1 border border-neutral-300 rounded focus:outline-none focus:border-primary"
                      placeholder="0 Rs/-"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      disabled={loading}
                    />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      className="bg-amber-600 cursor-pointer hover:bg-opacity-90 text-white py-1 px-3 rounded focus:outline-none transition text-xs"
                      onClick={handleTransfer}
                      disabled={loading}
                    >
                      {loading ? "Requesting..." : "Transfer Amount"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pending Deposits Table */}
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <h2 className="text-lg font-semibold px-4 pt-4 pb-2">Deposit Requests</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Amount</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Requested At</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Remark</th>
                </tr>
              </thead>
              <tbody>
                {pendingDeposits.length > 0 ? (
                  pendingDeposits.map((deposit) => (
                    <tr key={deposit._id}>
                      <td className="py-3 px-4 border-b">{deposit.amount}</td>
                      <td className="py-3 px-4 border-b">
                        {deposit.status === "approved"
                          ? <span className="text-green-600 font-semibold">Amount Credited</span>
                          : <span className="text-yellow-600 font-semibold">Pending for Approval</span>
                        }
                      </td>
                      <td className="py-3 px-4 border-b">
                        {deposit.createdAt
                          ? new Date(deposit.createdAt).toLocaleString("en-GB")
                          : "-"}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {deposit.status === "approved"
                          ? "Credited to your account"
                          : "Waiting for admin approval"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-3 px-4 border-b text-center text-gray-500">
                      No deposit requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
    </Layout>
  );
}