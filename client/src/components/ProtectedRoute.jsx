import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if token exists in localStorage (which implies the user is logged in)
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      // If user is authenticated and tries to go to login or signup, redirect to home page immediately
      if (location.pathname === "/login" || location.pathname === "/signup") {
        console.log(asd);

        navigate("/", { replace: true });
      }
    } else {
      // If user is not authenticated and tries to access the home page, redirect to login
      if (location.pathname === "/") {
        navigate("/login", { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  // If the user is authenticated, render the children, otherwise redirect is handled in useEffect
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
