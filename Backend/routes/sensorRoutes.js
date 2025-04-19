const express = require('express');
const router = express.Router();
const { 
  saveSensorData, 
  getAllSensorData, 
  getSensorDataById 
} = require('../controllers/sensorController');

// POST - Save sensor data
router.post('/sensor-data', saveSensorData);

// GET - Retrieve all sensor data
router.get('/sensor-data', getAllSensorData);

// GET - Retrieve sensor data by ID
router.get('/sensor-data/:id', getSensorDataById);

module.exports = router;