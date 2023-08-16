import { GET_DIRECTIONLINE_FAILED, GET_DIRECTIONLINE_REQUEST, GET_DIRECTIONLINE_SUCCESS } from "../constants/getDirectionLine";

// GEt direction line 
export const GetDirectionLine = (state = {}, action) => {
    switch (action.type) {
        case GET_DIRECTIONLINE_REQUEST:
            return {
                loading: true,
            };
        case GET_DIRECTIONLINE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DIRECTIONLINE_FAILED:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};