import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AdminContext, { AdminDataContext } from "../Context/AdminContext";

const initialState = {
  email: "",
  password: "",
  bankName: "",
};

export default function LoginPage() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const {url}=useContext(AdminDataContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.email || !form.password || !form.bankName) {
      toast.error("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Invalid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${url}/admin/login`, form);
      
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Login successful!");
      // Redirect to admin dashboard or profile
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Bank Admin Login</h2>
        <input
          style={styles.input}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
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
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
       <button style={styles.button} type="submit" disabled={loading}>
         <Link to="/register"> Register   </Link>
        </button>
       

      </form>
      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)",
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
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
    color: "#3730a3",
  },
  input: {
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
};