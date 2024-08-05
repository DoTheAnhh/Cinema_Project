
import React from 'react';
import { Navigate } from 'react-router-dom';

interface DecodedToken {
  role: string;
}

const decodeJwt = (token: string): DecodedToken => {
  const base64Url = token.split('.')[1];
  const base64 = decodeURIComponent(atob(base64Url).replace(/\+/g, ' '));
  return JSON.parse(base64);
};

const ProtectedRoute: React.FC<{ element: React.ReactElement, requiredRole: string }> = ({ element, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/" />;
  
  try {
    const decodedToken = decodeJwt(token);

    if (decodedToken.role !== requiredRole) return <Navigate to="/" />;
    
    return element;
  } catch (error) {
    console.error("Token decoding error:", error);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
