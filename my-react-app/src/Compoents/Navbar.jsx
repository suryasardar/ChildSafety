import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <div className='bg-black text-2xl ml-4 '>hello world</div>
    <div className="navbar">
      <Link to="/history"><button>History</button></Link>
      <Link to="/oxygen"><button>Oxygen Percentage</button></Link>
      <Link to="/singout"><button>Logout</button></Link>

    </div>
    </>
  );
};

export default Navbar;