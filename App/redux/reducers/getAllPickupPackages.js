import {
  GET_ALL_PICKUPS_FAILED,
  GET_ALL_PICKUPS_REQUEST,
  GET_ALL_PICKUPS_SUCCESS,
} from '../constants/getAllPickupPackages';

// GetALLPickupPackages
export const GetALLPickupPackages = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PICKUPS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_PICKUPS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_PICKUPS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
