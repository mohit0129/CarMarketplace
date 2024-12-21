import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../config/apiConfig';
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    if (storedId) {
      navigate('/AdminDashboard');
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!adminData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(adminData.email)) newErrors.email = "Email format is invalid";
    if (!adminData.password) newErrors.password = "Password is required";
    else if (adminData.password.length < 6) newErrors.password = "Password should be at least 6 characters";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const onChange = (event) => {
    setAdminData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: "" }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitValue = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/admin/login`, adminData);
      if (response.data.flag === "1") {
        alert("Admin successfully logged in");
        localStorage.setItem("adminName", response.data.name);
        localStorage.setItem("adminId", response.data.id);
        window.location.href = "/AdminDashboard";
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("There was an error!", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg">
        <form onSubmit={submitValue} className="space-y-6 p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h1>

          <div className="space-y-2">
            <input
              type="text"
              name="email"
              placeholder="Enter Admin Email"
              onChange={onChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <small className="text-red-500">{errors.email}</small>}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Admin Password"
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <small className="text-red-500">{errors.password}</small>}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            Log in as Admin
          </button>

        </form>
      </div>
    </div>
  );
}