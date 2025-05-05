import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import Navbar from "./Navbar";
import "./History.css";


const History = () => {
  // Dummy data to simulate sensor readings
  const dummyData = [
    { id: 1, value: 95, sound: "Not Detected", timestamp: "2025-05-06T09:00:00Z" },
    { id: 2, value: 89, sound: "Detected", timestamp: "2025-05-06T09:10:00Z" },
    { id: 3, value: 92, sound: "Not Detected", timestamp: "2025-05-06T09:20:00Z" },
    { id: 4, value: 76, sound: "Detected", timestamp: "2025-05-06T09:30:00Z" },
    { id: 5, value: 98, sound: "Not Detected", timestamp: "2025-05-06T09:40:00Z" },
  ];

  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // Commented out actual API call logic
    /*
    fetchSensorData();
    */

    // Set dummy data instead
    setSensorData(dummyData);
  }, []);

  // Commented out live fetching logic
  /*
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSensorData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/sensor-data");
      setSensorData(response.data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch sensor data');
      console.error('Error fetching sensor data:', err);
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Loading/Error states are removed since we're using dummy data */}

          <h2 className="text-2xl font-bold text-gray-800 my-4">
            Oxygen Level Summary
          </h2>

          {/* Legend */}
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span>Safe Oxygen Level</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span>Low Oxygen (Sound Detected)</span>
            </div>
          </div>

          {/* Chart */}
          {sensorData.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded mb-6" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sensorData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <XAxis dataKey="id" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" name="Oxygen Level">
                    {sensorData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.sound === "Detected" ? "#EF4444" : "#10B981"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">No sensor data available.</p>
          )}

          {/* Table */}
          <h3 className="text-xl font-bold mb-4">Latest Entry</h3>
          <div className="bg-white border border-gray-200 rounded overflow-hidden mb-6">
            <table className="min-w-full history-table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Oxygen Level</th>
                  <th className="py-2 px-4 text-left">Sound</th>
                  <th className="py-2 px-4 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {sensorData.map((sensor, idx) => (
                  <tr key={`${sensor.id}-${idx}`} className="border-t border-gray-200">
                    <td className="py-2 px-4">{sensor.id}</td>
                    <td className="py-2 px-4">{sensor.value}</td>
                    <td className="py-2 px-4 text-blue-600">{sensor.sound}</td>
                    <td className="py-2 px-4 text-gray-500">
                      {new Date(sensor.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="text-center text-gray-600 py-4 border-t border-gray-200">
            Child Monitoring System © 2025
          </footer>
        </div>
      </div>
    </>
  );
};

export default History;
