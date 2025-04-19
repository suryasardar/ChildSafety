import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
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
import { AlertCircle, X } from "lucide-react";  // Importing icons from lucide-react

const History = () => {
  const [sensorData, setSensorData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
useEffect(() => {
  fetchSensorData();
}, []);



const fetchSensorData = async () => {
  setLoading(true);
  try {
    const response = await axios.get("http://localhost:5000/api/sensor-data");
    setSensorData(response.data.data);
    setError('');
  } catch (err) {
    setError('Failed to fetch sensor data');
    console.error('Error fetching sensor data:', err);
  } finally {
    setLoading(false);
  }
};

console.log(sensorData.data,"urya");

  // Simple Navbar component 
  const SimpleNavbar = () => (
    <nav className="p-4 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="font-bold text-xl mb-2">Sensor Dashboard</div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-800 hover:underline">Home</a>
          <a href="#" className="text-gray-800 hover:underline font-bold">History</a>
          <a href="#" className="text-gray-800 hover:underline">Settings</a>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <h2 className="text-2xl font-bold text-gray-800 my-4">
          Oxygen Level Summary
        </h2>

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
        <div className="bg-white border border-gray-200 rounded mb-6" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={oxygenData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="id" tick={{ display: "none" }} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" name="Oxygen Level">
                {oxygenData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.sound === "Detected" ? "#EF4444" : "#10B981"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <h3 className="text-xl font-bold mb-4">Latest Entry</h3>
        <div className="bg-white border border-gray-200 rounded overflow-hidden mb-6">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Oxygen Level</th>
                <th className="py-2 px-4 text-left">Sound</th>
                <th className="py-2 px-4 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {oxygenData.map((sensor) => (
                <tr key={sensor.id} className="border-t border-gray-200">
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
    </>
  );
};

export default History;
