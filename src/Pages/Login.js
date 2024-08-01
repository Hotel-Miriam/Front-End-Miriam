import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Login.css'; // Importa el archivo CSS

const Login = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        console.log('Usuario autenticado, obteniendo datos adicionales...');
        try {
          const email = user.email;
          console.log('Email recibido:', email);

          const response = await fetch(`http://localhost:5002/api/clientes/userdata?Email=${email}`);
          const data = await response.json();

          if (response.ok) {
            // Guardar los datos del usuario en sessionStorage
            sessionStorage.setItem('userData', JSON.stringify(data));
            console.log('Datos del usuario guardados en sessionStorage:', data);
          } else {
            console.error('Error al obtener los datos del usuario:', data.message);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      } else {
        console.log('Usuario no autenticado o datos de usuario no disponibles.');
      }
    };

    fetchUserData();
  }, [isAuthenticated, user]);

  return (
    <div className="login-container">
      {!isAuthenticated ? (
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      ) : (
        <p>Ya has iniciado sesión</p>
      )}
    </div>
  );
};

export default Login;
