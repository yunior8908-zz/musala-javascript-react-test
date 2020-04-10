import React, {useEffect, useState} from "react";
import FormGateway from "./FormGateway";
import {connect} from "react-redux";
import {EditGateway} from "./redux/GatewaysActions";

function EditGatewayComponent({history, location, gateway, loading, funcEditGateway}) {
    const [afterLoading, setAfterLoading] = useState(false);
    const urlSearchParams = new URLSearchParams(location.search);

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
        funcEditGateway(values);
    };

    const handleDelete = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/devices/delete',
            search: urlSearchParams.toString()
        })
    };

    return <>
        <FormGateway title="Editar gateway" editGateway={gateway} cancelForm={handlerCancel} saveValues={onSubmit} handleDelete={handleDelete}/>
    </>
};

const mapStateToProps = state => ({
    loading: state.gateways.loadingEdit,
    gateway: state.gateways.gateway
});

const mapDispatchToProps = dispatch => ({
    funcEditGateway: (values) => dispatch(EditGateway(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGatewayComponent);