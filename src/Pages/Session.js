import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('userData'));

    if (data) {
      setUserData(data);
    } else {
      console.log('No se encontraron datos del usuario.');
    }
  }, []);

  return (
    <div>
      {userData.PersonaID ? (
        <div>
          <p>Persona ID: {userData.PersonaID}</p>
          <p>Nombre: {userData.Nombre}</p>
          <p>Apellido: {userData.Apellido}</p>
          <p>Teléfono: {userData.Telefono}</p>
          <p>Dirección: {userData.Direccion}</p>
          <p>Fecha de Nacimiento: {userData.FechaNacimiento}</p>
          <p>Longitud: {userData.Longitud}</p>
          <p>Latitud: {userData.Latitud}</p>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

export default UserProfile;
