// UserAuth.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// This is the higher-order component (HOC)
const UserAuth = (WrappedComponent) => {
  return function AuthHOC(props) {
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
      // Check if the user is authenticated
      if (!localStorage.getItem("name") && !isRedirecting) {
        setIsRedirecting(true); // Set a flag to avoid multiple redirects
        navigate("/login"); // Redirect to login page if not authenticated
      }
    }, [navigate, isRedirecting]);

    // If authenticated, render the wrapped component
    if (localStorage.getItem("name") && !isRedirecting) {
      return <WrappedComponent {...props} />;
    }

    // Optionally, return null or a loading spinner while checking authentication
    return null;
  };
};

export default UserAuth;
