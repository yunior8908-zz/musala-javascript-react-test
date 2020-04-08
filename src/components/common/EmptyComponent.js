import React from "react";
import styled from "styled-components";

const EmptyComponent = styled.div`
    padding: 10px;
    width: 100%;
    color: #ccc;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
`;

export default function ({children = "Empty result..."}) {
    return <EmptyComponent>{children}</EmptyComponent>
}