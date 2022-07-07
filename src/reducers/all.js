import UrlReducer from "./url";
import StaffReducer from "./staff";
import PatientReducer from "./patient";
import { combineReducers } from "redux";

const allReducers = combineReducers({UrlReducer, StaffReducer, PatientReducer})

export default allReducers