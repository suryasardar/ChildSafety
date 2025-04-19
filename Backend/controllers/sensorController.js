const SensorData = require('../models/SensorData');

// POST - Save sensor data
exports.saveSensorData = async (req, res) => {
  try {
    const { id, value, sound } = req.body;

    // Validate required fields
    if (id === undefined || value === undefined || !sound) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: id, value, and sound are required'
      });
    }

    // Check if sensor data with this id already exists
    let sensorData = await SensorData.findOne({ id });

    if (sensorData) {
      // Update existing record
      sensorData.value = value;
      sensorData.sound = sound;
      sensorData.timestamp = Date.now();
      await sensorData.save();
      
      return res.status(200).json({
        success: true,
        message: 'Sensor data updated successfully',
        data: sensorData
      });
    }

    // Create new sensor data record
    sensorData = await SensorData.create({
      id,
      value,
      sound
    });

    res.status(201).json({
      success: true,
      message: 'Sensor data saved successfully',
      data: sensorData
    });
  } catch (error) {
    console.error('Error saving sensor data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save sensor data',
      error: error.message
    });
  }
};

// GET - Retrieve all sensor data
exports.getAllSensorData = async (req, res) => {
  try {
    const sensorData = await SensorData.find().sort({ timestamp: -1 });
    
    res.status(200).json({
      success: true,
      count: sensorData.length,
      data: sensorData
    });
  } catch (error) {
    console.error('Error retrieving sensor data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve sensor data',
      error: error.message
    });
  }
};

// GET - Retrieve sensor data by ID
exports.getSensorDataById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sensorData = await SensorData.findOne({ id: parseInt(id) });
    
    if (!sensorData) {
      return res.status(404).json({
        success: false,
        message: `No sensor data found with id: ${id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: sensorData
    });
  } catch (error) {
    console.error('Error retrieving sensor data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve sensor data',
      error: error.message
    });
  }
};