// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Compoents/Home';
import Login from './Compoents/Login';
import Logout from './Compoents/Logout';
import Oxygenlevel from './Compoents/Oxygenlevel';
import History from './Compoents/History';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
         <Route path="/oxygen" element={<Oxygenlevel />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
