// src/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex justify-center items-center h-screen' >
      <h1>Home Page</h1>
      <p className='text-2xl'>Welcome to the Home page!</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;
