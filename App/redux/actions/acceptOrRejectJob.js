import axios from 'axios';
import {config} from '../../config';
import {
  ACCEPTREJECTJOB_FAILED,
  ACCEPTREJECTJOB_REQUEST,
  ACCEPTREJECTJOB_SUCCESS,
} from '../constants/acceptOrRejectJob';
import { Axios } from '../../utils/AxiosInstance';

//acceptOrRejectJob
export const acceptOrRejectJob = status => async dispatch => {
  try {
    dispatch({
      type: ACCEPTREJECTJOB_REQUEST,
    });
    const {data} = await Axios.post(
      `${config.SERVER_IP}api/shipping/shippment/updateStatus`,
      status,
    );
    console.log('get status response', data);
    dispatch({
      type: ACCEPTREJECTJOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCEPTREJECTJOB_FAILED,
      payload: error.message,
    });
  }
};
