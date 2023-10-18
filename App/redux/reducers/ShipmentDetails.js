import { SHIPMENT_DETAIL_FAILED, SHIPMENT_DETAIL_REQUEST, SHIPMENT_DETAIL_SUCCESS } from "../constants/ShipmentDetail";

export const shipmentDetails = (state = {}, action) => {
    switch (action.type) {
      case SHIPMENT_DETAIL_REQUEST:
        return {
          loading: true,
        };
      case SHIPMENT_DETAIL_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case SHIPMENT_DETAIL_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };