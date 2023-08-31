import { Linking, Platform } from "react-native";
import GetLocation from "react-native-get-location"

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