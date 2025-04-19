import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { AlertCircle, X } from 'lucide-react';

const OxygenLevel = () => {
  const [oxygenLevel, setOxygenLevel] = useState(80);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSounding, setAlertSounding] = useState(false);
  const [readings, setReadings] = useState([]);
  const audioRef = useRef(null);

  // Simulate changing oxygen levels (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setOxygenLevel(prevLevel => {
        const newLevel = prevLevel + (Math.random() > 0.5 ? -5 : 3);
        return Math.min(Math.max(newLevel, 20), 100); // Keep between 20-100
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Store each oxygen level reading
  useEffect(() => {
    setReadings(prev => [...prev, oxygenLevel]);
  }, [oxygenLevel]);

  // Send average oxygen level to backend every hour
  useEffect(() => {
    const interval = setInterval(() => {
      if (readings.length === 0) return;

      const sum = readings.reduce((acc, val) => acc + val, 0);
      const avg = sum / readings.length;

      // POST request
      fetch('https://your-backend-api.com/api/oxygen-level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          averageOxygenLevel: avg.toFixed(2),
          timestamp: new Date().toISOString(),
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to send data');
          }
          console.log('Average oxygen level sent:', avg.toFixed(2));
        })
        .catch(err => {
          console.error('Error sending average oxygen level:', err);
        });

      // Clear readings after sending
      setReadings([]);
    }, 3600000); // 1 hour = 3600000 ms

    return () => clearInterval(interval);
  }, [readings]);

  // Handle alerts
  useEffect(() => {
    if (oxygenLevel < 40) {
      setShowAlert(true);
      if (!alertSounding) {
        audioRef.current.play();
        setAlertSounding(true);
      }
    } else {
      if (alertSounding) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setAlertSounding(false);
      }
      setShowAlert(false);
    }
  }, [oxygenLevel, alertSounding]);

  const stopAlarm = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setAlertSounding(false);
  };

  const getOxygenLevelColor = () => {
    if (oxygenLevel < 40) return 'text-red-500';
    if (oxygenLevel < 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <h1 className="text-white text-3xl font-bold mb-8">Oxygen Level Monitor</h1>
        <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 shadow-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl">Current Oxygen Level</h2>
            <span className={`text-2xl font-bold ${getOxygenLevelColor()}`}>
              {oxygenLevel.toFixed(1)}%
            </span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
            <div
              className={`h-4 rounded-full ${
                oxygenLevel < 40
                  ? 'bg-red-500'
                  : oxygenLevel < 60
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${oxygenLevel}%` }}
            />
          </div>
          <p className="text-gray-400">
            Oxygen level is{' '}
            {oxygenLevel < 40
              ? 'critical'
              : oxygenLevel < 60
              ? 'moderate'
              : 'normal'}
            .
          </p>
        </div>

        {showAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-red-900 p-6 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-red-500 mr-2" size={24} />
                <h2 className="text-white text-xl font-bold">LOW OXYGEN ALERT</h2>
              </div>
              <p className="text-red-100 mb-6">
                Oxygen level critically low at{' '}
                <span className="font-bold text-white">
                  {oxygenLevel.toFixed(1)}%
                </span>
                . Immediate action required!
              </p>
              <div className="flex justify-end">
                <button
                  onClick={stopAlarm}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md flex items-center"
                >
                  <X size={18} className="mr-1" />
                  Stop Alarm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Alarm audio */}
        <audio
          ref={audioRef}
          src="data:audio/wav;base64,..." // Your existing audio base64
          loop
        />
      </div>
    </>
  );
};

export default OxygenLevel;