import {combineReducers} from 'redux';
import {GetProfile, UpdateProfile, UploadPhoto, userLoginReducer} from './auth';
import {GetAllShifts, GetSingleShift} from './getAllShifts';
import {AcceptOrRejectJob} from './acceptOrRejectJob';
import {GetALLPickupPackages} from './getAllPickupPackages';
import {ConfirmPackagesPickup} from './confirmPackagePickup';

export default combineReducers({
  user: userLoginReducer,
  getProfile: GetProfile,
  updateProfile: UpdateProfile,
  uploadPhoto: UploadPhoto,
  getAllShifts: GetAllShifts,
  getSingleShift: GetSingleShift,
  acceptOrRejectJob: AcceptOrRejectJob,
  getALLPickupPackages: GetALLPickupPackages,
  confirmPackagesPickup: ConfirmPackagesPickup,
});
