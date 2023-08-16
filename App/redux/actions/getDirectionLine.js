import { config } from "../../config";
import { Axios } from "../../utils/AxiosInstance";
import { GET_DIRECTIONLINE_FAILED, GET_DIRECTIONLINE_REQUEST, GET_DIRECTIONLINE_SUCCESS } from "../constants/getDirectionLine";

// get Direction line (routing)
export const getDirectionLine = (shipmentId) => async dispatch => {
    try {
        dispatch({
            type: GET_DIRECTIONLINE_REQUEST,
        });
        const { data } = await Axios.get(`${config.SERVER_IP}api/shipping/shippment/64d811ae504fb5002159b915`);
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
