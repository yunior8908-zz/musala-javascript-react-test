import React from "react";
import styled from "styled-components";

const StyledNavbar = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    padding: 10px;
    background: #666;
    z-index: 99999;
`;

function Navbar(props){
    return <StyledNavbar>
        Yunior Chavez
    </StyledNavbar>
}

export default Navbar;