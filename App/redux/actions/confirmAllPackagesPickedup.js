import { config } from "../../config";
import { Axios } from "../../utils/AxiosInstance";
import { CONFIRMALLPACKAGESPICKEDUP_FAILED, CONFIRMALLPACKAGESPICKEDUP_REQUEST, CONFIRMALLPACKAGESPICKEDUP_SUCCESS } from "../constants/ConfirmAllPackagesPickedUp";

//confirmAllPackagesPcikedUp or all delivered
export const confirmAllPackagesPcikedUp = status => async dispatch => {
    try {
      dispatch({
        type: CONFIRMALLPACKAGESPICKEDUP_REQUEST,
      });
      const {data} = await Axios.post(
        `${config.SERVER_IP}api/shipping/shippment/updateStatus`,
        status,
      );
      dispatch({
        type: CONFIRMALLPACKAGESPICKEDUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CONFIRMALLPACKAGESPICKEDUP_FAILED,
        payload: error.message,
      });
    }
  };