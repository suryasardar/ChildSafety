import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, X, Bell } from 'lucide-react';
import Navbar from './Navbar';

// Utility function to get oxygen level color
const getOxygenColor = (level) => {
  if (level < 40) return 'red';
  if (level < 60) return 'yellow';
  return 'green';
};

const OxygenLevel = () => {
  const [oxygenLevel, setOxygenLevel] = useState(80);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSounding, setAlertSounding] = useState(false);
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAlarmPaused, setIsAlarmPaused] = useState(false); // Track if alarm is paused
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [activeNotification, setActiveNotification] = useState(null);
  const audioRef = useRef(new Audio('data:audio/wav;base64,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'));

  // Request notification permission immediately and set up service worker communication
  useEffect(() => {
    const setupNotifications = async () => {
      // Check if notifications are supported
      if (!("Notification" in window)) {
        console.error("This browser does not support notifications");
        return;
      }

      // Check permission status
      const permission = Notification.permission;
      console.log(`Current notification permission: ${permission}`);
      setNotificationPermission(permission);

      // Request permission if not already granted
      if (permission !== "granted" && permission !== "denied") {
        try {
          const newPermission = await Notification.requestPermission();
          console.log(`Permission request result: ${newPermission}`);
          setNotificationPermission(newPermission);
        } catch (err) {
          console.error("Error requesting notification permission:", err);
        }
      }

      // Set up service worker communication
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          console.log("✅ Service worker is ready:", registration);
          swRegistrationRef.current = registration;
          
          // Test notification immediately after setup
          if (Notification.permission === "granted") {
            console.log("🧪 Sending test notification...");
            await registration.showNotification("Test Notification", {
              body: "This is a test notification",
              icon: "/oxygen-alert-icon.png",
              badge: "/oxygen-alert-icon.png",
              tag: "test-notification",
              requireInteraction: true
            });
            console.log("✅ Test notification sent");
          }
          
          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            console.log("📩 Message from Service Worker:", event.data);
            if (event.data && event.data.action === 'stop-alarm') {
              stopAlarm();
            }
          });

          // Show persistent monitoring notification
          if (Notification.permission === "granted" && 'serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            registration.showNotification("Oxygen Monitoring Active", {
              body: "Your website is monitoring oxygen level.",
              icon: "/oxygen-alert-icon.png",
              badge: "/oxygen-alert-icon.png",
              tag: "oxygen-monitoring",
              requireInteraction: true,
              actions: [
                {
                  action: 'stop-alarm',
                  title: 'Stop Alarm'
                }
              ],
              data: {
                url: window.location.origin
              }
            });
          }
        } catch (err) {
          console.error("Error setting up service worker:", err);
        }
      } else {
        console.error("Service workers are not supported in this browser");
      }
    };

    setupNotifications();

    // Test notification after 5 seconds (for debugging)
    const timer = setTimeout(() => {
      console.log("🧪 Testing notification...");
      // Comment this out in production, this is just for testing
      // sendSystemNotification(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Configure audio on load and enable playback after user interaction
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 1.0;

    const enableAudio = () => {
      audio.play().catch((e) => {
        console.error("❌ Could not play audio:", e);
      });
      audio.pause(); // Pause immediately
      window.removeEventListener('click', enableAudio);
    };

    window.addEventListener('click', enableAudio);
    
    return () => {
      window.removeEventListener('click', enableAudio);
    };
  }, []);

  // Simulate oxygen level changes - FOR DEMO ONLY
  // In production, you should replace this with actual sensor data  
  useEffect(() => {
    const interval = setInterval(() => {
      setOxygenLevel(prev => {
        // For testing: force low oxygen level after 10 seconds
        if (Math.random() > 0.9) {
          console.log("🧪 Testing low oxygen level");
          return 26.0; // Force critical level for testing
        }
        
        const newLevel = prev + (Math.random() > 0.5 ? -5 : 3);
        return Math.min(Math.max(newLevel, 20), 100);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track last 100 oxygen readings
  useEffect(() => {
    setReadings(prev => {
      const newReadings = [...prev, oxygenLevel];
      return newReadings.slice(-100);
    });
  }, [oxygenLevel]);

  // Send average oxygen level to backend every hour
  useEffect(() => {
    const interval = setInterval(() => {
      // Your existing code for sending data to backend
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  // Send system notification - both direct and through service worker
  const sendSystemNotification = (isTest = false) => {
    console.log(`Attempting to send notification (${isTest ? 'test' : 'real'})...`);
    console.log(`Current permission status: ${notificationPermission}`);
    
    // Only proceed if permission is granted
    if (notificationPermission !== "granted") {
      console.log("Notification permission not granted");
      return;
    }

    try {
      // Method 1: Direct notification
      if ("Notification" in window) {
        // Close existing notification if any
        if (activeNotification) {
          activeNotification.close();
        }
        
        console.log("📱 Creating direct notification");
        const notificationTitle = isTest ? "TEST NOTIFICATION" : "LOW OXYGEN ALERT";
        const notificationBody = isTest 
          ? "This is a test notification. Click to dismiss."
          : `Oxygen level critically low at ${oxygenLevel.toFixed(1)}%. Immediate action required!`;
        
        const notification = new Notification(notificationTitle, {
          body: notificationBody,
          icon: "/oxygen-alert-icon.png", // Make sure this file exists in public folder
          tag: "oxygen-alert", // Ensures only one notification is shown
          requireInteraction: true, // Keep notification until user interacts with it
        });
        
        notification.onclick = function() {
          console.log("👆 Notification clicked");
          window.focus(); // Focus back to the app
          stopAlarm();
          notification.close();
        };
        
        setActiveNotification(notification);
        console.log("✅ Direct notification created");
      }
      
      // Method 2: Service Worker notification (if available)
      if (swRegistrationRef.current && 'showNotification' in swRegistrationRef.current) {
        console.log("🔔 Creating service worker notification");
        swRegistrationRef.current.showNotification(
          isTest ? "TEST NOTIFICATION (SW)" : "LOW OXYGEN ALERT", 
          {
            body: isTest 
              ? "This is a test notification via service worker. Click to dismiss." 
              : `Oxygen level critically low at ${oxygenLevel.toFixed(1)}%. Immediate action required!`,
            icon: "/oxygen-alert-icon.png",
            badge: "/oxygen-alert-icon.png",
            tag: "oxygen-alert",
            requireInteraction: true,
            actions: [
              {
                action: 'stop-alarm',
                title: 'Stop Alarm'
              }
            ],
            data: {
              url: window.location.origin
            }
          }
        ).then(() => {
          console.log("✅ Service worker notification created");
        }).catch(err => {
          console.error("❌ Error showing notification via service worker:", err);
        });
      } else {
        console.log("ℹ️ Service worker not available for notifications");
      }
    } catch (err) {
      console.error("❌ Error creating notification:", err);
    }
  };

  // Alert logic - FIXED: Now plays sound when oxygen is low
  useEffect(() => {
    console.log(`🔄 Oxygen level: ${oxygenLevel.toFixed(1)}%, Alert showing: ${showAlert}, Alarm sounding: ${alertSounding}, Alarm paused: ${isAlarmPaused}`);
    
    const handleAlarm = async () => {
      if (oxygenLevel < 40 && !isAlarmPaused) {
        console.log("⚠️ Low oxygen detected, activating alert");
        setShowAlert(true);
        
        // Send system notification
        sendSystemNotification();
        
        // Play alarm sound if not already playing and not paused
        if (!alertSounding && audioRef.current && !isAlarmPaused) {
          try {
            console.log("🔊 Playing alarm sound");
            audioRef.current.play()
              .then(() => {
                console.log("✅ Alarm sound playing successfully");
                setAlertSounding(true);
              })
              .catch((err) => {
                console.error("❌ Error playing audio:", err);
              });
          } catch (err) {
            console.error("❌ Error playing audio:", err);
          }
        }
      } else if (oxygenLevel >= 40 || isAlarmPaused) {
        if (alertSounding && audioRef.current) {
          console.log("🔊 Stopping alarm sound - oxygen level now normal or alarm paused");
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setAlertSounding(false);
        }
        
        if (oxygenLevel >= 40) {
          setShowAlert(false);
          
          // Close any active notification
          if (activeNotification) {
            console.log("🔔 Closing notification - oxygen level now normal");
            activeNotification.close();
            setActiveNotification(null);
          }
        }
      }
    };

    handleAlarm();
  }, [oxygenLevel, isAlarmPaused, alertSounding]);

  const stopAlarm = () => {
    console.log("🛑 Stopping alarm");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAlertSounding(false);
    }
    setIsAlarmPaused(true); // Set the alarm paused state

    // Set a timeout to resume oxygen monitoring after 2 minutes
    setTimeout(() => {
      setIsAlarmPaused(false); // Allow monitoring again after 2 minutes
      console.log("Monitoring resumed after 2 minutes.");
    }, 120000); // 120000ms = 2 minutes

    // Close any active notification
    if (activeNotification) {
      activeNotification.close();
      setActiveNotification(null);
    }
  };

  const oxygenColor = getOxygenColor(oxygenLevel);
  const barColorClass =
    oxygenColor === 'red' ? 'bg-red-500' :
    oxygenColor === 'yellow' ? 'bg-yellow-500' :
    'bg-green-500';

  const textColorClass =
    oxygenColor === 'red' ? 'text-red-500' :
    oxygenColor === 'yellow' ? 'text-yellow-500' :
    'text-green-500';

  // For testing purposes only - force show the notification UI
  const testNotificationUI = () => {
    console.log("🧪 Testing notification UI");
    setShowAlert(true);
    sendSystemNotification(true);
  };

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('✅ Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('❌ Service Worker registration failed:', error);
        });
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
          <h1 className="text-white text-3xl font-bold mb-8">Oxygen Level Monitor</h1>
          <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-8 shadow-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl">Current Oxygen Level</h2>
              <span className={`text-2xl font-bold ${textColorClass}`}>
                {oxygenLevel.toFixed(1)}%
              </span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
              <div
                className={`h-4 rounded-full ${barColorClass}`}
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

            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            {isLoading && <p className="text-blue-500 mt-2 text-sm">Sending data...</p>}
            
            {/* Status indicator - shows if alarm is active or paused */}
            {alertSounding && (
              <div className="mt-4 py-1 px-3 bg-red-700 rounded text-white text-sm flex items-center">
                <span className="animate-ping mr-2 inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                Alarm active
              </div>
            )}
            
            {isAlarmPaused && (
              <div className="mt-4 py-1 px-3 bg-yellow-700 rounded text-white text-sm">
                Alarm temporarily paused
              </div>
            )}
          </div>

          {/* Main Alert Popup */}
          {showAlert && !isAlarmPaused && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
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
        </div>
      </div>
    </div>
  );
};

export default OxygenLevel;