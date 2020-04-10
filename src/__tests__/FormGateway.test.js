import React from 'react';
import {shallow} from 'enzyme';
import FormGateway from "../components/gateway/FormGateway";

describe("FormGateway componet", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<FormGateway />).dive();
    });

    it("should be show error on invalid data address", () => {
        expect(wrapper).toMatchSnapshot()
    });
});