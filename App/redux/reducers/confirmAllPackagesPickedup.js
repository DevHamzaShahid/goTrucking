import { CONFIRMALLPACKAGESPICKEDUP_FAILED, CONFIRMALLPACKAGESPICKEDUP_REQUEST, CONFIRMALLPACKAGESPICKEDUP_SUCCESS } from "../constants/ConfirmAllPackagesPickedUp";

  // confirmAllPackagesPcikedUp or all delivered
  export const ConfirmAllPackagesPickedUp = (state = {}, action) => {
    switch (action.type) {
      case CONFIRMALLPACKAGESPICKEDUP_REQUEST:
        return {
          loading: true,
        };
      case CONFIRMALLPACKAGESPICKEDUP_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case CONFIRMALLPACKAGESPICKEDUP_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };