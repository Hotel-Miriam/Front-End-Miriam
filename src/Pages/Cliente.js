import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Cliente.css';  // Asegúrate de que el nombre del archivo sea correcto y que esté en la ubicación correcta

const Register = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    email: user.email,
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    longitud: '',
    latitud: '',
    auth0UserID: user.sub
  });
  const navigate = useNavigate();
  const [marker, setMarker] = useState({
    latitude: -16.500000,
    longitude: -68.150000,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/clientes/register', formData);
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  function LocationMarker() {
    useMapEvents({
      dblclick(e) {
        const { lat, lng } = e.latlng;
        setMarker({ latitude: lat, longitude: lng });
        setFormData({
          ...formData,
          latitud: lat.toString(),
          longitud: lng.toString(),
        });
      },
    });

    return marker.latitude === null ? null : (
      <Marker position={[marker.latitude, marker.longitude]} />
    );
  }

  return (
    <div className="form-container">
      <h6 className="mb-4">Requerimos ciertos datos para continuar</h6>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <label>
          Apellido:
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </label>
        <label>
          Teléfono:
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </label>
        <label>
          Dirección:
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
        </label>
        <label>
          Fecha de Nacimiento:
          <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
        </label>
        <label>Marque su ubicación</label>
        <MapContainer
        center={[marker.latitude, marker.longitude]}
        zoom={13}
        style={{ width: '100%', height: '400px' }}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
        <label hidden>
          Longitud:
          <input type="text" name="longitud" value={formData.longitud} onChange={handleChange} required readOnly hidden />
        </label>
        <label hidden>
          Latitud:
          <input type="text" name="latitud" value={formData.latitud} onChange={handleChange} required readOnly hidden />
        </label>
        <button type="submit">Registrar</button>
      </form>
      
    </div>
  );
};

export default Register;
