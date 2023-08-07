import { GETALLPACKAGESFROMDELIVERY_FAILED, GETALLPACKAGESFROMDELIVERY_REQUEST, GETALLPACKAGESFROMDELIVERY_SUCCESS } from "../constants/getAllPackagesFromDelivery";

// ConfirmPackagesPickup
export const GetAllPackagesDelivery = (state = {}, action) => {
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
  