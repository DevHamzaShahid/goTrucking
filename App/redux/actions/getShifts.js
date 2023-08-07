import {config} from '../../config';
import {Axios} from '../../utils/AxiosInstance';
import {
  GETALLSHIFTS_FAILED,
  GETALLSHIFTS_REQUEST,
  GETALLSHIFTS_SUCCESS,
  GET_SINGLESHIFTDELIVERY_FAILED,
  GET_SINGLESHIFTDELIVERY_REQUEST,
  GET_SINGLESHIFTDELIVERY_SUCCESS,
  GET_SINGLESHIFT_FAILED,
  GET_SINGLESHIFT_REQUEST,
  GET_SINGLESHIFT_SUCCESS,
} from '../constants/getShifts';

// get All shifts
export const getAllShifts = () => async dispatch => {
  try {
    dispatch({
      type: GETALLSHIFTS_REQUEST,
    });
    const {data} = await Axios.get(
      `${config.SERVER_IP}api/shipping/shippment/my-shippments`,
    );
    dispatch({
      type: GETALLSHIFTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GETALLSHIFTS_FAILED,
      payload: error.message,
    });
  }
};

// get single shipment =>pickup
export const getSingleShift = ShiftId => async dispatch => {
  try {
    dispatch({
      type: GET_SINGLESHIFT_REQUEST,
    });
    const {data} = await Axios.get(
      `${config.SERVER_IP}api/shipping/shippment/pickup/${ShiftId}`,
    );
    dispatch({
      type: GET_SINGLESHIFT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLESHIFT_FAILED,
      payload: error.message,
    });
  }
};

// get single shipment =>delivery
export const getSingleShiftDelivery = ShiftId => async dispatch => {
  try {
    dispatch({
      type: GET_SINGLESHIFTDELIVERY_REQUEST,
    });
    const {data} = await Axios.get(
      `${config.SERVER_IP}api/shipping/shippment/delivery/${ShiftId}`,
    );
    dispatch({
      type: GET_SINGLESHIFTDELIVERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLESHIFTDELIVERY_FAILED,
      payload: error.message,
    });
  }
};
