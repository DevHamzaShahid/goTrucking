import {
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPLOAD_PHOTO_FAILED,
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/auth';
//token
// reducers.js
const initialState = {
  token: null,
};

const UserToken = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_TOKEN':
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default UserToken;
//Signup
export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        loading: true,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case USER_SIGNUP_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//Login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case USER_LOGIN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// getProfile
export const GetProfile = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_PROFILE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// UpdateProfile
export const UpdateProfile = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UPDATE_PROFILE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// UPLOADPHOTO
export const UploadPhoto = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_REQUEST:
      return {
        loading: true,
      };
    case UPLOAD_PHOTO_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UPLOAD_PHOTO_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
