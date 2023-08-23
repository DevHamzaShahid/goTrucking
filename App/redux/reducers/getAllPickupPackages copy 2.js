import { UpLOADIMAGES_PATH_FAILED, UpLOADIMAGES_PATH_REQUEST, UpLOADIMAGES_PATH_SUCCESS } from '../constants/UploadImagespath';

// UPLOADIMAGESPATH
export const UploadImagesPath = (state = {}, action) => {
  switch (action.type) {
    case UpLOADIMAGES_PATH_REQUEST:
      return {
        loading: true,
      };
    case UpLOADIMAGES_PATH_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UpLOADIMAGES_PATH_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
