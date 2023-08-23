import axios from "axios";
import { config } from "../../config";
import { UPLOAD_MULTIPLEPHOTOS_FAILED, UPLOAD_MULTIPLEPHOTOS_REQUEST, UPLOAD_MULTIPLEPHOTOS_SUCCESS } from "../constants/UploadMultiplePhotos";

//multiple image upload
export const UploadMultipleImages = imageData => async dispatch => {
    console.log("uploadiug stuff", imageData);
    try {
        dispatch({
            type: UPLOAD_MULTIPLEPHOTOS_REQUEST,
        });
        const configure = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post(
            `${config.SERVER_IP}api/upload/multi`,
            imageData,
            configure,
        );
        console.log('data...', data);
        dispatch({
            type: UPLOAD_MULTIPLEPHOTOS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPLOAD_MULTIPLEPHOTOS_FAILED,
            payload: error?.response && error?.response?.data,
        });
    }
};