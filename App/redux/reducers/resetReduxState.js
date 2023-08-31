import { RESET_STATE } from "../constants/resetReducState";
import rootReducer from "./rootReducer";

const rootReducerWithReset = (state, action) => {
    if (action.type === RESET_STATE) {
        // Preserve specific reducers from resetting
        const { shipmentId, userToken, getProfile, getAllShifts, getdirectionLine, uploadedMultipleImages, } = state;

        // Create a new state with preserved reducers
        return {
            shipmentId,
            userToken,
            getProfile,
            userLogin: {},
            signUp: {},
            updateProfile: {},
            uploadPhoto: {},
            getAllShifts,
            getSingleShift: {},
            acceptOrRejectJob: {},
            getALLPickupPackages: {},
            confirmPackagesPickup: {},
            getSingleshiftDelivery: {},
            getAllDeliveryPackages: {},
            confirmPackagesDelivery: {},
            confirmPickupDeparturereducer: {},
            confirmDeliveryDeparturereducer: {},
            confirmAllPackagesArePickedup: {},
            getdirectionLine,
            uploadedMultipleImages,
            ForgetPassword: {},
            ResetPassword: {}
        }
    }

    return rootReducer(state, action);
};

export default rootReducerWithReset;