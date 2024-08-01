import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Habitaciones from './Pages/Habitaciones';
import Cliente from './Pages/Cliente';
import Empleado from './Pages/Empleado';
import Login from './Pages/Login';
import Combos from './Pages/Combo';
import Logout from './Pages/Logout';
import Profile from './Pages/Session';
import Reserva from './Pages/Reserva';
import MisReserva from './Pages/MisReservas';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cliente" element={<Cliente />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/reserva/:habitacionId" element={<Reserva />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/empleados" element={<Empleado />} />
          <Route path="/combo" element={<Combos />} />
          <Route path="/misreservas" element={<MisReserva />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
