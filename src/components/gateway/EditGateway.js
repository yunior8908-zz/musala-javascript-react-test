import React, {useEffect, useState} from "react";
import FormGateway from "../common/FormGateway";
import {connect} from "react-redux";
import {EditGateway} from "./redux/actions/GatewaysActions";

function EditGatewayComponent({history, gateway, loading, funcEditGateway}) {
    const [afterLoading, setAfterLoading] = useState(false);

    useEffect(() => {
        if (afterLoading === true && loading === false) {
            history.push('/gateways')
        }
        setAfterLoading(loading);
    }, [loading]);

    const handlerCancelar = () => {
        history.push('/gateways');
    };

    const onSubmit = (values) => {
        funcEditGateway(values);
    };

    return <FormGateway editGateway={gateway || {}} cancelForm={handlerCancelar} saveValues={onSubmit}/>
};

const mapStateToProps = state => ({
    loading: state.gateway.managmentGateways.loadingEdit,
    gateway: state.gateway.managmentGateways.gateway
});

const mapDispatchToProps = dispatch => ({
    funcEditGateway: (values) => dispatch(EditGateway(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGatewayComponent);