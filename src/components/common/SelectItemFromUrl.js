import {useEffect} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {SelectGateway} from "../gateway/redux/GatewaysActions";
import {SelectDevices} from "../device/redux/DevicesActions";

const SelectItemFromUrl = ({location, functSelectGateway, funcSelectDevices}) => {
    const urlSearchParams = new URLSearchParams(location.search);

    useEffect(() => {
        if (urlSearchParams.has('id')) {
            const splt = location.pathname.split("/");
            if (splt.includes("gateways")) {
                functSelectGateway(urlSearchParams.get('id'));
            }
            if (splt.includes("devices")) {
                funcSelectDevices(urlSearchParams.get('id'));
            }
        }
    }, [location, functSelectGateway, funcSelectDevices, urlSearchParams]);
    return null;
};

const mapDispatchToProps = dispatch => ({
    functSelectGateway: (id) => dispatch(SelectGateway(id)),
    funcSelectDevices: (id) => dispatch(SelectDevices(id)),
});

export default connect(null, mapDispatchToProps)(withRouter(SelectItemFromUrl));