import React, { useState } from "react";
import axios from  'axios'
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
  bankName: "",
};
export default function LoginPage() {
  


  // Form state
   const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
      e.preventDefault();
 
    try {
      const res = await axios.post(`https://frauddetection-9j46.onrender.com/users/login`, form);
      
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      // Redirect to admin dashboard or profile
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);

  }

  return (
    <div className="max-w-6xl mx-auto mt-8 w-screen">
      <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">
        Welcome To User Login
      </h1>

      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
          >
            <div className="mb-4 ">
              <label
                className="block text-neutral-700 mb-2"
                htmlFor="bankSelect"
              >
                Select Bank (required)
              </label>
              
              <select
                id="bankName"
                name="bankName"
                value={form.bankName}
                 className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
                onChange={handleChange}
                required
              >
                <option value="">Select Bank</option>
                <option value="SBI Bank">SBI Bank</option>
                <option value="Indian Bank">Indian Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="BOB Bank">BOB Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Canara Bank">Canara Bank</option>
              </select>
              
            </div>

            <div className="mb-4">
              <label className="block text-neutral-700 mb-2" htmlFor="username">
                Enter Email (required)
              </label>
              <input
                id="email"
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Enter"
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
              />
             
            </div>

            <div className="mb-6">
              <label className="block text-neutral-700 mb-2" htmlFor="password">
                Password (required)
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:border-primary"
              />
              
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-primary hover:bg-opacity-90 text-black py-2 px-6 rounded focus:outline-none transition"
              >
                Login
              </button>
              <div className="text-sm cursor-pointer">
                <span className="text-neutral-600">New User?</span>
                <Link to="/register">
                  {" "}
                  <button
                    type="button"
                    className="text-secondary hover:underline ml-1 font-medium"
                    onClick={handleChange}
                  >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          {/* A user login concept with a key and secure login imagery */}
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
            alt="Secure login"
            className="w-64 h-64 object-contain rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
