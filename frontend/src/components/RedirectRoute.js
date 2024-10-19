import React from "react";
import { Navigate } from "react-router-dom";

const RedirectRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return <Navigate to="/jobs" replace />;
  }
  return children;
};

export default RedirectRoute;
