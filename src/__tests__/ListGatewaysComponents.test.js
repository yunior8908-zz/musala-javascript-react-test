import React from 'react';
import {shallow} from 'enzyme';
import consfigureStore from 'redux-mock-store';
import ListGatewaysConnected, {ListGatewaysComponent} from "../components/gateway/ListGatewaysComponent";
import thunk from "redux-thunk";
import {FetchGateways} from "../components/gateway/redux/GatewaysActions";
import {Provider} from "react-redux";
import {mockDataGateway} from './mockData';

const mockStore = consfigureStore([thunk]);

describe("Component ListGateways", () => {
    let store;
    let wrapper;
    beforeEach(() => {
        store = mockStore({
            ...mockDataGateway
        });
        store.clearActions();
        wrapper = shallow(<Provider store={store}>
            <ListGatewaysConnected/>
        </Provider>)
    });

    it("Should be render...", () => {
       expect(wrapper).toMatchSnapshot()
    });

    it("shoud be have more than tr table", async () => {
        const wrapperList = shallow(<ListGatewaysComponent {...store.getState()} location={{search: ""}}/>);
        const tbody = wrapperList.find('tbody');
        const tr = tbody.find('tr');
        expect(tr.length).toBeGreaterThan(0);
    });


    it('fires fetch list gateways actions', async () => {
        await store.dispatch(FetchGateways({}));
        expect(store.getActions()).toEqual([{
            type: 'FETCH_LIST_GATEWAYS',
            gateways: expect.any(Array),
            total: expect.any(Number),
        }])
    });

});