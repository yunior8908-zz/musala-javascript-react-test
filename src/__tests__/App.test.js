import React from "react";
import {shallow} from 'enzyme';
import {Route} from 'react-router-dom';
import App from "../App";


describe("App component", () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<App/>);
    })
    it('Should be render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("list of dinamic router", ()=> {
        const wrapperDiv = wrapper.dive();
        const routes = wrapperDiv.find(Route);
        expect(routes.length).toEqual(10)
    })
});