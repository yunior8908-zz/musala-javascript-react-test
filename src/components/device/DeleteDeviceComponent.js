import React, {useEffect, useState} from "react";
import Card from "../common/Card";
import {connect} from "react-redux";
import {DeleteDevice} from "./redux/actions/DevicesActions";

function DeleteDeviceComponent({device, loading, history, funcDeleteDevice}) {
    const [afterLoading, setAfterLoading] = useState(false);

    useEffect(() => {
        if (afterLoading === true && loading === false) {
            history.push('/devices')
        }
        setAfterLoading(loading);
    }, [loading]);

    const cancelForm = () => {
        history.push('/devices')
    };

    const handleDelete = () => {
        if (device) {
            funcDeleteDevice({id: device._id});
        }
    };

    return <Card
        col={12}
        title={"Delete device"}
        bodyStyle={{
            textAlign: "center"
        }}
        body={
            <h5>{`Are you sure to want delete device with uid: ${device && device.uid}?`}</h5>
        }
        footer={<div className="form-row justify-content-end">
            <div className="col-auto">
                <button className="btn btn-secondary btn-sm" onClick={cancelForm}>cancelar</button>
            </div>
            <div className="col-auto">
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete
                </button>
            </div>
        </div>}
    />
};

const mapStateToProps = state => ({
    device: state.devices.managmentDevices.device,
    loading: state.devices.managmentDevices.loadingDelete
});

const mapDispatchToProps = dispatch => ({
    funcDeleteDevice: (data) => dispatch(DeleteDevice(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDeviceComponent);