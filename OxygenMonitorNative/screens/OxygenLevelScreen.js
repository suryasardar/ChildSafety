import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const getOxygenColor = (level) => {
  if (level < 40) return '#ef4444'; // red
  if (level < 60) return '#f59e42'; // yellow
  return '#10b981'; // green
};

const getOxygenStatus = (level) => {
  if (level < 40) return 'critical';
  if (level < 60) return 'moderate';
  return 'normal';
};

const OxygenLevelScreen = () => {
  const [oxygenLevel, setOxygenLevel] = useState(80);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOxygenLevel(prev => {
        const newLevel = prev + (Math.random() > 0.5 ? -5 : 3);
        return Math.min(Math.max(newLevel, 20), 100);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAlert(oxygenLevel < 40);
  }, [oxygenLevel]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oxygen Level Monitor</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Current Oxygen Level</Text>
          <Text style={[styles.value, { color: getOxygenColor(oxygenLevel) }]}> {oxygenLevel.toFixed(1)}% </Text>
        </View>
        <View style={styles.barBackground}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: `${oxygenLevel}%`,
                backgroundColor: getOxygenColor(oxygenLevel),
              },
            ]}
          />
        </View>
        <Text style={styles.status}>
          Oxygen level is <Text style={{ fontWeight: 'bold' }}>{getOxygenStatus(oxygenLevel)}</Text>.
        </Text>
        {alert && (
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>LOW OXYGEN ALERT! Immediate action required!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  card: { backgroundColor: '#1f2937', borderRadius: 16, padding: 24, width: '90%', maxWidth: 400, alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16 },
  label: { color: '#fff', fontSize: 18 },
  value: { fontSize: 22, fontWeight: 'bold' },
  barBackground: { width: '100%', height: 18, backgroundColor: '#374151', borderRadius: 9, marginBottom: 16 },
  bar: { height: 18, borderRadius: 9 },
  status: { color: '#d1d5db', fontSize: 16, marginBottom: 12 },
  alertBox: { backgroundColor: '#b91c1c', padding: 10, borderRadius: 8, marginTop: 10 },
  alertText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});

export default OxygenLevelScreen; 