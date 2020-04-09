import React from "react";
import {connect} from "react-redux";
import styled from 'styled-components';
import EmptyComponent from "../common/EmptyComponent";
import ListGatewayDevices from "./ListGatewayDevices";

const StyledDivGatewayDetails = styled.div`
    border: dotted 1px #ccc;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
`;

const SelectedGatewayComponent = ({gtw}) => {
    return <>
        {gtw ? <>
            <StyledDivGatewayDetails>
                <label>Serial: <strong>{gtw.serial}</strong></label>
                <label>Name: <strong>{gtw.name}</strong></label>
                <label>Ipv4 Address: <strong>{gtw.address}</strong></label>
            </StyledDivGatewayDetails>
            <ListGatewayDevices gateway={gtw}/>
        </> : <EmptyComponent/>}
    </>
};

const mapStateToProps = state => ({
    gtw: state.gateways.gateway
});

export default connect(
    mapStateToProps
)(SelectedGatewayComponent);