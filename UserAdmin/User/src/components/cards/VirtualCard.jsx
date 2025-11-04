// import React from "react";
// import { motion } from "framer-motion";

// export default function VirtualCard({
//   cardNumber,
//   cardHolder,
//   expiryDate,
//   bankName,
// }) {
//   const formatCardNumber = (number) => {
//     return number
//       .replace(/\s/g, "")
//       .replace(/(\d{4})/g, "$1 ")
//       .trim();
//   };

//   return (
//     <motion.div
//    className="credit-card bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-xl shadow-lg p-6 mb-4 relative h-56 w-full max-w-md mx-auto overflow-hidden "
//   whileHover={{ scale: 1.03 }}
//   transition={{ duration: 0.3 }}
// >
//   {/* Card Background Pattern Overlay */}
//   {/* <div className="absolute inset-0 pointer-events-none">
//     <div
//       className="absolute top-0 left-0 w-full h-full"
//       style={{
//         backgroundImage: `
//           radial-gradient(circle at 30% 20%, rgba(0.10,0.10,.10,0.10) 0%, rgba(255,255,255,0) 40%),
//           radial-gradient(circle at 70% 60%, rgba(.02,0.10,0.12,0.08) 0%, rgba(255,255,255,0) 50%)
//         `,
//       }}

//     ></div>
//   </div> */}

//    {/* Card Background Pattern Overlay */}
// <div className="absolute inset-0 pointer-events-none">
//   <div className="absolute top-0 left-0 w-full h-full"
//   style={{
//     backgroundImage: `
//       linear-gradient(135deg, rgba(0, 0, 128, 0.9), rgba(75, 0, 130, 0.95)),
//       radial-gradient(circle at 40% 40%, rgba(0, 0, 139, 0.5) 10%, transparent 1%),
//       radial-gradient(circle at 70% 60%, rgba(138, 43, 226, 0.3) 5%, transparent 1%)
//     `,
//     backgroundBlendMode: "overlay",
//   }}
// ></div>

// </div>


//       {/* Bank Logo */}
//       <div className="absolute top-6 right-6 text-white opacity-60 font-semibold text-sm">
//         {bankName.toUpperCase()}
//       </div>

//       {/* Card Chip */}
//       <div className="card-chip w-12 h-9 bg-yellow-200 rounded-md mb-6 flex items-center justify-center ">
//         <div className="w-10 h-7 bg-yellow-400 rounded-sm grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
//           {[...Array(9)].map((_, i) => (
//             <div key={i} className="bg-yellow-300"></div>
//           ))}
//         </div>
//       </div>

//       {/* Card Number */}
//       <div className="card-number text-xl md:text-2xl font-mono tracking-wider text-white mb-6">
//         {formatCardNumber(cardNumber)}
//       </div>

//       {/* Card Details */}
//       <div className="card-details flex justify-between">
//         <div>
//           <div className="text-xs text-black uppercase mb-1">
//             Card Holder
//           </div>
//           <div className="text-white font-medium">{cardHolder}</div>
//         </div>
//         <div>
//           <div className="text-xs text-gray-200 uppercase mb-1">Expires</div>
//           <div className="text-white font-bold">{expiryDate}</div>
//         </div>
//       </div>

//       {/* Card Brand Logo */}
//       <div className="absolute bottom-6 right-6">
//         <div className="text-white text-xl font-bold">
//           <i className="fab fa-cc-visa"></i> VISA
//         </div>
//       </div>
//     </motion.div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";

export default function VirtualCard({
  cardNumber,
  cardHolder,
  expiryDate,
  bankName,
}) {
  const formatCardNumber = (number) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  return (
    <motion.div
      className="credit-card bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-xl shadow-lg p-6 mb-4 relative h-56 w-full max-w-md mx-auto overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className=" top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(0, 0, 128, 0.9), rgba(75, 0, 130, 0.95)),
              radial-gradient(circle at 40% 40%, rgba(0, 0, 139, 0.3) 10%, transparent 60%),
              radial-gradient(circle at 70% 60%, rgba(138, 43, 226, 0.2) 5%, transparent 50%)
            `,
            backgroundBlendMode: "overlay",
          }}
        ></div>
      </div>

      {/* Bank Name */}
      <div className="absolute top-6 right-6 text-white font-semibold text-sm drop-shadow-md">
        {bankName.toUpperCase()}
      </div>

      {/* Card Chip */}
      <div className=" relative card-chip w-12 h-9 bg-yellow-300 rounded-md mb-6 flex items-center justify-center shadow-md">
        <div className="w-10 h-7 bg-yellow-400 rounded-sm grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-yellow-200"></div>
          ))}
        </div>
      </div>

      {/* Card Number */}
      <div
        className="  relative card-number text-xl md:text-2xl font-mono tracking-wider text-white font-bold "
        style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)" }}
      >
        {formatCardNumber(cardNumber)}
      </div>

      {/* Card Details */}
      <div className=" relative card-details flex justify-between">
        <div>
          <div className="text-xs text-white/80 uppercase mb-1">
            Card Holder
          </div>
          <div className="text-white font-bold">{cardHolder}</div>
        </div>
        <div>
          <div className="text-xs text-white/80 uppercase mb-1">Expires</div>
          <div className="text-white font-bold">{expiryDate}</div>
        </div>
      </div>

      {/* Card Brand Logo */}
      <div className="absolute bottom-6 right-6">
        <div className="text-white text-xl font-bold drop-shadow-md">
          <i className="fab fa-cc-visa"></i> VISA
        </div>
      </div>
    </motion.div>
  );
}
