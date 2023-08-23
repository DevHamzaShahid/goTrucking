import { config } from "../../config";
import { Axios } from "../../utils/AxiosInstance";
import { PICKUP_DELAYREPORT_FAILED, PICKUP_DELAYREPORT_REQUEST, PICKUP_DELAYREPORT_SUCCESS } from "../constants/delayReport";

// send pickup delay report
export const pickupDelayReport = ids => async dispatch => {
    try {
        dispatch({
            type: PICKUP_DELAYREPORT_REQUEST,
        });
        const { data } = await Axios.put(
            `${config.SERVER_IP}api/shipping/shippment/pickup/${ids.shipmentId}/${ids.pickup_Id}`,
            { status: ids.status, delayTime: ids.delayTime },
        );
        dispatch({
            type: PICKUP_DELAYREPORT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PICKUP_DELAYREPORT_FAILED,
            payload: error.message,
        });
    }
};
