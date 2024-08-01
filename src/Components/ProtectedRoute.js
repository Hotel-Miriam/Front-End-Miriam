import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (isAuthenticated && user) {
        console.log('User is authenticated:', user);
        try {
          const token = await getIdTokenClaims();
          console.log('Token obtained:', token);
          const response = await axios.post(
            '/api/clientes/check-user',
            { email: user.email },
            {
              headers: {
                Authorization: `Bearer ${token.__raw}`,
              },
            }
          );
          console.log('Response from /check-user:', response);

          if (response.status === 200) {
            setIsRegistered(true);
          } else {
            setIsRegistered(false);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setIsRegistered(false);
          } else {
            console.error('Error checking user:', error);
          }
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkUserRegistration();
  }, [isAuthenticated, user, getIdTokenClaims]);

  if (loading) {
    console.log('Checking registration status...');
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to /login');
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && !isRegistered) {
    console.log('User not registered, redirecting to /cliente');
    return <Navigate to="/cliente" />;
  }

  console.log('User registered, rendering protected route');
  return <Outlet />;
};

export default ProtectedRoute;
