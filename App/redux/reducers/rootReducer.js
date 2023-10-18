import { combineReducers } from 'redux';
import UserToken, { GetProfile, RemoveAccount, UpdateProfile, UploadPhoto, forgotPassword, resetPassword, userLoginReducer, userSignupReducer } from './auth';
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
import { GetDirectionLine } from './getDirectionLine';
import { uploadMultipleImages } from './uploadMultipleImages';
import { UploadImagesPath } from './getAllPickupPackages copy 2';
import { pickupDelayReport } from './PickupDelayReport';
import { deliveryDelayReport } from './deliveryDelayReport';
import showContinueBtnWhenAllPickedUp from './helperCheckReducers';
import { shipmentDetails } from './ShipmentDetails';

export default combineReducers({
  userToken: UserToken,
  userLogin: userLoginReducer,
  signUp: userSignupReducer,
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
  shipmentId: shipmentReducer,
  getdirectionLine: GetDirectionLine,
  uploadedMultipleImages: uploadMultipleImages,
  uploadIMagesPath: UploadImagesPath,
  PickupDelayReport: pickupDelayReport,
  DeliveryDelayReport: deliveryDelayReport,
  ForgetPassword: forgotPassword,
  ResetPassword: resetPassword,
  ContinueBtnAvail: showContinueBtnWhenAllPickedUp,
  removeAccount: RemoveAccount,
  shipmentDTL:shipmentDetails
});
