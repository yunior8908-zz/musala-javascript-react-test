import React from 'react';
import styled from "styled-components";

const StyeldDivNotFound = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 5%;
    color: #ccc;
`;

export default function NotFoundPage(){
    return <StyeldDivNotFound>
        <h2>Not found. 404</h2>
    </StyeldDivNotFound>
}