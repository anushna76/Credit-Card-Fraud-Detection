import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import CreditCard from "@/components/cards/CreditCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../components/Context/UserContext";
import Layout from "../components/layout/Layout";
import VirtualCard from "../components/cards/VirtualCard";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function RequestCreditCard() {
  
  const navigate=useNavigate()
  const {user}=useContext(UserDataContext)
  
  // Form state
  const [cardCategory, setCardCategory] = useState("Credit Card");
  const [cardType, setCardType] = useState("Visa Credit");
  const [cardLimit, setCardLimit] = useState("");
  const [cardPurpose, setCardPurpose] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const {url}=useContext(UserDataContext)
  
  const [cardPreview, setCardPreview] = useState({
    cardNumber: "5340 0491 1190 2214",
    cardHolder: user?.bankName || "No Account Found",
    expiryDate: "05/28",
    cvv: "214",
    bankName: user?.bankName || "Indian Bank",
  });

  
 
  const validateForm = () => {
    const newErrors = {};
    if (!cardType) newErrors.cardType = "Card type is required";
    if (!cardLimit) newErrors.cardLimit = "Credit limit is required";
    if (!cardPurpose) newErrors.cardPurpose = "Purpose is required";
    if (!termsAgreed) newErrors.termsAgreed = "You must agree to the terms and conditions";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${url}/users/request-card`,
        {
          cardType,
          cardCategory,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Credit Card Request Submitted. Awaiting admin approval.");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit card request."
      );
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const cardBenefits = [
    "No annual fee for the first year",
    "2% cashback on all purchases",
    "Exclusive online shopping offers",
    "24/7 customer support",
  ];

  // useEffect(()=>{
  //   console.log("card category",cardCategory)
  //   console.log("card type",cardType)
    
  // })
  return (
    <Layout>
    <div>
      <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">Request Credit Card</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} >
              {/* Card Category Select */}
          <div className="mb-4">
            <label className="block text-neutral-700 mb-2" htmlFor="cardCategory">
              Card Category
            </label>
            <select
             
              name="cardCategory"
              value={cardCategory}
              onChange={(e) => setCardCategory(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
          </div>
                 {/* Card Type Select (conditional options) */}
          <div className="mb-4">
            <label className="block text-neutral-700 mb-2" htmlFor="cardType">
              Card Type
            </label>
            <select
            
              name="cardType"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
            >
              {cardCategory === "Credit Card" ? (
                <>
                  <option value="Visa Credit">Visa Credit</option>
                  <option value="MasterCard Credit">MasterCard Credit</option>
                  <option value="American Express">American Express</option>
                </>
              ) : (
                <>
                  <option value="Visa Debit">Visa Debit</option>
                  <option value="MasterCard Debit">MasterCard Debit</option>
                  <option value="RuPay Debit">RuPay Debit</option>
                </>
                 )}
            </select>
            </div>
              
             
              
              <div className="mb-4">
                <label className="block text-neutral-700 mb-2">
                  Purpose of Card
                </label>
                <select
                  id="cardPurpose"
                  value={cardPurpose}
                  onChange={(e) => setCardPurpose(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
                >
                  <option value="">Select purpose</option>
                  <option value="shopping">Shopping</option>
                  <option value="travel">Travel</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </select>
                {errors.cardPurpose && <p className="text-red-500 text-sm mt-1">{errors.cardPurpose}</p>}
              </div>
              
              <div className="mb-6 flex items-start space-x-3">
                <input
                  id="termsAgreed"
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="form-checkbox text-primary rounded border-neutral-300 focus:outline-none focus:ring-primary mt-1"
                />
                <div>
                  <label htmlFor="termsAgreed" className="text-neutral-700">I agree to the terms and conditions</label>
                  {errors.termsAgreed && <p className="text-red-500 text-sm mt-1">{errors.termsAgreed}</p>}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-opacity-90 text-white py-2 px-6 rounded focus:outline-none transition"
                >
                  Submit Request
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
        
        <div className="w-full md:w-1/2">
          <div className="sticky top-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 text-neutral-700">Card Preview</h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <VirtualCard
                  cardNumber={cardPreview.cardNumber}
                  cardHolder={cardPreview.cardHolder}
                  expiryDate={cardPreview.expiryDate}
                  cvv={cardPreview.cvv}
                  bankName={cardPreview.bankName}
                />
              </motion.div>
            </div>
            
            <motion.div
              className="bg-neutral-100 p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="font-medium mb-2 text-neutral-700">Card Benefits</h4>
              <ul className="text-sm text-neutral-600 space-y-2">
                {cardBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      
    </div>
    </Layout>
  );
}