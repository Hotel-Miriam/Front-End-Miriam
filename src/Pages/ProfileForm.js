import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const ProfileForm = () => {
  const user = useUser();
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Telefono: '',
    Direccion: '',
    FechaNacimiento: '',
    Longitud: '',
    Latitud: '',
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
      const response = await axios.post('/api/auth/update', {
        UsuarioID: user.usuarioID,
        ...formData,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (user && user.PrimeraVez === 'S') {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="Nombre" value={formData.Nombre} onChange={handleChange} required />
        </label>
        <label>
          Apellido:
          <input type="text" name="Apellido" value={formData.Apellido} onChange={handleChange} required />
        </label>
        <label>
          Teléfono:
          <input type="text" name="Telefono" value={formData.Telefono} onChange={handleChange} required />
        </label>
        <label>
          Dirección:
          <input type="text" name="Direccion" value={formData.Direccion} onChange={handleChange} required />
        </label>
        <label>
          Fecha de Nacimiento:
          <input type="date" name="FechaNacimiento" value={formData.FechaNacimiento} onChange={handleChange} required />
        </label>
        <label>
          Longitud:
          <input type="text" name="Longitud" value={formData.Longitud} onChange={handleChange} required />
        </label>
        <label>
          Latitud:
          <input type="text" name="Latitud" value={formData.Latitud} onChange={handleChange} required />
        </label>
        <button type="submit">Actualizar</button>
      </form>
    );
  }

  return null;
};

export default ProfileForm;
