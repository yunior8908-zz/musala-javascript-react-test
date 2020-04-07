import gateway from './Gateway';
import {combineReducers} from "redux";

const reducers = combineReducers({
    managmentGateways: gateway
});

export default reducers;