import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem('jwtToken'); // Token ko check kar rahe hain

  return token ? <Component /> : <Navigate to="/login" replace />; // Agar token hai, toh protected page dikhayenge, nahi toh login page pe redirect
};

export default ProtectedRoute;
