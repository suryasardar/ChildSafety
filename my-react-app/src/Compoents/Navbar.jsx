import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <div className="navbar">
      <Link to="/oxygen"><button>Oxygen</button></Link>
      <Link to="/history"><button>History</button></Link>

    </div>
    </>
  );
};

export default Navbar;