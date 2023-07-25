import {config} from '../../config';
import {Axios} from '../../utils/AxiosInstance';
import {
  GETALLSHIFTS_FAILED,
  GETALLSHIFTS_REQUEST,
  GETALLSHIFTS_SUCCESS,
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
