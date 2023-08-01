import {config} from '../../config';
import {Axios} from '../../utils/AxiosInstance';
import {
  CONFIRMPACKAGE_PICKUP_FAILED,
  CONFIRMPACKAGE_PICKUP_REQUEST,
  CONFIRMPACKAGE_PICKUP_SUCCESS,
} from '../constants/confirmPackagePickup';

// Confirm pickup packages
export const confirmPickupPackages = ids => async dispatch => {
  try {
    dispatch({
      type: CONFIRMPACKAGE_PICKUP_REQUEST,
    });
    const {data} = await Axios.put(
      `${config.SERVER_IP}api/shipping/shippment/${ids.shipmentId}/packages/${ids.pickUp_id}/confirm`,
    );
    console.log('put data', data);
    dispatch({
      type: CONFIRMPACKAGE_PICKUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONFIRMPACKAGE_PICKUP_FAILED,
      payload: error.message,
    });
  }
};
