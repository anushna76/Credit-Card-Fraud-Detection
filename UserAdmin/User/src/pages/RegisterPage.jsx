// RegistrationForm.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../components/Context/UserContext";
import { Link } from "react-router-dom";

const initialState = {
  first: "",
  last: "",
  bankName:"",
  gender: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  city_pop: "",
  job: "",
  dob: "",
  email: "",
  password: "",
};

const genders = ["M", "F", "Other"];

export default function RegistrationForm() {
  const { url}=useContext(UserDataContext)
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post(`${url}/users/register`, form);
      setMessage(res.data.message || "Registration successful!");
      setForm(initialState);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
    setLoading(false);
  };

  // / b/console.log(url)
  
 return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">
              Create Account
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                  name="first"
                  placeholder="First Name"
                  value={form.first}
                  onChange={handleChange}
                  required
                  aria-label="First Name"
                />
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                  name="last"
                  placeholder="Last Name"
                  value={form.last}
                  onChange={handleChange}
                  required
                  aria-label="Last Name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  aria-label="Gender"
                >
                  <option value="">Select Gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  aria-label="Date of Birth"
                />
              </div>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                name="street"
                placeholder="Street Address"
                value={form.street}
                onChange={handleChange}
                required
                aria-label="Street Address"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                  aria-label="City"
                />
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  required
                  aria-label="State"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                  name="zip"
                  placeholder="Zip Code"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  aria-label="Zip Code"
                />
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                  name="city_pop"
                  type="number"
                  placeholder="City Population"
                  value={form.city_pop}
                  onChange={handleChange}
                  required
                  aria-label="City Population"
                />
              </div>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                name="job"
                placeholder="Occupation"
                value={form.job}
                onChange={handleChange}
                required
                aria-label="Occupation"
              />
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                aria-label="Email Address"
              />
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                aria-label="Password"
              />
               <select
          style={styles.input}
          name="bankName"
          value={form.bankName}
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
              <button
                className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Create Account"}
              </button>
           <Link to="/">  <button
                className="w-full mt-3 py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                Login
              </button></Link>
              {message && (
                <div className="text-center text-sm font-medium text-green-600">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
    color: "#3730a3",
  },
  row: {
    display: "flex",
    gap: "1rem",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
    background: "#f9fafb",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "none",
    background: "#3730a3",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "background 0.2s",
  },
  message: {
    marginTop: "1rem",
    textAlign: "center",
    color: "#059669",
    fontWeight: "bold",
  },
};