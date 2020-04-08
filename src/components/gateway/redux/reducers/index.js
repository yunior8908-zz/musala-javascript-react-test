import gateway from './GatewayReducer';
import {combineReducers} from "redux";

const reducers = combineReducers({
    managmentGateways: gateway
});

export default reducers;