import { CONFIRM_PICKUP_DEPARTURE_FAILED, CONFIRM_PICKUP_DEPARTURE_REQUEST, CONFIRM_PICKUP_DEPARTURE_SUCCESS } from "../constants/ConfirmPickupDeparture";

// Confirm Pickup Departure
export const ConfirmPickupDeparture = (state = {}, action) => {
    switch (action.type) {
      case CONFIRM_PICKUP_DEPARTURE_REQUEST:
        return {
          loading: true,
        };
      case CONFIRM_PICKUP_DEPARTURE_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case CONFIRM_PICKUP_DEPARTURE_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  