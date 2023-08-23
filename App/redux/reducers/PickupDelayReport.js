import { PICKUP_DELAYREPORT_FAILED, PICKUP_DELAYREPORT_REQUEST, PICKUP_DELAYREPORT_SUCCESS } from "../constants/delayReport";

//pickup delay report
export const pickupDelayReport = (state = {}, action) => {
    switch (action.type) {
      case PICKUP_DELAYREPORT_REQUEST:
        return {
          loading: true,
        };
      case PICKUP_DELAYREPORT_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case PICKUP_DELAYREPORT_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  