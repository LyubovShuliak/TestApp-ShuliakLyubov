import * as jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';

import { Board } from '../components/tasks/Board';
import { ROUTES } from '../resources/routes-constants';

import { CredentialResponse } from '@react-oauth/google';

export const BoardPage: React.FC = () => {
  const [user, setUser] = useState<CredentialResponse>({});
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    if (user.credential) {
      const decodedToken = jwt_decode.jwtDecode(user.credential);
      // setUser(decodedToken);

      console.log('User information:', decodedToken);
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: '4em' }}>{ROUTES.BOARD_ROUTE.name}</h1>

      <Board />
    </div>
  );
};
