

import React from "react";
import { motion } from "framer-motion";
import VirtualCard from "@/components/cards/VirtualCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../components/Context/UserContext";
import Layout from "../components/layout/Layout";

export default function CreditCardDetails() {
  const navigate = useNavigate();
  const { user, cardRequests = [] } = useContext(UserDataContext);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">
          User {user?.first || "raj"}'s Card Details
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
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Card Number</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">CRN</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">CVV</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Bank Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Account Holder Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Credit Limit</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Cash Limit</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Card Expiry Date</th>
                  <th className="py-3 px-4 text-left font-semibold text-neutral-700 border-b">Card Type</th>
                </tr>
              </thead>
              <tbody>
                {cardRequests.length > 0 ? (
                  cardRequests.map((card, idx) => (
                    <tr className="hover:bg-neutral-50" key={card._id || idx}>
                      <td className="py-3 px-4 border-b">{card.cardNumber || "5340 4991 1190"}</td>
                      <td className="py-3 px-4 border-b">{card.crn || "227869105"}</td>
                      <td className="py-3 px-4 border-b">{card.cvv || "2614"}</td>
                      <td className="py-3 px-4 border-b">{user?.bankName || "Indian Bank"}</td>
                      <td className="py-3 px-4 border-b">{user?.first || "raj"}</td>
                      <td className="py-3 px-4 border-b">{card.cardLimit || "100000"}</td>
                      <td className="py-3 px-4 border-b">{card.cashLimit || "40000"}</td>
                      <td className="py-3 px-4 border-b">
                        {card.cardExpiryDate
                          ? new Date(card.cardExpiryDate).toLocaleDateString("en-GB")
                          : "25/04/2027"}
                      </td>
                      <td className="py-3 px-4 border-b capitalize">
                        {card.cardType || "credit"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-3 px-4 border-b text-center text-gray-500">
                      No cards found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Virtual Card Visualization */}
        <motion.div
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {cardRequests.length > 0 ? (
            cardRequests.map((card, idx) => (
              <VirtualCard
                key={card._id || idx}
                cardNumber={card.cardNumber || "5340 4991 1190"}
                cardHolder={user?.first || "raj"}
                expiryDate={
                  card.cardExpiryDate
                    ? new Date(card.cardExpiryDate).toLocaleDateString("en-GB")
                    : "25/04/2027"
                }
                bankName={user?.bankName || "Indian Bank"}
                cardType={card.cardType || "credit"}
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">No virtual cards found.</div>
          )}
        </motion.div>

        <div className="flex justify-end">
          <button
            onClick={handleBack}
            className="bg-amber-600 hover:bg-neutral-300 text-neutral-700 py-2 px-4 rounded transition"
          >
            Back
          </button>
        </div>
      </div>
    </Layout>
  );
}