import { config } from "../../config";
import { Axios } from "../../utils/AxiosInstance";
import { SHIPMENT_DETAIL_FAILED, SHIPMENT_DETAIL_REQUEST, SHIPMENT_DETAIL_SUCCESS } from "../constants/ShipmentDetail";


//shipment details
export const shipmentDetail = id => async dispatch => {
    try {
        dispatch({
            type: SHIPMENT_DETAIL_REQUEST,
        });
        const { data } = await Axios.get(
            `${config.SERVER_IP}api/shipping/shippment/${id}`
        );
        dispatch({
            type: SHIPMENT_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SHIPMENT_DETAIL_FAILED,
            payload: error.message,
        });
    }
};
