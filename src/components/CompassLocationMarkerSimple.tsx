import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Marker } from 'react-native-maps';

interface CompassLocationMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  heading: number;
  compassHeading?: number;
  accuracy?: number;
  isNavigating?: boolean;
  showFOV?: boolean;
}

export const CompassLocationMarker: React.FC<CompassLocationMarkerProps> = ({
  coordinate,
  heading,
  compassHeading,
  accuracy = 10,
  isNavigating = false,
  showFOV = true,
}) => {
  // Use compass heading if available, otherwise fall back to GPS heading
  const displayHeading = compassHeading !== undefined ? compassHeading : heading;
  
  // Animated values for smooth rotation
  const rotationAnim = useRef(new Animated.Value(displayHeading)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fovOpacityAnim = useRef(new Animated.Value(0.3)).current;

  // Animate rotation smoothly
  useEffect(() => {
    // Calculate shortest rotation path to prevent long rotations
    const currentRotation = rotationAnim._value;
    let targetRotation = displayHeading;
    
    // Normalize angles (e.g., 359° to 1° should rotate 2°, not 358°)
    const diff = targetRotation - currentRotation;
    if (diff > 180) {
      targetRotation -= 360;
    } else if (diff < -180) {
      targetRotation += 360;
    }

    Animated.timing(rotationAnim, {
      toValue: targetRotation,
      duration: 250, // Smooth but responsive
      useNativeDriver: true,
    }).start();
  }, [displayHeading]);

  // Pulse animation for navigation mode
  useEffect(() => {
    if (isNavigating) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      
      return () => pulseAnimation.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isNavigating]);

  // FOV animation
  useEffect(() => {
    if (showFOV) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fovOpacityAnim, {
            toValue: 0.15,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(fovOpacityAnim, {
            toValue: 0.35,
            duration: 2500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [showFOV]);

  // Calculate accuracy circle size
  const accuracyRadius = Math.min(Math.max(accuracy * 1.5, 40), 120);

  return (
    <Marker
      coordinate={coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      flat={true}
      zIndex={2000}
    >
      <View style={styles.markerContainer}>
        {/* Accuracy Circle */}
        <View 
          style={[
            styles.accuracyCircle, 
            { 
              width: accuracyRadius, 
              height: accuracyRadius,
              borderRadius: accuracyRadius / 2,
            }
          ]} 
        />

        {/* Field of View Cone */}
        {showFOV && (
          <Animated.View
            style={[
              styles.fovCone,
              {
                opacity: fovOpacityAnim,
                transform: [
                  { 
                    rotate: rotationAnim.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    })
                  },
                ],
              },
            ]}
          >
            {/* FOV Cone using CSS transforms - creates a triangular cone */}
            <View style={styles.fovTriangle} />
          </Animated.View>
        )}

        {/* Main Location Marker */}
        <Animated.View
          style={[
            styles.locationMarker,
            {
              transform: [
                { scale: pulseAnim },
                { 
                  rotate: rotationAnim.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  })
                },
              ],
            },
          ]}
        >
          {/* Outer Ring */}
          <View style={styles.outerRing}>
            {/* Inner Blue Dot */}
            <View style={styles.innerDot}>
              {/* Directional Arrow */}
              <View style={styles.arrowPointer} />
            </View>
          </View>

          {/* Navigation Pulse Ring */}
          {isNavigating && (
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  opacity: pulseAnim.interpolate({
                    inputRange: [1, 1.15],
                    outputRange: [0.7, 0.2],
                  }),
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            />
          )}
        </Animated.View>

        {/* North Indicator */}
        <Animated.View
          style={[
            styles.northIndicator,
            {
              transform: [{ 
                rotate: rotationAnim.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                })
              }],
            },
          ]}
        >
          <View style={styles.northDot} />
        </Animated.View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accuracyCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(66, 133, 244, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(66, 133, 244, 0.25)',
  },
  fovCone: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fovTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(66, 133, 244, 0.2)',
    transform: [{ translateY: -15 }], // Position above center
  },
  locationMarker: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  outerRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 3,
    borderColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  innerDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4285F4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  arrowPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ translateY: -4 }], // Position arrow pointing up
  },
  pulseRing: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#4285F4',
    backgroundColor: 'transparent',
  },
  northIndicator: {
    position: 'absolute',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  northDot: {
    position: 'absolute',
    top: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF5722',
    shadowColor: '#FF5722',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
});