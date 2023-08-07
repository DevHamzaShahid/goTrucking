import {
  CONFIRMDELIVERYDEPARTURE_FAILED,
  CONFIRMDELIVERYDEPARTURE_REQUEST,
  CONFIRMDELIVERYDEPARTURE_SUCCESS,
} from '../constants/confirmDeliveryDeparture';

// Confirm Delivery Departure
export const ConfirmDeliveryDeparture = (state = {}, action) => {
  switch (action.type) {
    case CONFIRMDELIVERYDEPARTURE_REQUEST:
      return {
        loading: true,
      };
    case CONFIRMDELIVERYDEPARTURE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case CONFIRMDELIVERYDEPARTURE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
