import { GETALLSHIFTS_FAILED, GETALLSHIFTS_REQUEST, GETALLSHIFTS_SUCCESS } from "../constants/getShifts";

// get All shifts
export const GetAllShifts = (state = {}, action) => {
    switch (action.type) {
      case GETALLSHIFTS_REQUEST:
        return {
          loading: true,
        };
      case GETALLSHIFTS_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case GETALLSHIFTS_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };