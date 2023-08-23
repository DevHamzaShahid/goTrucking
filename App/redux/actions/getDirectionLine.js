import { config } from "../../config";
import { Axios } from "../../utils/AxiosInstance";
import { GET_DIRECTIONLINE_FAILED, GET_DIRECTIONLINE_REQUEST, GET_DIRECTIONLINE_SUCCESS, RESET_DIRECTIONLINE_STATE } from "../constants/getDirectionLine";

// get Direction line (routing)
export const getDirectionLine = (shipmentId) => async dispatch => {
    try {
        dispatch({
            type: GET_DIRECTIONLINE_REQUEST,
        });
        const { data } = await Axios.get(`${config.SERVER_IP}api/shipping/shippment/location/${shipmentId}`);
        dispatch({
            type: GET_DIRECTIONLINE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_DIRECTIONLINE_FAILED,
            payload: error.message,
        });
    }
};


export const resetDirectionLineState = () => ({
    type: RESET_DIRECTIONLINE_STATE,
  });