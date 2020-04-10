import React, {memo} from "react";
import ListGateways from "./ListGatewaysComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Toolbar from "../common/Toolbar";


function IndexGatewayComponent({history}) {
    const handleToFormAdd = () => {
        history.push('/gateways/add');
    };
    return <>
        <Toolbar>
            <button className="btn btn-sm btn-primary" onClick={handleToFormAdd}><FontAwesomeIcon icon="plus"/></button>
        </Toolbar>
        <ListGateways/>
    </>
};

export default memo(IndexGatewayComponent);