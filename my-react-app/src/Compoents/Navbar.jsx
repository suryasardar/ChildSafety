import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/history"><button>History</button></Link>
      <Link to="/oxygen"><button>Oxygen Percentage</button></Link>

    </div>
  );
};

export default Navbar;