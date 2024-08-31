import React from "react";
import { useAuth } from "../components/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component, ...rest }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Component {...rest} /> : <Navigate to='/' />;
};

export default ProtectedRoute;
