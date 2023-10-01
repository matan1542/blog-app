import React from "react";
import { Route, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
  isAuthenticated: boolean;
  [key: string]: any; // Allow additional route props
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  isAuthenticated,
}) => {
  return isAuthenticated ? element : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
