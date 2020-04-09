import React, {useEffect, useState} from "react";
import Card from "../common/Card";
import {connect} from "react-redux";
import {DeleteGateway} from "./redux/GatewaysActions";

function DeleteGatewayComponent({gateway, loading, history, funcDeleteGateway}) {
    const [afterLoading, setAfterLoading] = useState(false);

    useEffect(() => {
        if (afterLoading === true && loading === false) {
            history.push('/gateways')
        }
        setAfterLoading(loading);
    }, [afterLoading, history, loading]);

    const cancelForm = () => {
        history.push('/gateways')
    };

    const handleDelete = () => {
        if (gateway) {
            funcDeleteGateway({id: gateway._id});
        }
    };

    return <Card
        col={12}
        title={"Delete gateway"}
        bodyStyle={{
            textAlign: "center"
        }}
        body={
            <h5>{`Are you sure to want delete gateway with serial: ${gateway && gateway.serial}?`}</h5>
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
    gateway: state.gateways.gateway,
    loading: state.gateways.loadingDelete
});

const mapDispatchToProps = dispatch => ({
    funcDeleteGateway: (data) => dispatch(DeleteGateway(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteGatewayComponent);