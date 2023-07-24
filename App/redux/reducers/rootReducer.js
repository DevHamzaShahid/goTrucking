import {combineReducers} from 'redux';
import {GetProfile, UpdateProfile, UploadPhoto, userLoginReducer} from './auth';

export default combineReducers({
  user: userLoginReducer,
  getProfile: GetProfile,
  updateProfile: UpdateProfile,
  uploadPhoto: UploadPhoto,
});
