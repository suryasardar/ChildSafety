import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { AlertCircle, X } from 'lucide-react';

const OxygenLevel = () => {
  const [oxygenLevel, setOxygenLevel] = useState(80);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSounding, setAlertSounding] = useState(false);
  const audioRef = useRef(null);

  // Simulate changing oxygen levels (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly adjust oxygen level for demonstration
      setOxygenLevel(prevLevel => {
        const newLevel = prevLevel + (Math.random() > 0.5 ? -5 : 3);
        return Math.min(Math.max(newLevel, 20), 100); // Keep between 20-100
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Check oxygen level and trigger alert if needed
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
    if (oxygenLevel < 40) return "text-red-500";
    if (oxygenLevel < 60) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <h1 className="text-white text-3xl font-bold mb-8">Oxygen Level Monitor</h1>
        
        <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl">Current Oxygen Level</h2>
            <span className={`text-2xl font-bold ${getOxygenLevelColor()}`}>
              {oxygenLevel.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
            <div 
              className={`h-4 rounded-full ${
                oxygenLevel < 40 ? 'bg-red-500' : 
                oxygenLevel < 60 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${oxygenLevel}%` }}
            />
          </div>
          <p className="text-gray-400">Oxygen level is {oxygenLevel < 40 ? 'critical' : oxygenLevel < 60 ? 'moderate' : 'normal'}.</p>

        </div>
              
        {/* Alert popup */}
        {showAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-red-900 p-6 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-red-500 mr-2" size={24} />
                <h2 className="text-white text-xl font-bold">LOW OXYGEN ALERT</h2>
              </div>
              <p className="text-red-100 mb-6">
                Oxygen level critically low at <span className="font-bold text-white">{oxygenLevel.toFixed(1)}%</span>. 
                Immediate action required!
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
        
        {/* Audio element for alarm */}
        <audio 
          ref={audioRef}
          src="data:audio/wav;base64,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" 
          loop
        />
      </div>
    </>
  );
};

export default OxygenLevel;