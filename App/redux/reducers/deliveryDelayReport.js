import { DELIVERY_DELAYREPORT_FAILED, DELIVERY_DELAYREPORT_REQUEST, DELIVERY_DELAYREPORT_SUCCESS } from "../constants/delayReport";

//pickup delay report
export const deliveryDelayReport = (state = {}, action) => {
    switch (action.type) {
      case DELIVERY_DELAYREPORT_REQUEST:
        return {
          loading: true,
        };
      case DELIVERY_DELAYREPORT_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case DELIVERY_DELAYREPORT_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  