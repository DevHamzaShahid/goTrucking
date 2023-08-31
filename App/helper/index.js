import { config } from "../config";
import { Axios } from "../utils/AxiosInstance";
import messaging from "@react-native-firebase/messaging"

export const isValidEmail = (email) => {
    const emailRegex = /^[a-z0-9._-][a-z0-9._-]*@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailRegex.test(email);
}

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\-_=|\\]{8,}$/;
    return passwordRegex.test(password);
}


export const getFCMToken = async () => {
    (async () => {
        try {
          await messaging().registerDeviceForRemoteMessages();
          const fcmToken = await messaging().getToken();
          console.log("token>>>>>>", fcmToken);
          if (fcmToken) {
            // Introduce a delay before making the API call
            setTimeout(async () => {
              try {
                const resp = await Axios.patch(
                  `${config.SERVER_IP}api/users/registerFCMToken`,
                  { fcmToken }
                );
                console.log("token respo", resp);
              } catch (error) {
                console.log("API call error:", error);
              }
            }, 3000); // Adjust the delay as needed
          }
        } catch (error) {
          console.log("token not updated:", error);
        }
      }
      )();
};