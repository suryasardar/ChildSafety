const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  sound: {
    type: String,
    required: true,
    enum: ['Detected', 'Not Detected'] // To validate sound values
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Add a compound index to ensure id uniqueness
sensorDataSchema.index({ id: 1 });

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;