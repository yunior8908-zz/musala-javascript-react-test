import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import gateways from './components/gateway/redux/GatewayReducer';
import devices from './components/device/redux/DevicesReducer';
import drawer from './components/drawer/redux/DraweReducers';
import pagination from './components/pagination/redux/paginationReducers';
import messages from './components/messages/redux/MessagesReducers';

export const reducers = combineReducers({
    pagination,
    drawer,
    gateways,
    devices,
    messages
});
export const store = createStore(reducers, applyMiddleware(thunk));