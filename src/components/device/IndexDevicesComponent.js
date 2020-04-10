import React from "react";
import ListDevicesComponent from "./ListDevicesComponent";
import Toolbar from "../common/Toolbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function IndexDevicesComponent({history}) {
    const handleToFormAdd = () => {
        history.push('/devices/add');
    };

    return <>
        <Toolbar>
            <button className="btn btn-sm btn-primary" onClick={handleToFormAdd}><FontAwesomeIcon icon="plus"/></button>
        </Toolbar>
        <ListDevicesComponent/>
    </>
}

export default IndexDevicesComponent;