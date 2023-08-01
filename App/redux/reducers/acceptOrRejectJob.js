import { ACCEPTREJECTJOB_FAILED, ACCEPTREJECTJOB_REQUEST, ACCEPTREJECTJOB_SUCCESS } from "../constants/acceptOrRejectJob";

  // get single shift
  export const AcceptOrRejectJob = (state = {}, action) => {
    switch (action.type) {
      case ACCEPTREJECTJOB_REQUEST:
        return {
          loading: true,
        };
      case ACCEPTREJECTJOB_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case ACCEPTREJECTJOB_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };