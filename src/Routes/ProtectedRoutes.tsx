import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/authProvider";

export const ProtectedRoutes = () => {
  const { jwtToken } = useAuth();
  return jwtToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
