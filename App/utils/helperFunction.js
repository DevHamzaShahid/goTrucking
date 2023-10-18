import { Linking, Platform } from "react-native";
import GetLocation from "react-native-get-location"
import { GoogleMapKey } from "./keys";

export const fetchMyLocation = async () => {
  try {
    const location = await GetLocation?.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000, // Set a timeout of 15 seconds
      maximumAge: 1000,
    });
    return location;
  } catch (error) {
    // Handle the error here
    console.error("Location error:", error);
    throw error; // Rethrow the error to be caught where the function is called
  }
};

export const openGoogleMaps = (latitude, longitude) => {
  if (Platform.OS === 'android') {
    // const url = `geo:${latitude},${longitude}`;
    const url = `google.navigation:q=${latitude}+${longitude}`
    Linking.openURL(url);
  } else if (Platform.OS === 'ios') {
    Linking.openURL(`maps://app?daddr=${latitude},${longitude}&dirflg=d&t=m`)
  }
};

// default account image
export const defaultImage =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';


// export const openGoogleMaps = (latitude, longitude) => {
//   Linking.openURL(`maps://app?daddr=${latitude},${longitude}&dirflg=d&t=m`)
// };
// export const fetchMyLocation = () => {
//   try {
//     const location = GetLocation?.getCurrentPosition({ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
//     return location
//   } catch (error) {
//     alert(error);
//     // return error
//   }
// }
// export const fetchMyLocation = async (maxRetries = 3) => {
//   let retries = 0;

//   while (retries < maxRetries) {
//     try {
//       const location = await GetLocation?.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 10000,
//       });
//       return location;
//     } catch (error) {
//       if (error.code === 'TIMEOUT') {
//         console.log(`Location fetch attempt ${retries + 1} timed out.`);
//         retries++;
//       } else {
//         throw error; // Rethrow other errors
//       }
//     }
//   }

//   throw new Error(`Failed to fetch location after ${maxRetries} attempts.`);
// };



export const getDriversLocationCity = async () => {
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
    });

    const { latitude, longitude } = location;

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleMapKey}`);
    const result = await response.json();
    console.log("result<<<<<", result);
    const cityComponent = result.results[0].address_components.find(
      (component) => component.types.includes('locality')
    );

    if (cityComponent) {
      const city = cityComponent.long_name;
      return city;
    } else {
      console.error('City not found in geocoding data');
      return null; // Return null or handle the error appropriately
    }
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    return null; // Return null or handle the error appropriately
  }
};
