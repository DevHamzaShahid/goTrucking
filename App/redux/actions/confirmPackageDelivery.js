import { config } from '../../config';
import { Axios } from '../../utils/AxiosInstance';
import {
  CONFIRMPACKAGE_DELIVERY_FAILED,
  CONFIRMPACKAGE_DELIVERY_REQUEST,
  CONFIRMPACKAGE_DELIVERY_SUCCESS,
} from '../constants/confirmPackageDelivery';

// Confirm pickup packages
export const confirmDeliveryPackages = ids => async dispatch => {
  try {
    dispatch({
      type: CONFIRMPACKAGE_DELIVERY_REQUEST,
    });
    const {data} = await Axios.put(
      `${config.SERVER_IP}api/shipping/shippment/${ids.shipmentId}/packages/${ids.delivering_id}/delivered`,
    );
    dispatch({
      type: CONFIRMPACKAGE_DELIVERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONFIRMPACKAGE_DELIVERY_FAILED,
      payload: error.message,
    });
  }
};
