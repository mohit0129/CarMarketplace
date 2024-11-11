import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from './apiConfig';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'
import TermsAndConditions from '../legal/terms&conditions';
import PrivacyPolicy from '../legal/privacy policy';

function Signup() {
  const [mydata, myDataUpdate] = React.useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const validate = () => {
    const newErrors = {};

    if (!mydata.name) newErrors.name = "Name is required";
    if (!mydata.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(mydata.email)) newErrors.email = "Email format is invalid";
    if (!mydata.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(mydata.mobile)) newErrors.mobile = "Mobile number should be 10 digits";
    if (!mydata.password) newErrors.password = "Password is required";
    else if (mydata.password.length < 6) newErrors.password = "Password should be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (event) => {
    myDataUpdate((mydata) => ({
      ...mydata, [event.target.name]: event.target.value
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: '' })); // Clear errors when typing
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const submitValue = (event) => {
    event.preventDefault();

    if (!validate()) return; // If validation fails, stop form submission

    const data = {
      name: mydata.name,
      email: mydata.email,
      mobileno: mydata.mobile,
      password: mydata.password,
    };

    axios.post(`${API_BASE_URL}/register`, data)
      .then(function (response) {
        console.log(response);
        const msg = response.data.message;
        alert(msg);
        window.location = '/login';
      })
      .catch(function (error) {
        console.error('There was an error!', error);
      });

  };

  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);

  const openPrivacy = () => setIsPrivacyOpen(true);
  const closePrivacy = () => setIsPrivacyOpen(false);

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg">
        <form onSubmit={submitValue} className="space-y-6 p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up Here</h1>

          <input type="text" name="name" placeholder="Enter Name" onChange={onChange} className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`} />
          {errors.name && <small className="text-red-500">{errors.name}</small>}


          <input type="email" name="email" placeholder="Enter Email ID" onChange={onChange} className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`} />
          {errors.email && <small className="text-red-500">{errors.email}</small>}

          <input type="text" name="mobile" placeholder="Enter Mobile No" onChange={onChange} className={`w-full px-3 py-2 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`} />
          {errors.mobile && <small className="text-red-500">{errors.mobile}</small>}

          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" onChange={onChange} className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`} />

            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center" >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-black" />
              ) : (
                <Eye className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
          {errors.password && <small className="text-red-500">{errors.password}</small>}

          <div className="text-sm text-gray-700 mt-4 hover:color-black">
            By signing up, you agree to our{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); openTerms(); }}  className="text-black font-semibold hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); openPrivacy(); }}  className="text-black font-semibold hover:underline">
              Privacy Policy
            </a>
            .
          </div>
          <TermsAndConditions isOpen={isTermsOpen} onClose={closeTerms} />
          <PrivacyPolicy isOpen={isPrivacyOpen} onClose={closePrivacy} />

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
            Create Account
          </button>

          <div className="text-center">
            <h4 className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-black font-semibold hover:underline">
                Log in
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
