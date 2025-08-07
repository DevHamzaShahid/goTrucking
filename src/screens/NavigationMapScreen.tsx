import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import MapView, { Polyline, Region } from 'react-native-maps';
import { WaypointMarker, UserLocationMarker } from '../components/WaypointMarkers';
import { useLocationTracking } from '../hooks/useLocationTracking';
import { useNavigationCamera } from '../hooks/useNavigationCamera';
import { useWaypointNavigation } from '../hooks/useWaypointNavigation';
import { navigationWaypoints, NAVIGATION_SETTINGS } from '../data/waypointsData';
import DirectionsService from '../services/DirectionsService';
import { calculateBearing, calculateDistance } from '../utils/locationUtils';

const { width, height } = Dimensions.get('window');

const NavigationMapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const directionsService = useRef(new DirectionsService()).current;
  
  // Location tracking
  const { location, isTracking, error, startTracking, stopTracking } = useLocationTracking();
  
  // Camera management
  const {
    cameraState,
    isAnimating,
    rotateToNorth,
    followLocation,
    focusOnRoute,
    animateToLocation,
    setBearing,
  } = useNavigationCamera(mapRef);
  
  // Waypoint navigation
  const {
    waypoints,
    navigationState,
    startNavigation,
    stopNavigation,
    selectWaypoint,
    markWaypointCompleted,
    markWaypointSkipped,
    updateUserLocation,
    recalculateRoute,
  } = useWaypointNavigation(navigationWaypoints, directionsService);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  // State for UI
  const [showWaypointList, setShowWaypointList] = useState(false);
  const [compassBearing, setCompassBearing] = useState(0);

  useEffect(() => {
    // Start location tracking and animate UI
    startTracking();
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      stopTracking();
      stopNavigation();
    };
  }, []);

  // Update navigation when location changes
  useEffect(() => {
    if (location) {
      updateUserLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      // Calculate bearing for compass
      if (location.compassHeading !== undefined) {
        setCompassBearing(location.compassHeading);
      } else if (location.heading) {
        setCompassBearing(location.heading);
      }

      // Follow location if navigating
      if (navigationState.isNavigating) {
        followLocation(
          { latitude: location.latitude, longitude: location.longitude },
          location.compassHeading || location.heading
        );
      }
    }
  }, [location, navigationState.isNavigating, updateUserLocation, followLocation]);

  // Initial map centering on nearest waypoint
  useEffect(() => {
    if (location && !navigationState.isNavigating && mapRef.current) {
      const nearestWaypoint = findNearestWaypoint({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (nearestWaypoint) {
        // Center map to show both user location and nearest waypoint
        const centerLat = (location.latitude + nearestWaypoint.latitude) / 2;
        const centerLng = (location.longitude + nearestWaypoint.longitude) / 2;
        const deltaLat = Math.abs(location.latitude - nearestWaypoint.latitude) * 1.5;
        const deltaLng = Math.abs(location.longitude - nearestWaypoint.longitude) * 1.5;

        const region = {
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta: Math.max(deltaLat, 0.01),
          longitudeDelta: Math.max(deltaLng, 0.01),
        };

        mapRef.current.animateToRegion(region, 1000);
        
        // Auto-start navigation to nearest waypoint
        setTimeout(() => {
          selectWaypoint(nearestWaypoint.id);
        }, 1500);
      }
    }
  }, [location, navigationState.isNavigating, findNearestWaypoint, selectWaypoint]);

  // Auto-rotate camera to north after turns
  useEffect(() => {
    if (navigationState.isNavigating && location?.heading !== undefined) {
      const headingChange = Math.abs(location.heading - compassBearing);
      
      // If significant turn detected, rotate to north after a delay
      if (headingChange > 30) {
        setTimeout(() => {
          rotateToNorth(true);
        }, 2000);
      }
    }
  }, [location?.heading, navigationState.isNavigating, rotateToNorth, compassBearing]);

  // Find nearest waypoint to user location
  const findNearestWaypoint = useCallback((userLocation: { latitude: number; longitude: number }) => {
    if (!waypoints.length) return null;
    
    let nearest = waypoints[0];
    let minDistance = calculateDistance(userLocation, {
      latitude: nearest.latitude,
      longitude: nearest.longitude,
    });

    for (const waypoint of waypoints.slice(1)) {
      const distance = calculateDistance(userLocation, {
        latitude: waypoint.latitude,
        longitude: waypoint.longitude,
      });
      
      if (distance < minDistance) {
        minDistance = distance;
        nearest = waypoint;
      }
    }

    return nearest;
  }, [waypoints]);

  // Handle waypoint marker press
  const handleWaypointPress = useCallback((waypointId: string) => {
    const waypoint = waypoints.find(wp => wp.id === waypointId);
    if (!waypoint) return;

    Alert.alert(
      waypoint.name,
      `${waypoint.description}\n\nType: ${waypoint.type.replace('_', ' ')}\nStatus: ${waypoint.status}`,
      [
        { text: 'Cancel', style: 'cancel' },
        ...(waypoint.status !== 'completed' ? [
          { text: 'Navigate Here', onPress: () => selectWaypoint(waypointId) },
        ] : []),
        ...(waypoint.status === 'active' ? [
          { text: 'Mark Complete', onPress: () => markWaypointCompleted(waypointId) },
          { text: 'Skip', onPress: () => markWaypointSkipped(waypointId) },
        ] : []),
      ]
    );
  }, [waypoints, selectWaypoint, markWaypointCompleted, markWaypointSkipped]);

  // Recenter button behavior
  const handleRecenter = useCallback(() => {
    if (!location) {
      Alert.alert('Location Required', 'Please wait for location to be available.');
      return;
    }

    // Find nearest waypoint
    const nearestWaypoint = findNearestWaypoint({
      latitude: location.latitude,
      longitude: location.longitude,
    });

    // Center on user location with same behavior as initial view
    followLocation(
      { latitude: location.latitude, longitude: location.longitude },
      location.compassHeading || location.heading
    );

    // Start navigation to nearest waypoint
    if (nearestWaypoint && !navigationState.isNavigating) {
      selectWaypoint(nearestWaypoint.id);
    } else if (navigationState.isNavigating) {
      // Recalculate current route
      recalculateRoute();
    }
  }, [location, findNearestWaypoint, followLocation, selectWaypoint, navigationState.isNavigating, recalculateRoute]);

  // Get route polyline color
  const getRouteColor = () => {
    return navigationState.currentWaypoint?.color || '#007AFF';
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <Animated.View style={[styles.mapContainer, { opacity: fadeAnim }]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 37.7849,
            longitude: -122.4094,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
          mapType="standard"
          pitchEnabled={true}
          rotateEnabled={true}
          zoomEnabled={true}
          scrollEnabled={true}
        >
          {/* User location marker */}
          {location && (
            <UserLocationMarker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              heading={location.heading}
              compassHeading={location.compassHeading}
              isNavigating={navigationState.isNavigating}
            />
          )}

          {/* Waypoint markers */}
          {waypoints.map((waypoint) => (
            <WaypointMarker
              key={waypoint.id}
              waypoint={waypoint}
              onPress={() => handleWaypointPress(waypoint.id)}
              isActive={waypoint.id === navigationState.currentWaypoint?.id}
            />
          ))}

          {/* Active route */}
          {navigationState.activeRoute && (
            <Polyline
              coordinates={navigationState.activeRoute}
              strokeColor={getRouteColor()}
              strokeWidth={6}
              strokePattern={[20, 10]}
              lineDashPhase={0}
            />
          )}
        </MapView>
      </Animated.View>

      {/* Recenter Button */}
      <Animated.View 
        style={[
          styles.recenterContainer, 
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <TouchableOpacity
          style={styles.recenterButton}
          onPress={handleRecenter}
        >
          <Text style={styles.recenterButtonText}>📍 Recenter</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Minimal Status Display */}
      {navigationState.currentWaypoint && (
        <View style={styles.statusContainer}>
          <View style={styles.statusBar}>
            <Text style={styles.activeWaypointText}>
              → {navigationState.currentWaypoint.name}
            </Text>
            
            {navigationState.routeInfo && (
              <Text style={styles.routeInfoText}>
                📏 {navigationState.routeInfo.distance} • ⏱️ {navigationState.routeInfo.duration}
              </Text>
            )}
          </View>
        </View>
      )}

      {/* Error Display */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 15,
    margin: 10,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  map: {
    flex: 1,
  },
  recenterContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  recenterButton: {
    backgroundColor: '#4285F4', // Google blue
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  recenterButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
  },
  statusBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activeWaypointText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  routeInfoText: {
    color: '#4ECDC4',
    fontSize: 14,
    textAlign: 'center',
  },
  errorContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NavigationMapScreen;