import { CONFIRMPACKAGE_DELIVERY_FAILED, CONFIRMPACKAGE_DELIVERY_REQUEST, CONFIRMPACKAGE_DELIVERY_SUCCESS } from "../constants/confirmPackageDelivery";

// ConfirmPackagesDElivery
export const ConfirmPackagesDelivery = (state = {}, action) => {
    switch (action.type) {
      case CONFIRMPACKAGE_DELIVERY_REQUEST:
        return {
          loading: true,
        };
      case CONFIRMPACKAGE_DELIVERY_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case CONFIRMPACKAGE_DELIVERY_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  