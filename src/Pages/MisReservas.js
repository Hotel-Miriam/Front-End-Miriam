import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import standardRoom from '../assets/img/Cuarto1.webp';
import deluxeRoom from '../assets/img/Cuarto2.webp';
import suiteRoom from '../assets/img/Cuarto3.webp';
import familyRoom from '../assets/img/Cuarto4.webp';

const MisReservas = () => {
    const [reservas, setReservas] = useState([]);
    const { user } = useAuth0();

    useEffect(() => {
        if (user && user.sub) {
            axios.get(`/api/reserva/misreserva/${user.sub}`)
                .then(response => {
                    setReservas(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the data!', error);
                });
        }
    }, [user]);

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
    return (

        
        <div className="container mt-5">
        <h2>Mis Reservas</h2>
        {reservas.length === 0 ? (
            <p>No tienes reservas confirmadas.</p>
        ) : (
            <div className="row">
                {reservas.map((reserva) => (
                    <div key={reserva.ReservaID} className="col-md-4 mb-4">
                        <div className="card">
                            <img 
                                src={getRoomImage(reserva.TipoHabitacion)} className="card-img-top" alt="Habitación" style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">Reserva ID: {reserva.ReservaID}</h5>
                                <p className="card-text"><strong>Habitación ID:</strong> {reserva.HabitacionID}</p>
                                <p className="card-text"><strong>Fecha de Reserva:</strong> {new Date(reserva.FechaReserva).toLocaleDateString()}</p>
                                <p className="card-text"><strong>Fecha de Check-In:</strong> {new Date(reserva.FechaCheckIn).toLocaleDateString()}</p>
                                <p className="card-text"><strong>Fecha de Check-Out:</strong> {new Date(reserva.FechaCheckOut).toLocaleDateString()}</p>
                                <p className="card-text"><strong>Estado:</strong> {reserva.Estado}</p>
                                <p className="card-text"><strong>Descripción:</strong> {reserva.Descripcion}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
};

export default MisReservas;
  