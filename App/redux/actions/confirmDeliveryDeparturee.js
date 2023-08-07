import {config} from '../../config';
import {Axios} from '../../utils/AxiosInstance';
import {
  CONFIRMDELIVERYDEPARTURE_FAILED,
  CONFIRMDELIVERYDEPARTURE_REQUEST,
  CONFIRMDELIVERYDEPARTURE_SUCCESS,
} from '../constants/confirmDeliveryDeparture';

// Confirm Delivery Departure
export const confirmDeliveryDeparturee = ids => async dispatch => {
  try {
    dispatch({
      type: CONFIRMDELIVERYDEPARTURE_REQUEST,
    });
    const {data} = await Axios.put(
      `${config.SERVER_IP}api/shipping/shippment/delivery/${ids.shipmentId}/${ids.deliveryId}`,
      {status: ids.status},
    );
    dispatch({
      type: CONFIRMDELIVERYDEPARTURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONFIRMDELIVERYDEPARTURE_FAILED,
      payload: error.message,
    });
  }
};
