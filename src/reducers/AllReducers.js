import UrlReducer from "./Url";
import StaffReducer from "./Staff";
import PatientReducer from "./Patient";
import PharmacyReducer from "./Pharm";
import AppointmentReducer from "./Appointment";
import { combineReducers } from "redux";

const allReducers = combineReducers({UrlReducer, StaffReducer, PatientReducer, PharmacyReducer, AppointmentReducer})

export default allReducers