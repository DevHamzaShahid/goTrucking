import { GETALLPACKAGESFROMDELIVERY_FAILED, GETALLPACKAGESFROMDELIVERY_REQUEST, GETALLPACKAGESFROMDELIVERY_SUCCESS } from '../constants/getAllPackagesFromDelivery';
import {
  GET_ALL_PICKUPS_FAILED,
  GET_ALL_PICKUPS_REQUEST,
  GET_ALL_PICKUPS_SUCCESS,
} from '../constants/getAllPickupPackages';

// GetALLPickupPackages
export const GetALLDeliveryPackages = (state = {}, action) => {
  switch (action.type) {
    case GETALLPACKAGESFROMDELIVERY_REQUEST:
      return {
        loading: true,
      };
    case GETALLPACKAGESFROMDELIVERY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GETALLPACKAGESFROMDELIVERY_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
