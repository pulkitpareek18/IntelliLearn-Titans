// authUtils.js
import { useContext } from 'react';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';

const redirectIfNotAuthenticated = () => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return null; // Return null if authenticated
};

export default redirectIfNotAuthenticated;
