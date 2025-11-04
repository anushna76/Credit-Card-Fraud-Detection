import React, { useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserDataContext } from "../Context/UserContext";

export default function CreditCard({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  bankName,
  isFlippable = true,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const{cardRequests}=useContext(UserDataContext)

  const formatCardNumber = (number) => {
    return number.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
  };

  const handleFlip = () => {
    if (isFlippable) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div 
      className="credit-card-container w-full max-w-md mx-auto cursor-pointer" 
      onClick={handleFlip}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="credit-card-inner relative w-full h-56"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Credit Card Front */}
        <div 
          className="credit-card-front absolute w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 flex flex-col justify-between backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Bank Logo */}
          <div className="flex justify-between items-start">
            <div>
              <img className="w-12 h-8 object-contain" alt="Bank logo" />
            </div>
            <div className="text-white text-xs opacity-80">
              {bankName.toUpperCase()}
            </div>
          </div>
          
          {/* Card Chip */}
          <div className="card-chip w-12 h-9 bg-yellow-200 rounded-md mb-6 flex items-center justify-center">
            <div className="w-10 h-7 bg-yellow-400 rounded-sm grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-yellow-300"></div>
              ))}
            </div>
          </div>
          
          {/* Card Number */}
          <div className="card-number text-xl md:text-2xl font-mono tracking-wider text-white mb-6">
            {formatCardNumber(cardNumber)}
          </div>
          
          {/* Card Details */}
          <div className="card-details flex justify-between">
            <div>
              <div className="text-xs text-gray-200 uppercase mb-1">Card Holder</div>
              <div className="text-white font-medium">{cardHolder}</div>
            </div>
            <div>
              <div className="text-xs text-gray-200 uppercase mb-1">Expires</div>
              <div className="text-white font-medium">{expiryDate}</div>
            </div>
          </div>
          
          {/* Card Brand Logo */}
          <div className="absolute bottom-6 right-6">
            <div className="text-white text-xl font-bold">
              <i className="fab fa-cc-visa"></i> VISA
            </div>
          </div>
        </div>
        
        {/* Credit Card Back */}
        <div 
          className="credit-card-back absolute w-full h-full bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg p-6 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Magnetic Strip */}
          <div className="w-full h-12 bg-neutral-800 -mx-6 mt-4"></div>
          
          {/* Signature Strip */}
          <div className="w-3/4 h-10 bg-white mt-6 mx-auto flex items-center px-4">
            <div className="w-full overflow-hidden">
              <div className="text-neutral-800 font-signature italic text-lg">{cardHolder}</div>
            </div>
            <div className="ml-4 text-neutral-800 font-mono text-sm">{cvv}</div>
          </div>
          
          {/* Additional Info */}
          <div className="text-xs text-white mt-6 px-4">
            <p>This card is property of the issuing bank. Use subject to cardholder agreement.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}