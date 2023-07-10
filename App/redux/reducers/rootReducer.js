import { combineReducers } from "redux";
import { userLoginReducer } from "./auth";

export default combineReducers({
    user: userLoginReducer
})