
import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "@/pages/not-found";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import BankAccountPage from "./pages/BankAccountPage";
import CreateBankAccount from "./pages/CreateBankAccount";
import RequestCreditCard from "./pages/RequestCreditCard";
import CreditCardDetails from "./pages/CreditCardDetails";
import TransferMoney from "./pages/TransferMoney";
import SearchProducts from "./pages/SearchProducts";
import PurchasedProducts from "./pages/PurchasedProducts";
import RegistrationForm from "./pages/RegisterPage";
import UserProtectWrapper from "./pages/UserProtectedWrapper";
import AccountDetails from "./pages/AccountDetails";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
   return (
    <Routes>
      {/* Public routes */}
     
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationForm />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <UserProtectWrapper>
            <Dashboard />
          </UserProtectWrapper>
        }
      />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/account-info" element={<AccountDetails />} />
      <Route path="/bank-account" element={<BankAccountPage />} />
      <Route path="/create-bank-account" element={<CreateBankAccount />} />
      <Route path="/request-credit-card" element={<RequestCreditCard />} />
      <Route path="/credit-card-details" element={<CreditCardDetails />} />
      <Route path="/transfer-money" element={<TransferMoney />} />
      <Route path="/search-products" element={<SearchProducts />} />
      <Route path="/purchased-products" element={<PurchasedProducts />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
     
    </Routes>
    
  );
  

}

export default App;