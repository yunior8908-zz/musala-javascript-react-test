import React from 'react';
import styled from "styled-components";

const StyledDiv = styled.div`
    border: dotted 1px #ccc;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
`;

export default function StyledDivDetails({children}) {
    return <StyledDiv>
        {children}
    </StyledDiv>
}