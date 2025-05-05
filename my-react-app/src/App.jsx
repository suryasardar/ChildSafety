// src/App.jsx
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Compoents/Home';
import Login from './Compoents/Login';
import Logout from './Compoents/Logout';
import Oxygenlevel from './Compoents/Oxygenlevel';
import History from './Compoents/History';
import PrivateRoute from './Compoents/PrivateRoute';
import Signout from './Compoents/Singout';
import Signup from './Compoents/Signup';

const App = () => {

  useEffect(() => {
    Notification.requestPermission().then(permission => {
      console.log('Notification permission:', permission);
    });
  }, []);

  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> */}
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
        {/* <Route path="/oxygen" element={<PrivateRoute><Oxygenlevel /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} /> */}
        <Route path="/oxygen" element={<Oxygenlevel />} />
        <Route path="/history" element={<History />} />
        <Route path="/singout" element={ <Signout /> } />
      </Routes>
    </Router>
  );
};

export default App;
