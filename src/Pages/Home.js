import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    console.log(user); // Verifica los datos disponibles en el objeto `user`
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.birthdate}</p>
        <p>{user.address}</p>
        <p>{user.phone_number}</p>
      </div>
    )
  );
};

export default Profile;
