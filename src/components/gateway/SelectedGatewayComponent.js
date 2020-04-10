import React from "react";
import {connect} from "react-redux";
import EmptyComponent from "../common/EmptyComponent";
import ListGatewayDevices from "./ListGatewayDevices";
import StyledDivDetails from "../common/StyledDivDetails";

const SelectedGatewayComponent = ({gtw}) => {
    return <>
        {gtw ? <>
            <StyledDivDetails>
                <label>Serial: <strong>{gtw.serial}</strong></label>
                <label>Name: <strong>{gtw.name}</strong></label>
                <label>Ipv4 Address: <strong>{gtw.address}</strong></label>
            </StyledDivDetails>
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