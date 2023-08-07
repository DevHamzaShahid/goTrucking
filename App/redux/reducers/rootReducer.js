import { combineReducers } from 'redux';
import { GetProfile, UpdateProfile, UploadPhoto, userLoginReducer } from './auth';
import {
  GetAllShifts,
  GetSingleShift,
  GetSingleShiftDelivery,
} from './getAllShifts';
import { AcceptOrRejectJob } from './acceptOrRejectJob';
import { GetALLPickupPackages } from './getAllPickupPackages';
import { ConfirmPackagesPickup } from './confirmPackagePickup';
import { GetAllPackagesDelivery } from './getAllPackagesFromDelivery';
import { ConfirmPackagesDelivery } from './confirmPackageDelivery';
import { ConfirmPickupDeparture } from './confirmPickupDeparture';
import { ConfirmDeliveryDeparture } from './confirmDeliveryDeparture';
import { ConfirmAllPackagesPickedUp } from './confirmAllPackagesPickedup';
import shipmentReducer from './shipmentId';

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
  getSingleshiftDelivery: GetSingleShiftDelivery,
  getAllDeliveryPackages: GetAllPackagesDelivery,
  confirmPackagesDelivery: ConfirmPackagesDelivery,
  confirmPickupDeparturereducer: ConfirmPickupDeparture,
  confirmDeliveryDeparturereducer: ConfirmDeliveryDeparture,
  confirmAllPackagesArePickedup: ConfirmAllPackagesPickedUp,
  shipmentId:shipmentReducer
});
