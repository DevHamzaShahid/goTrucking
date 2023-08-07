import {config} from '../../config';
import {Axios} from '../../utils/AxiosInstance';
import {
  CONFIRM_PICKUP_DEPARTURE_FAILED,
  CONFIRM_PICKUP_DEPARTURE_REQUEST,
  CONFIRM_PICKUP_DEPARTURE_SUCCESS,
} from '../constants/ConfirmPickupDeparture';

// Confirm pickup Departure
export const confirmPickupDeparturee = ids => async dispatch => {
  try {
    dispatch({
      type: CONFIRM_PICKUP_DEPARTURE_REQUEST,
    });
    const {data} = await Axios.put(
      `${config.SERVER_IP}api/shipping/shippment/pickup/${ids.shipmentId}/${ids.pickup_Id}`,
      {status: ids.status},
    );
    dispatch({
      type: CONFIRM_PICKUP_DEPARTURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONFIRM_PICKUP_DEPARTURE_FAILED,
      payload: error.message,
    });
  }
};
