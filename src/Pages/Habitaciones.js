import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import standardRoom from '../assets/img/Cuarto1.webp';
import deluxeRoom from '../assets/img/Cuarto2.webp';
import suiteRoom from '../assets/img/Cuarto3.webp';
import familyRoom from '../assets/img/Cuarto4.webp';

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    axios.get('/api/habitaciones/habitacion')
      .then(response => {
        setHabitaciones(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const getRoomImage = (tipo) => {
    switch (tipo) {
      case 'Standard':
        return standardRoom;
      case 'Deluxe':
        return deluxeRoom;
      case 'Suite':
        return suiteRoom;
      case 'Family':
        return familyRoom;
      default:
        return standardRoom;
    }
  };

  const handleReserve = (habitacionId) => {
    navigate(`/reserva/${habitacionId}`); // Usa navigate para redirigir
  };

  return (
    <div className="container mt-5">
      <h1>Habitaciones</h1>
      <div className="row">
        {habitaciones.map((habitacion) => (
          <div key={habitacion.HabitacionID} className="col-md-4 mb-4">
            <div className="card">
              <img src={getRoomImage(habitacion.TipoHabitacion)} className="card-img-top" alt="Habitación" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">ID: {habitacion.HabitacionID}</h5>
                <p className="card-text"><strong>Descripción:</strong> {habitacion.Descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> {habitacion.Precio}</p>
                <p className="card-text"><strong>Número de Habitación:</strong> {habitacion.NumeroHabitacion}</p>
                <button className="btn btn-primary" onClick={() => handleReserve(habitacion.HabitacionID)}>Reservar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habitaciones;
