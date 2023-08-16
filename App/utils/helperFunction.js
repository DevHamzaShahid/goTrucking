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