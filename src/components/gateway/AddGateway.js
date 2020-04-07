import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AddGateway} from "./redux/actions/GatewaysActions";
import FormGateway from "../common/FormGateway";

const AddGatewayComponent = ({history, loading, funcAddGateway}) => {
    const [afterLoading, setAfterLoading] = useState(false);

    useEffect(()=> {
        if(afterLoading === true && loading === false){
            history.push('/gateways')
        }
        setAfterLoading(loading);
    }, [loading]);

    const handlerCancelar = () => {
        history.push('/gateways');
    };

    const onSubmit = (values) => {
        funcAddGateway(values);
    };

    return <FormGateway cancelForm={handlerCancelar} saveValues={onSubmit}/>

};

const mapStateToProps = state => ({
    loading: state.gateway.managmentGateways.loadingAdd
});

const mapDispatchToProps = dispatch => ({
    funcAddGateway: (values) => dispatch(AddGateway(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGatewayComponent);