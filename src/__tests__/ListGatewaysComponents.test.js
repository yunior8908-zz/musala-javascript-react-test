import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import consfigureStore from 'redux-mock-store';
import ListGatewaysComponent from "../components/gateway/ListGatewaysComponent";
import {BrowserRouter} from "react-router-dom";

const mockStore = consfigureStore([]);

describe("Component ListGateways", () => {
    let store;
    let wrapper;
    beforeEach(() => {
        store = mockStore({
            gatewas: {
                gateways : [],
                total: 0
            },
            paginatrion: {
                pageSize: 0,
                page: 0
            }
        });
        wrapper = mount(<Provider store={store}>
            <BrowserRouter>
                <ListGatewaysComponent/>
            </BrowserRouter>
        </Provider>)
    });

    it("Should be render...", () => {
        expect(wrapper).toMatchSnapshot()
    })

});