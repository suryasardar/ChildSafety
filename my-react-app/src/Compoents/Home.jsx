// src/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p>Welcome to the Home page!</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;
