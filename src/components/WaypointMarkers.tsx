import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import { Waypoint } from '../data/waypointsData';

interface WaypointMarkerProps {
  waypoint: Waypoint;
  onPress?: () => void;
  isActive?: boolean;
}

interface UserLocationMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  heading: number;
  compassHeading?: number;
  isNavigating?: boolean;
}

export const WaypointMarker: React.FC<WaypointMarkerProps> = ({ 
  waypoint, 
  onPress,
  isActive = false
}) => {
  const getMarkerStyle = () => {
    switch (waypoint.status) {
      case 'completed':
        return {
          backgroundColor: '#27AE60',
          borderColor: '#1E8449',
          opacity: 0.8,
        };
      case 'active':
        return {
          backgroundColor: waypoint.color,
          borderColor: '#E74C3C',
          borderWidth: 4,
          transform: [{ scale: 1.2 }],
        };
      case 'skipped':
        return {
          backgroundColor: '#95A5A6',
          borderColor: '#7F8C8D',
          opacity: 0.6,
        };
      default: // pending
        return {
          backgroundColor: waypoint.color,
          borderColor: '#FFFFFF',
          borderWidth: 3,
        };
    }
  };

  const getStatusIcon = () => {
    switch (waypoint.status) {
      case 'completed':
        return '✅';
      case 'active':
        return '🎯';
      case 'skipped':
        return '⏭️';
      default:
        return waypoint.icon;
    }
  };

  return (
    <Marker
      coordinate={{
        latitude: waypoint.latitude,
        longitude: waypoint.longitude,
      }}
      onPress={onPress}
      zIndex={waypoint.status === 'active' ? 1000 : waypoint.priority}
    >
      <View style={[styles.waypointMarker, getMarkerStyle()]}>
        <Text style={styles.waypointIcon}>
          {getStatusIcon()}
        </Text>
        
        {/* Priority badge */}
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityText}>{waypoint.priority}</Text>
        </View>
        
        {/* Status indicator */}
        {waypoint.status === 'active' && (
          <View style={styles.activeIndicator}>
            <View style={styles.activeRing} />
          </View>
        )}
      </View>
      
      {/* Waypoint info callout */}
      <View style={[styles.callout, isActive && styles.activeCallout]}>
        <Text style={styles.waypointName} numberOfLines={1}>
          {waypoint.name}
        </Text>
        <View style={styles.waypointDetails}>
          <Text style={styles.waypointType}>
            {waypoint.type.replace('_', ' ').toUpperCase()}
          </Text>
          {waypoint.estimatedTime && (
            <Text style={styles.estimatedTime}>
              {waypoint.estimatedTime}
            </Text>
          )}
        </View>
        {waypoint.status === 'active' && (
          <View style={styles.activeIndicatorText}>
            <Text style={styles.activeText}>NAVIGATING</Text>
          </View>
        )}
      </View>
    </Marker>
  );
};

export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ 
  coordinate, 
  heading,
  compassHeading,
  isNavigating = false
}) => {
  // Use compass heading if available, otherwise fall back to GPS heading
  const displayHeading = compassHeading !== undefined ? compassHeading : heading;
  
  return (
    <Marker
      coordinate={coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      flat={true}
      rotation={displayHeading}
      zIndex={2000}
    >
      <View style={[
        styles.userLocationMarker,
        isNavigating && styles.navigatingMarker
      ]}>
        {/* Blue circle background like Google Maps */}
        <View style={styles.userLocationBackground}>
          <View style={styles.userLocationInner}>
            {/* Direction arrow that rotates with compass */}
            <View style={styles.directionArrowContainer}>
              <View style={styles.directionArrow}>
                <Text style={styles.arrowIcon}>▲</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Accuracy circle */}
        <View style={styles.accuracyRing} />
        
        {/* Navigation pulse effect */}
        {isNavigating && (
          <>
            <View style={[styles.pulseRing, styles.pulseRing1]} />
            <View style={[styles.pulseRing, styles.pulseRing2]} />
          </>
        )}
      </View>
    </Marker>
  );
};

// Route progress indicator
export const RouteProgressMarker: React.FC<{
  coordinate: { latitude: number; longitude: number };
  progress: number; // 0 to 1
}> = ({ coordinate, progress }) => {
  return (
    <Marker
      coordinate={coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      zIndex={500}
    >
      <View style={styles.progressMarker}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  waypointMarker: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  waypointIcon: {
    fontSize: 28,
    textAlign: 'center',
  },
  priorityBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    top: -15,
    left: -15,
    right: -15,
    bottom: -15,
    borderRadius: 45,
  },
  activeRing: {
    flex: 1,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#E74C3C',
    backgroundColor: 'transparent',
  },
  callout: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    minWidth: 120,
    maxWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeCallout: {
    borderColor: '#E74C3C',
    borderWidth: 2,
  },
  waypointName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  waypointDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  waypointType: {
    fontSize: 10,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  estimatedTime: {
    fontSize: 10,
    color: '#27AE60',
    fontWeight: '600',
  },
  activeIndicatorText: {
    marginTop: 4,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  userLocationMarker: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigatingMarker: {
    width: 70,
    height: 70,
  },
  userLocationBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(66, 133, 244, 0.2)', // Google blue with transparency
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userLocationInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4285F4', // Google blue
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  directionArrowContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  accuracyRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(66, 133, 244, 0.3)',
    top: -8,
    left: -8,
  },
  pulseRing: {
    position: 'absolute',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
  pulseRing1: {
    width: 60,
    height: 60,
    top: -5,
    left: -5,
    opacity: 0.6,
  },
  pulseRing2: {
    width: 80,
    height: 80,
    top: -15,
    left: -15,
    opacity: 0.3,
  },
  progressMarker: {
    width: 20,
    height: 4,
    backgroundColor: '#BDC3C7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 2,
  },
});