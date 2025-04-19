// src/Compoents/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token
    localStorage.removeItem('token');

    // Optionally, show a message or toast here

    // Redirect to login
    navigate('/login');
  }, [navigate]);

  return null; // or a loading spinner/message
};

export default Signout;
