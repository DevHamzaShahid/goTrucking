import axios from 'axios';
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
import { baseUrl, config } from '../../config';
import { Axios } from '../../utils/AxiosInstance';


//Signup
export const userSignupAction = (creds) => async dispatch => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });
    const { data } = await Axios.post(`${config.SERVER_IP}api/users/rider-register-user`, creds);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // alert(error)
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload: error.message,
    });
  }
};

//Login
export const userLoginAction = (creds) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await Axios.post(`${config.SERVER_IP}api/users/login-rider`, creds);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.message,
    });
  }
};
// get profile data
export const getProfile = () => async dispatch => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });
    const { data } = await Axios.get(`${config.SERVER_IP}api/users/profile`);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILED,
      payload: error.message,
    });
  }
};
// update profile data
export const updateProfile = obj => async dispatch => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });
    const { data } = await Axios.patch(
      `${config.SERVER_IP}api/users/myProfile`,
      obj,
    );
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILED,
      payload: error.message,
    });
  }
};

//Upload photo
export const uploadPhoto = photo => async dispatch => {
  try {
    dispatch({
      type: UPLOAD_PHOTO_REQUEST,
    });
    const { data } = await axios.post(`${config.SERVER_IP}api/upload`, photo, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({
      type: UPLOAD_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_PHOTO_FAILED,
      payload: error.message,
    });
  }
};



//Forgot paswword send email
export const forgetPassword = (email) => async dispatch => {
  try {
    dispatch({
      type: FORGET_PASSWORD_REQUEST,
    });
    const { data } = await Axios.post(`${config.SERVER_IP}api/users/forgotpassword`, { email });
    dispatch({
      type: FORGET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // alert(error)
    dispatch({
      type: FORGET_PASSWORD_FAILED,
      payload: error.message,
    });
  }
};


//Reset paswword send otp and both passwords
export const resetPassword = (resetData) => async dispatch => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    const { data } = await Axios.patch(`${config.SERVER_IP}api/users/resetpassword`, resetData);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // alert(error)
    dispatch({
      type: RESET_PASSWORD_FAILED,
      payload: error.message,
    });
  }
};

//remove account

export const removeAccount = () => async dispatch => {
  try {
    dispatch({
      type: REMOVE_ACCOUNT_REQUEST,
    });
    const { data } = await Axios.post(`${config.SERVER_IP}api/users/delete-account`);
    dispatch({
      type: REMOVE_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // alert(error)
    dispatch({
      type: REMOVE_ACCOUNT_FAILED,
      payload: error.message,
    });
  }
};