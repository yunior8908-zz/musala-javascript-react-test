import React from "react";
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import App from "../App";
import Routes from "../Routes";

describe("App component", () => {
    it('Should be render', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper).toMatchSnapshot();
        const RoutesWrapper = shallow(<Routes/>);
        expect(wrapper).chil
    })
});