import {config} from '../../config';
import {Axios} from '../../utils/AxiosInstance';
import {
  PICKUPPOINTDEPARTURE_FAILED,
  PICKUPPOINTDEPARTURE_REQUEST,
  PICKUPPOINTDEPARTURE_SUCCESS,
} from '../constants/PickuppointDepartureOrDone';
import {
  GET_ALL_PICKUPS_FAILED,
  GET_ALL_PICKUPS_REQUEST,
  GET_ALL_PICKUPS_SUCCESS,
} from '../constants/getAllPickupPackages';

// getAllPickupPackages
export const getAllPickupPackages = ids => async dispatch => {
  try {
    dispatch({
      type: GET_ALL_PICKUPS_REQUEST,
    });
    const {data} = await Axios.get(
      `${config.SERVER_IP}api/shipping/shippment/pickup/${ids.shipmentId}/${ids.pickup_Id}`,
    );
    console.log('data for pickups', data);
    dispatch({
      type: GET_ALL_PICKUPS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PICKUPS_FAILED,
      payload: error.message,
    });
  }
};

//pickupPoint departure and done

export const pickupPointDepartureOrDone = ids => async dispatch => {
  try {
    dispatch({
      type: PICKUPPOINTDEPARTURE_REQUEST,
    });
    const {data} = await Axios.put(
      `${config.SERVER_IP}api/shipping/shippment/pickup/${ids.shipmentId}/${ids.pickup_Id}`,{status:ids.status}
    );
    console.log('deaparture or done',data);
    dispatch({
      type: PICKUPPOINTDEPARTURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PICKUPPOINTDEPARTURE_FAILED,
      payload: error.message,
    });
  
  }
};
