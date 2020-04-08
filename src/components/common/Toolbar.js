import React from "react";
import styled from "styled-components";

const SyledToolbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
`;

export default function({children}) {
    return <SyledToolbar>
        {children}
    </SyledToolbar>
}