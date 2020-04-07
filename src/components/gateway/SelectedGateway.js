import React from "react";
import {connect} from "react-redux";
import styled from 'styled-components';

const StyledDivGatewayDetails = styled.div`
    border: dotted 1px #ccc;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
`;

function SelectedGateway({gateway}) {
    return <>
        <StyledDivGatewayDetails>
            <label>Serial: <strong>{gateway.serial}</strong></label>
            <label>Name: <strong>{gateway.name}</strong></label>
            <label>Ipv4 Address: <strong>{gateway.address}</strong></label>
        </StyledDivGatewayDetails>
    </>
};

const mapStateToProps = state => ({
    gateway: state.gateway.managmentGateways.gateway
});

export default connect(
    mapStateToProps
)(SelectedGateway);