import { GET_DIRECTIONLINE_FAILED, GET_DIRECTIONLINE_REQUEST, GET_DIRECTIONLINE_SUCCESS, RESET_DIRECTIONLINE_STATE } from "../constants/getDirectionLine";

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
        case RESET_DIRECTIONLINE_STATE:
            return {
                loading: false,
                data: null,
            };
        default:
            return state;
    }
};



