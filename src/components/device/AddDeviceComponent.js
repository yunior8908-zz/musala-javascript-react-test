import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AddDevice} from "./redux/actions/DevicesActions";
import FormDevice from "./FormDevice";

const AddDeviceComponent = ({history, loading, funcAddDevice}) => {
    const [afterLoading, setAfterLoading] = useState(false);

    useEffect(()=> {
        if(afterLoading === true && loading === false){
            history.push('/devices')
        }
        setAfterLoading(loading);
    }, [loading]);

    const handlerCancelar = () => {
        history.push('/devices');
    };

    const onSubmit = (values) => {
        funcAddDevice(values);
    };

    return <FormDevice title={"Insert a device"} cancelForm={handlerCancelar} saveValues={onSubmit}/>

};

const mapStateToProps = state => ({
    loading: state.devices.managmentDevices.loadingAdd
});

const mapDispatchToProps = dispatch => ({
    funcAddDevice: (values) => dispatch(AddDevice(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceComponent);