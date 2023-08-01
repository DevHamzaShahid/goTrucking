import { CONFIRMPACKAGE_PICKUP_FAILED, CONFIRMPACKAGE_PICKUP_REQUEST, CONFIRMPACKAGE_PICKUP_SUCCESS } from "../constants/confirmPackagePickup";

// ConfirmPackagesPickup
export const ConfirmPackagesPickup = (state = {}, action) => {
    switch (action.type) {
      case CONFIRMPACKAGE_PICKUP_REQUEST:
        return {
          loading: true,
        };
      case CONFIRMPACKAGE_PICKUP_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case CONFIRMPACKAGE_PICKUP_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  