import { UPLOAD_MULTIPLEPHOTOS_FAILED, UPLOAD_MULTIPLEPHOTOS_REQUEST, UPLOAD_MULTIPLEPHOTOS_SUCCESS } from "../constants/UploadMultiplePhotos";

  // Upload Multiple Images
  export const uploadMultipleImages = (state = {}, action) => {
    switch (action.type) {
      case UPLOAD_MULTIPLEPHOTOS_REQUEST:
        return {
          loading: true,
        };
      case UPLOAD_MULTIPLEPHOTOS_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case UPLOAD_MULTIPLEPHOTOS_FAILED:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };