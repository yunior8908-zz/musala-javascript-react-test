import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AddDevice} from "./redux/DevicesActions";
import FormDevice from "./FormDevice";

const AddDeviceComponent = ({history, loading, funcAddDevice}) => {
    const [afterLoading, setAfterLoading] = useState(false);

    useEffect(()=> {
        if(afterLoading === true && loading === false){
            history.push('/devices')
        }
        setAfterLoading(loading);
    }, [afterLoading, history, loading]);

    const handlerCancel = () => {
        history.push('/devices');
    };

    const onSubmit = (values) => {
        funcAddDevice(values);
    };

    return <FormDevice title={"Add a device"} cancelForm={handlerCancel} saveValues={onSubmit}/>

};

const mapStateToProps = state => ({
    loading: state.devices.loadingAdd
});

const mapDispatchToProps = dispatch => ({
    funcAddDevice: (values) => dispatch(AddDevice(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceComponent);