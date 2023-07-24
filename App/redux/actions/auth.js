import axios from 'axios';
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
} from '../constants/auth';
import {baseUrl, config} from '../../config';
import {Axios} from '../../utils/AxiosInstance';

export const userLoginAction = () => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const {data} = await axios.post('https://reqres.in/api/login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicxka',
    });
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
    const {data} = await Axios.get(`${config.SERVER_IP}api/users/profile`);
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
    const {data} = await Axios.patch(
      `${config.SERVER_IP}api/users/myProfile`,
      obj,
    );
    console.log('updated profile', data);
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
export const uploadPhoto = (photo) => async dispatch => {
    try {
      dispatch({
        type: UPLOAD_PHOTO_REQUEST,
      });
      const {data} = await axios.post(
        `${config.SERVER_IP}api/upload`,
        photo, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
      );
      console.log('upload>>>>', data);
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

