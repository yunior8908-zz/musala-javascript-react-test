import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AddGateway} from "./redux/GatewaysActions";
import FormGateway from "./FormGateway";

const AddGatewayComponent = ({history, loading, funcAddGateway}) => {
    const [afterLoading, setAfterLoading] = useState(false);

    useEffect(() => {
        if (afterLoading === true && loading === false) {
            history.push('/gateways')
        }
        setAfterLoading(loading);
    }, [afterLoading, history, loading]);

    const handlerCancel = () => {
        history.push('/gateways');
    };

    const onSubmit = (values) => {
        funcAddGateway(values);
    };

    return <FormGateway title={"Add gateway"} cancelForm={handlerCancel} saveValues={onSubmit}/>

};

const mapStateToProps = state => ({
    loading: state.gateways.loadingAdd
});

const mapDispatchToProps = dispatch => ({
    funcAddGateway: (values) => dispatch(AddGateway(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGatewayComponent);