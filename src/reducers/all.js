import UrlReducer from "./url";
import StaffReducer from "./staff";
import { combineReducers } from "redux";

const allReducers = combineReducers({UrlReducer, StaffReducer})

export default allReducers