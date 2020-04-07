import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import gateway from './components/gateway/redux/reducers/index';
import drawer from './components/drawer/redux/DraweReducers';
import pagination from './components/pagination/redux/paginationReducers';

export const reducers = combineReducers({
    pagination,
    drawer,
    gateway
});
export const store = createStore(reducers, applyMiddleware(thunk));