import React from "react";
import {connect} from "react-redux";
import EmptyComponent from "../common/EmptyComponent";
import StyledDivDetails from "../common/StyledDivDetails";

function SelectedDeviceComponent ({ device }) {
    return <>
        {device ? <StyledDivDetails>
            <label>UID: <strong>{device.uid}</strong></label>
            <label>Vendor: <strong>{device.vendor || "-"}</strong></label>
            <label>Created: <strong>{device.created}</strong></label>
            <label>Status: <strong>{device.status}</strong></label>
        </StyledDivDetails> : <EmptyComponent />}
    </>
}

const mapStateToProps = state => ({
    device: state.devices.device
});

export default connect(mapStateToProps)(SelectedDeviceComponent);