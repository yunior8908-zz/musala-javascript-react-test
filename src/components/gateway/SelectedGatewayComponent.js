import React from "react";
import {connect} from "react-redux";
import styled from 'styled-components';
import EmptyComponent from "../common/EmptyComponent";
import ListDevicesToAtach from "./ListDevicesToAtach";

const StyledDivGatewayDetails = styled.div`
    border: dotted 1px #ccc;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
`;

function SelectedGatewayComponent({gateway}) {
    return <>
        {gateway ? <>
            <StyledDivGatewayDetails>
                <label>Serial: <strong>{gateway.serial}</strong></label>
                <label>Name: <strong>{gateway.name}</strong></label>
                <label>Ipv4 Address: <strong>{gateway.address}</strong></label>
            </StyledDivGatewayDetails>
            <ListDevicesToAtach checkable={false}/>
        </> : <EmptyComponent/>}
    </>
};

const mapStateToProps = state => ({
    gateway: state.gateways.managmentGateways.gateway
});

export default connect(
    mapStateToProps
)(SelectedGatewayComponent);