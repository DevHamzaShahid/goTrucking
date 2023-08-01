import GetLocation from "react-native-get-location"


export const fetchMyLocation=async()=>{
    try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        return location
      } catch (error) {
        alert(error);
        return error
      }
}