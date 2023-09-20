import {
  FORGET_PASSWORD_FAILED,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  REMOVE_ACCOUNT_FAILED,
  REMOVE_ACCOUNT_REQUEST,
  REMOVE_ACCOUNT_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
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

//ForgotPassword
export const forgotPassword = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case FORGET_PASSWORD_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


//ResetPassword
export const resetPassword = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case RESET_PASSWORD_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//remove Account

export const RemoveAccount = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ACCOUNT_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_ACCOUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case REMOVE_ACCOUNT_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};