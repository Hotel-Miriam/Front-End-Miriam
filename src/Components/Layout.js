// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; 

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/habitaciones">Habitaciones</Link></li>
          <li><Link to="/Persona">Persona</Link></li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
