import { config } from '../../config';
import { Axios } from '../../utils/AxiosInstance';
import { UpLOADIMAGES_PATH_FAILED, UpLOADIMAGES_PATH_REQUEST, UpLOADIMAGES_PATH_SUCCESS } from '../constants/UploadImagespath';
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
    const { data } = await Axios.put(
      `${config.SERVER_IP}api/shipping/shippment/delivery/${ids.shipmentId}/${ids.deliveryId}`,
      { status: ids.status },
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


// confirm upload images
export const UploadImagesPath = param => async dispatch => {
  console.log("hhhhhhhhhhhhitparam>>>", param);
  try {
    dispatch({
      type: UpLOADIMAGES_PATH_REQUEST,
    });
    const { data } = await Axios.put(
      `${config.SERVER_IP}api/shipping/shippment/delivery/${param.shipmentId}/${param.deliveryId}`,
      { status: "done", images: param.photoPaths },
    );
    console.log("hitting results",data);
    dispatch({
      type: UpLOADIMAGES_PATH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UpLOADIMAGES_PATH_FAILED,
      payload: error.message,
    });
  }
};
