import React from "react";
import ListDevicesComponent from "./ListDevicesComponent";
import {connect} from "react-redux";
import Toolbar from "../common/Toolbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function IndexDevicesComponent({total, history}) {
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

const mapStateToProps = state => ({
    total: state.devices.total
});

export default connect(mapStateToProps)(IndexDevicesComponent);