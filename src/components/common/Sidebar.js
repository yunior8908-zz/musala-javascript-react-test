import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const StyledSidebar = styled.div`
    position: fixed;
    height: calc(90vh);
    width: 231px;
    background: #fff;
    border-right: solid 1px #ccc;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding: 10px;    
    &>* {
        margin-bottom: 10px;
    }    
    @media (max-width: 768px) {
      width: 87px;
    }
`;

function Sidebar(){
    return <StyledSidebar>
        <NavLink to="/gateways" activeStyle={{
            borderBottom: 'solid 2px #ccc'
        }} >gateways</NavLink>
        <NavLink to="/devices"  activeStyle={{
            borderBottom: 'solid 2px #ccc'
        }} ><span>devices</span></NavLink>
    </StyledSidebar>
}

export default Sidebar;