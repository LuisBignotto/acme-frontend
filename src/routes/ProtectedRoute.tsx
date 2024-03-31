import { isAuthenticated } from '@/services/authService';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
 element: React.ReactElement;
 redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, redirectTo }) => {
 if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
 }

 return element;
};

export default ProtectedRoute;
