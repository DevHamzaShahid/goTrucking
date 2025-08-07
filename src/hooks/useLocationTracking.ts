import { useState, useEffect, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform, Alert, DeviceEventEmitter } from 'react-native';
import { calculateBearing } from '../utils/locationUtils';

interface LocationState {
  latitude: number;
  longitude: number;
  heading: number;
  accuracy: number;
  timestamp: number;
  compassHeading?: number; // Device compass heading (0-360)
}

interface UseLocationTrackingReturn {
  location: LocationState | null;
  isTracking: boolean;
  error: string | null;
  startTracking: () => void;
  stopTracking: () => void;
}

export const useLocationTracking = (): UseLocationTrackingReturn => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const compassWatchId = useRef<number | null>(null);
  const previousLocationRef = useRef<LocationState | null>(null);
  const currentCompassHeading = useRef<number>(0);

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS permissions are handled through Info.plist
  };

  // Start compass tracking with enhanced heading detection
  const startCompassTracking = () => {
    try {
      // Start watching device heading/compass with high frequency updates
      compassWatchId.current = Geolocation.watchPosition(
        (position) => {
          if (position.coords.heading !== null && position.coords.heading !== undefined) {
            const newHeading = position.coords.heading;
            
            // Smooth heading updates to prevent jitter
            if (Math.abs(newHeading - currentCompassHeading.current) > 2) {
              currentCompassHeading.current = newHeading;
              
              // Update location with compass heading immediately for smooth rotation
              setLocation(prev => prev ? {
                ...prev,
                compassHeading: newHeading
              } : null);
            }
          }
        },
        (error) => {
          console.warn('Compass tracking error:', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0, // Get all updates for heading
          interval: 50, // Very fast updates for smooth rotation (50ms)
          fastestInterval: 25, // Even faster for compass
        }
      );
    } catch (error) {
      console.warn('Compass not supported, using GPS heading fallback');
    }
  };

  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) {
      setError('Location permission denied');
      Alert.alert(
        'Permission Required',
        'Please enable location permissions to use this feature.',
      );
      return;
    }

    setError(null);
    setIsTracking(true);
    
    // Start compass tracking
    startCompassTracking();

    // Get initial position
    Geolocation.getCurrentPosition(
      (position) => {
        const newLocation: LocationState = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position.coords.heading || 0,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          compassHeading: currentCompassHeading.current || position.coords.heading || 0,
        };
        setLocation(newLocation);
        previousLocationRef.current = newLocation;
      },
      (error) => {
        console.error('Error getting initial position:', error);
        setError(`Location error: ${error.message}`);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );

    // Start watching position
    watchIdRef.current = Geolocation.watchPosition(
      (position) => {
        const newLocation: LocationState = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position.coords.heading || 0,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          compassHeading: currentCompassHeading.current || position.coords.heading || 0,
        };

        // Calculate bearing if heading is not available
        if (!position.coords.heading && previousLocationRef.current) {
          const bearing = calculateBearing(
            {
              latitude: previousLocationRef.current.latitude,
              longitude: previousLocationRef.current.longitude,
            },
            {
              latitude: newLocation.latitude,
              longitude: newLocation.longitude,
            }
          );
          newLocation.heading = bearing;
        }

        setLocation(newLocation);
        previousLocationRef.current = newLocation;
      },
      (error) => {
        console.error('Error watching position:', error);
        setError(`Location tracking error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1, // Update every 1 meter
        interval: 1000, // Update every second
        fastestInterval: 500,
      }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (compassWatchId.current !== null) {
      Geolocation.clearWatch(compassWatchId.current);
      compassWatchId.current = null;
    }
    setIsTracking(false);
  };

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    location,
    isTracking,
    error,
    startTracking,
    stopTracking,
  };
};