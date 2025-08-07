# Google Maps-Like React Native App

A React Native application that mimics Google Maps functionality with features like real-time location tracking, nearby restaurant discovery, custom markers, direction lines, and smooth camera animations.

## 🚀 Features

- **Real-time Location Tracking**: GPS-based location tracking with custom arrow marker
- **Custom Markers**: Rotating arrow marker that follows movement direction
- **Restaurant Discovery**: Shows nearby restaurants and eateries with mock data
- **Direction Lines**: Curved direction lines to nearest restaurants
- **Smooth Camera Animation**: Google Maps-like camera movement and transitions
- **Interactive UI**: Touch controls for navigation and restaurant selection
- **Distance Calculations**: Real-time distance calculations using Haversine formula
- **Restaurant Details**: Detailed information about each restaurant including ratings

## 📱 Screenshots

The app displays:
- Interactive map with custom markers
- User location with rotating arrow indicator
- Nearby restaurants with emoji markers and ratings
- Direction lines with different colors
- Control buttons for various functions
- Status bar showing tracking information

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (>= 16.0.0)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- Google Maps API Key

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Google Maps API Key

#### For Android:
1. Open `android/app/src/main/AndroidManifest.xml`
2. Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual Google Maps API key

#### For iOS:
1. You'll need to configure Google Maps in your iOS project
2. Add your API key to the iOS configuration

### Step 3: Install iOS Pods (iOS only)

```bash
cd ios && pod install && cd ..
```

### Step 4: Run the Application

#### Android:
```bash
npm run android
```

#### iOS:
```bash
npm run ios
```

## 🏗️ Project Structure

```
src/
├── components/
│   └── CustomMarkers.tsx      # Custom marker components
├── data/
│   └── mockData.ts           # Mock restaurant data
├── hooks/
│   └── useLocationTracking.ts # Location tracking hook
├── screens/
│   └── MapScreen.tsx         # Main map screen
└── utils/
    └── locationUtils.ts      # Location utility functions
```

## 🎮 How to Use

1. **Start Location Tracking**: Tap the "▶️ Start" button to begin GPS tracking
2. **View Nearby Restaurants**: Restaurants will automatically appear as markers on the map
3. **Show Directions**: Tap "🗺️ Directions" to show direction lines to nearest restaurants
4. **Select Restaurant**: Tap any restaurant marker to view details and get directions
5. **Center on Location**: Use "📍 Center" to center the map on your current location
6. **Clear Directions**: Use "🧹 Clear" to remove all direction lines

## 🔧 Key Components

### CustomMarkers.tsx
- `ArrowMarker`: Rotating arrow marker for user location
- `RestaurantMarker`: Custom markers for restaurants with ratings

### useLocationTracking.ts
- Real-time GPS location tracking
- Permission handling for Android and iOS
- Bearing calculation for marker rotation

### MapScreen.tsx
- Main map interface
- Camera animation logic
- Restaurant discovery and direction rendering

### locationUtils.ts
- Distance calculation using Haversine formula
- Bearing calculation between coordinates
- Direction line generation (straight and curved paths)

## 📊 Mock Data

The app includes mock restaurant data with:
- 10+ different restaurants and eateries
- Various types: restaurants, cafes, fast food, bakeries, street food
- Ratings, descriptions, and emoji representations
- Coordinates around San Francisco (customizable)

## 🎨 Customization

### Change Location
Update `DEFAULT_LOCATION` in `src/data/mockData.ts` to your preferred area:

```typescript
export const DEFAULT_LOCATION = {
  latitude: YOUR_LATITUDE,
  longitude: YOUR_LONGITUDE,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
```

### Add More Restaurants
Add new entries to the `mockRestaurants` array in `src/data/mockData.ts`.

### Customize Markers
Modify marker styles and colors in `src/components/CustomMarkers.tsx`.

## 🔐 Permissions

The app requires the following permissions:

### Android
- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`
- `ACCESS_BACKGROUND_LOCATION`
- `INTERNET`
- `ACCESS_NETWORK_STATE`

### iOS
- `NSLocationWhenInUseUsageDescription`
- `NSLocationAlwaysAndWhenInUseUsageDescription`
- `NSLocationAlwaysUsageDescription`

## 🚨 Troubleshooting

### Common Issues

1. **Location not working**: Ensure location permissions are granted
2. **Maps not loading**: Check if Google Maps API key is properly configured
3. **Build errors**: Make sure all dependencies are installed and linked properly

### Android Specific
- Enable location services in device settings
- Check if Google Play Services is installed

### iOS Specific
- Ensure location permissions are granted in iOS settings
- Check if the app has proper provisioning profile

## 🔄 Future Enhancements

- Real backend integration for restaurant data
- Turn-by-turn navigation
- Voice guidance
- Search functionality
- Filters for restaurant types
- User reviews and ratings
- Offline map support
- Route optimization

## 📝 License

This project is for educational purposes. Make sure to comply with Google Maps API terms of service when using in production.

## 🤝 Contributing

Feel free to submit issues, feature requests, and pull requests to improve the application.

---

**Note**: This app uses mock data for restaurants. In a production environment, you would integrate with real restaurant APIs or databases.