import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import gateways from './components/gateway/redux/reducers/index';
import devices from './components/device/redux/reducers/index';
import drawer from './components/drawer/redux/DraweReducers';
import pagination from './components/pagination/redux/paginationReducers';

export const reducers = combineReducers({
    pagination,
    drawer,
    gateways,
    devices
});
export const store = createStore(reducers, applyMiddleware(thunk));