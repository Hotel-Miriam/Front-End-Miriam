import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    axios.get('/api/habitacion')
      .then(response => {
        setHabitaciones(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Habitaciones</h1>
      <ul>
        {habitaciones.map((habitacion) => (
          <li key={habitacion.HabitacionID} className="habitacion">
            <p><strong>ID:</strong> {habitacion.HabitacionID}</p>
            <p><strong>Descripción:</strong> {habitacion.Descripcion}</p>
            <p><strong>Precio:</strong> {habitacion.Precio}</p>
            <p><strong>Numero Habitacion:</strong> {habitacion.NumeroHabitacion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Habitaciones;
