import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Marker } from 'react-native-maps';
import Svg, { Path, Defs, RadialGradient, Stop } from 'react-native-svg';

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
  
  // Animated value for smooth rotation
  const rotationAnim = useRef(new Animated.Value(displayHeading)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fovOpacityAnim = useRef(new Animated.Value(0.3)).current;

  // Animate rotation smoothly
  useEffect(() => {
    // Calculate shortest rotation path
    const currentRotation = rotationAnim._value;
    let targetRotation = displayHeading;
    
    // Normalize angles to prevent long rotations (e.g., 359° to 1°)
    const diff = targetRotation - currentRotation;
    if (diff > 180) {
      targetRotation -= 360;
    } else if (diff < -180) {
      targetRotation += 360;
    }

    Animated.timing(rotationAnim, {
      toValue: targetRotation,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [displayHeading]);

  // Pulse animation for navigation mode
  useEffect(() => {
    if (isNavigating) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
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
            toValue: 0.2,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fovOpacityAnim, {
            toValue: 0.4,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [showFOV]);

  // Calculate accuracy circle size (minimum 30, maximum 100)
  const accuracyRadius = Math.min(Math.max(accuracy * 2, 30), 100);

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
              styles.fovContainer,
              {
                opacity: fovOpacityAnim,
                transform: [{ rotate: rotationAnim.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }) }],
              },
            ]}
          >
            <Svg width={120} height={120} style={styles.fovSvg}>
              <Defs>
                <RadialGradient id="fovGradient" cx="50%" cy="50%" r="50%">
                  <Stop offset="0%" stopColor="#4285F4" stopOpacity="0.4" />
                  <Stop offset="70%" stopColor="#4285F4" stopOpacity="0.2" />
                  <Stop offset="100%" stopColor="#4285F4" stopOpacity="0.1" />
                </RadialGradient>
              </Defs>
              {/* FOV Cone - 60 degree field of view */}
              <Path
                d="M 60 60 L 60 10 A 50 50 0 0 1 86.6 35 Z"
                fill="url(#fovGradient)"
                stroke="#4285F4"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
            </Svg>
          </Animated.View>
        )}

        {/* Main Location Marker */}
        <Animated.View
          style={[
            styles.locationMarker,
            {
              transform: [
                { scale: pulseAnim },
                { rotate: rotationAnim.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }) },
              ],
            },
          ]}
        >
          {/* Outer Ring */}
          <View style={styles.outerRing}>
            {/* Inner Blue Dot */}
            <View style={styles.innerDot}>
              {/* Directional Arrow */}
              <View style={styles.arrowContainer}>
                <Svg width={20} height={20} style={styles.arrowSvg}>
                  <Defs>
                    <RadialGradient id="arrowGradient" cx="50%" cy="30%" r="70%">
                      <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                      <Stop offset="100%" stopColor="#E3F2FD" stopOpacity="0.9" />
                    </RadialGradient>
                  </Defs>
                  {/* Arrow pointing north */}
                  <Path
                    d="M 10 2 L 6 12 L 10 10 L 14 12 Z"
                    fill="url(#arrowGradient)"
                    stroke="#1976D2"
                    strokeWidth="0.5"
                  />
                </Svg>
              </View>
            </View>
          </View>

          {/* Navigation Pulse Ring */}
          {isNavigating && (
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  opacity: pulseAnim.interpolate({
                    inputRange: [1, 1.2],
                    outputRange: [0.6, 0.2],
                  }),
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            />
          )}
        </Animated.View>

        {/* Heading Indicator (Small compass rose) */}
        <Animated.View
          style={[
            styles.headingIndicator,
            {
              transform: [{ rotate: rotationAnim.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }) }],
            },
          ]}
        >
          <View style={styles.northIndicator}>
            <View style={styles.northDot} />
          </View>
        </Animated.View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accuracyCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(66, 133, 244, 0.3)',
  },
  fovContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fovSvg: {
    position: 'absolute',
  },
  locationMarker: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  outerRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  innerDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4285F4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  arrowContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowSvg: {
    position: 'absolute',
  },
  pulseRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4285F4',
    backgroundColor: 'transparent',
  },
  headingIndicator: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  northIndicator: {
    position: 'absolute',
    top: 5,
    width: 6,
    height: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  northDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF5722',
    shadowColor: '#FF5722',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
  },
});