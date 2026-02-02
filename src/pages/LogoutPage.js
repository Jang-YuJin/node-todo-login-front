import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const LogoutPage = ({setUser, user}) => {
  useEffect(() => {
    setUser(null);
    sessionStorage.removeItem('token');
  }, []);

  return (
    user? '' : <Navigate to={'/login'}></Navigate>
  )
}

export default LogoutPage
