import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Layout.css';

const Layout = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [rol, setRol] = useState('');

  useEffect(() => {
    const userRole = sessionStorage.getItem('rol');
    if (userRole) {
      setRol(userRole);
    }
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/habitaciones">Habitaciones</Link></li>
            
              <li><Link to="/misreservas">Reservas</Link></li>
              <li><Link to="/combo">Ver Combos</Link></li>
              <li><Link to="/session">Profile</Link></li>
              <li><button onClick={() => logout({ returnTo: window.location.origin })}>Cerrar Sesion</button></li>
            </>
          ) : (
            <li><button onClick={() => loginWithRedirect()}>Iniciar Sesion</button></li>
          )}
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
