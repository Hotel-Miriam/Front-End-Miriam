import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import standardRoom from '../assets/img/Combo1.webp';
import deluxeRoom from '../assets/img/Combo2.webp';
import suiteRoom from '../assets/img/Combo3.webp';
import familyRoom from '../assets/img/Combo4.webp';

const Combos = () => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    axios.get('/api/comboComida/get-combos')
      .then(response => {
        setCombos(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const getRoomImage = (tipo) => {
    switch (tipo) {
      case 'Combo Familiar':
        return standardRoom;
      case 'Combo Simple':
        return deluxeRoom;
      case 'Combo Duo':
        return suiteRoom;
      case 'Combo Soltero':
        return familyRoom;
      default:
        return standardRoom;
    }
  };

  return (
    <div className="container mt-5">
      <h1>Combos</h1>
      <div className="row">
        {combos.map((comboComida) => (
          <div key={comboComida.ComboID} className="col-md-4 mb-4">
            <div className="card">
              <img src={getRoomImage(comboComida.Nombre)} className="card-img-top" alt="Habitación" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">ID: {comboComida.ComboID}</h5>
                <p className="card-text"><strong></strong> {comboComida.Nombre}</p>
                <p className="card-text"><strong>Descripcion:</strong> {comboComida.Descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> {comboComida.Precio}</p>
                <button className="btn btn-primary">Pedir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Combos;
