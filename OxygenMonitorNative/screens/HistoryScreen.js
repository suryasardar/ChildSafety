import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const HistoryScreen = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/sensor-data');
      const data = await response.json();
      setSensorData(data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch sensor data');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.value}</Text>
      <Text style={[styles.cell, { color: item.sound === 'Detected' ? '#ef4444' : '#10b981' }]}>
        {item.sound}
      </Text>
      <Text style={styles.cell}>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oxygen Level History</Text>
      {loading && <ActivityIndicator color="#6366f1" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Oxygen</Text>
        <Text style={styles.headerCell}>Sound</Text>
        <Text style={styles.headerCell}>Timestamp</Text>
      </View>
      <FlatList
        data={sensorData}
        renderItem={renderItem}
        keyExtractor={(item, idx) => `${item.id}-${idx}`}
        ListEmptyComponent={<Text style={styles.empty}>No sensor data available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 16, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 16, textAlign: 'center' },
  headerRow: { flexDirection: 'row', backgroundColor: '#e5e7eb', padding: 8, borderRadius: 8 },
  headerCell: { flex: 1, fontWeight: 'bold', color: '#374151', fontSize: 14 },
  row: { flexDirection: 'row', backgroundColor: '#fff', padding: 8, borderRadius: 8, marginTop: 8 },
  cell: { flex: 1, color: '#374151', fontSize: 13 },
  error: { color: '#dc2626', marginBottom: 8, textAlign: 'center' },
  empty: { color: '#6b7280', textAlign: 'center', marginTop: 20 },
});

export default HistoryScreen; 