// src/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  return (
 
    <>
   <Navbar/>
    <div>
      <Link to="/login">Go to Login</Link>
    </div>
    </>
  );
};

export default Home;
