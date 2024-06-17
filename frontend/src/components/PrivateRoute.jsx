  import React, { useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    user ? (
      <Routes>
      <Route {...rest} element={element} />
      </Routes>
    ) : (
      <Navigate to="/signin" replace />
    )
  );
};

export default PrivateRoute;
