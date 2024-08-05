import React from 'react';
import { Navigate } from 'react-router-dom';

interface DecodedToken {
  role: string;
  id: string;
}

const decodeJwt = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};

const ProtectedRoute: React.FC<{ element: React.ReactElement, requiredRole: string, customerId?: string }> = ({ element, requiredRole, customerId }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = decodeJwt(token);

  if (!decodedToken || decodedToken.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  // Kiểm tra nếu người dùng là ADMIN và đang cố gắng sửa chính mình
  if (decodedToken.role === 'ADMIN' && customerId && decodedToken.id === customerId) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
