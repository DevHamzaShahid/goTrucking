import {combineReducers} from 'redux';
import {GetProfile, UpdateProfile, UploadPhoto, userLoginReducer} from './auth';
import {GetAllShifts} from './getAllShifts';

export default combineReducers({
  user: userLoginReducer,
  getProfile: GetProfile,
  updateProfile: UpdateProfile,
  uploadPhoto: UploadPhoto,
  getAllShifts: GetAllShifts,
});
