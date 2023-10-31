import { config } from "../../config";
import { Axios } from "../../utils/AxiosInstance";
import { ADDLIVE_LOCATION_FAILED, ADDLIVE_LOCATION_REQUEST, ADDLIVE_LOCATION_SUCCESS } from "../constants/liveLocation";

//send live location
export const sendLiveLocation = (body) => async dispatch => {
    try {
        dispatch({
            type: ADDLIVE_LOCATION_REQUEST,
        });
        const { data } = await Axios.post(
            `${config.SERVER_IP}api/shipping/update-driver-location`,body
        );
        dispatch({
            type: ADDLIVE_LOCATION_SUCCESS,
            payload: data,
        });
        console.log("location sent response?>>>>>>",data);
    } catch (error) {
        dispatch({
            type: ADDLIVE_LOCATION_FAILED,
            payload: error.message,
        });
    }
};