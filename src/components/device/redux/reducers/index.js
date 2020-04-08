import {combineReducers} from "redux";
import devices from './DevicesReducer';

export default combineReducers({
    managmentDevices: devices
})