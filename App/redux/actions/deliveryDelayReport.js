import { config } from "../../config";
import { Axios } from "../../utils/AxiosInstance";
import { DELIVERY_DELAYREPORT_FAILED, DELIVERY_DELAYREPORT_REQUEST, DELIVERY_DELAYREPORT_SUCCESS } from "../constants/delayReport";

// send pickup delay report
export const deliveryDelayReport = ids => async dispatch => {

    try {
        dispatch({
            type: DELIVERY_DELAYREPORT_REQUEST,
        });
        const { data } = await Axios.put(
            `${config.SERVER_IP}api/shipping/shippment/pickup/${ids.shipmentId}/${ids.deliveryId}`,
            { status: ids.status, delayTime: ids.delayTime },
        );
        dispatch({
            type: DELIVERY_DELAYREPORT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELIVERY_DELAYREPORT_FAILED,
            payload: error.message,
        });
    }
};
