import { config } from "../../config";
import { Axios } from "../../utils/AxiosInstance";
import { DELIVERY_DEPARTURE_DONE_FAILED, DELIVERY_DEPARTURE_DONE_REQUEST, DELIVERY_DEPARTURE_DONE_SUCCESS } from "../constants/PickuppointDepartureOrDone";
import { GETALLPACKAGESFROMDELIVERY_FAILED, GETALLPACKAGESFROMDELIVERY_REQUEST, GETALLPACKAGESFROMDELIVERY_SUCCESS } from "../constants/getAllPackagesFromDelivery";


// Confirm pickup packages
export const getAllDeliveryPackages = ids => async dispatch => {
    try {
      dispatch({
        type: GETALLPACKAGESFROMDELIVERY_REQUEST,
      });
      const {data} = await Axios.get(
        `${config.SERVER_IP}api/shipping/shippment/delivery/${ids.shipmentId}/${ids.delivery_Id}`,
      );
      dispatch({
        type:  GETALLPACKAGESFROMDELIVERY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GETALLPACKAGESFROMDELIVERY_FAILED,
        payload: error.message,
      });
    }
  };
  

  //delivery departure and done

export const deliveryDepartureOrDone = idss => async dispatch => {
  try {
    dispatch({
      type: DELIVERY_DEPARTURE_DONE_REQUEST,
    });
    const {data} = await Axios.put(
      `${config.SERVER_IP}api/shipping/shippment/delivery/${idss.shipmentId}/${idss.deliveryId}`,{status: idss.status},
    );
    dispatch({
      type: DELIVERY_DEPARTURE_DONE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERY_DEPARTURE_DONE_FAILED,
      payload: error.message,
    });
  }
};
