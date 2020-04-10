import React, {useEffect, useState} from "react";
import FormDevice from "./FormDevice";
import {connect} from "react-redux";
import {EditDevice} from "./redux/DevicesActions";

function EditDeviceComponent({history, location, device, loading, funcEditDevice}) {
    const [afterLoading, setAfterLoading] = useState(false);
    const urlSearchParams = new URLSearchParams(location.search);

    useEffect(() => {
        if (afterLoading === true && loading === false) {
            history.push('/devices')
        }
        setAfterLoading(loading);
    }, [afterLoading, history, loading]);

    const handlerCancel = () => {
        history.push('/devices');
    };

    const onSubmit = (values) => {
        funcEditDevice(values);
    };

    const handleDelete = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/devices/delete',
            search: urlSearchParams.toString()
        })
    };

    return <>
        <FormDevice title="Editar device" editDevice={device} cancelForm={handlerCancel} saveValues={onSubmit} handleDelete={handleDelete}/>
    </>
};

const mapStateToProps = state => ({
    loading: state.devices.loadingEdit,
    device: state.devices.device
});

const mapDispatchToProps = dispatch => ({
    funcEditDevice: (values) => dispatch(EditDevice(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeviceComponent);