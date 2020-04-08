import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import EmptyComponent from "../common/EmptyComponent";

const StyledDeviceDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

function SelectedDeviceComponent ({ device }) {
    return <>
        {device ? <StyledDeviceDetails>
            <label>UID: <strong>{device.uid}</strong></label>
            <label>Vendor: <strong>{device.vendor || "-"}</strong></label>
            <label>Created: <strong>{device.created}</strong></label>
            <label>Status: <strong>{device.status}</strong></label>
        </StyledDeviceDetails> : <EmptyComponent />}
    </>
}

const mapStateToProps = state => ({
    device: state.devices.managmentDevices.device
});

export default connect(mapStateToProps)(SelectedDeviceComponent);