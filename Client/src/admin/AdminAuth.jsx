// adminAuth.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This is the higher-order component (HOC)
const adminAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if the admin is authenticated
      if (!localStorage.getItem("adminName")) {
        navigate("/AdminLogin"); // Redirect to login page if not authenticated
      }
    }, [navigate]);

    // If authenticated, render the wrapped component
    return localStorage.getItem("adminName") ? <WrappedComponent {...props} /> : null;
  };
};

export default adminAuth;
