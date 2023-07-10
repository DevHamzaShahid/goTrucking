import axios from "axios";
import { USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/auth";

export const userLoginAction = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const { data } = await axios.post('https://reqres.in/api/login',
            {
                "email": "eve.holt@reqres.in",
                "password": "cityslicxka"
            }
            );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILED,
            payload: error.message
        })
    }
};
