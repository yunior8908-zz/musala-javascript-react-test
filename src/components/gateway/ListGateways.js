import React, {useEffect} from "react";
import {withRouter} from 'react-router-dom';
import {FetchGateways, SelectGateway} from "./redux/actions/GatewaysActions";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SetDrawerContent, SetDrawerVisible} from "../drawer/redux/DraweActions";
import SelectedGateway from "./SelectedGateway";
import LocalPagination from "../pagination/LocalPagination";

function TableHead() {
    return <thead>
    <tr>
        <th>No.</th>
        <th>Serial</th>
        <th>Name</th>
        <th className="text-center">Ipv4 Address</th>
        <th className="text-center">Devices</th>
        <th></th>
    </tr>
    </thead>
}

function ListGateways({
                          pagination,
                          visible,
                          gateways,
                          total,
                          funcSetDrawerVisible,
                          funcSetDrawerContent,
                          funcFetchGateways,
                          history,
                          location
                      }) {
    const urlSearchParams = new URLSearchParams(location.search);
    const gatewayId = urlSearchParams.has('id') ? urlSearchParams.get('id') : '';

    useEffect(() => {
        funcFetchGateways({page: pagination.page - 1, pageSize: pagination.pageSize});
    }, [pagination]);

    useEffect(() => {
        if (visible) {
            funcSetDrawerContent(<SelectedGateway/>)
        }
    }, [visible]);

    const handleSelect = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/gateways',
            search: urlSearchParams.toLocaleString()
        });
    };

    const handleEdit = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/gateways/edit',
            search: urlSearchParams.toLocaleString()
        });
    };

    const handleDelete = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/gateways/delete',
            search: urlSearchParams.toLocaleString()
        })
    };

    const handleSetDrawerVisible = (id) => {
        handleSelect(id);
        funcSetDrawerVisible(true);
    };

    return <div className="table-responsive">
        <table className="table table-hover table-striped">
            <TableHead/>
            <tbody>
            {gateways.map((gtw, index) => <tr
                key={gtw._id}
                style={{
                    cursor: "pointer",
                    ...(gatewayId === gtw._id ? {background: 'rgba(0,0,0, 0.6)'} : {}),
                    ...(gatewayId === gtw._id ? {color: '#fff'} : {}),
                }}
                onDoubleClick={() => handleSetDrawerVisible(gtw._id)}
            >
                <td>{index + 1}</td>
                <td>
                    <span
                        className="btn-link"
                        onClick={() => handleSetDrawerVisible(gtw._id)}
                    >{gtw.serial}</span>
                </td>
                <td>{gtw.name}</td>
                <td className="text-center">{gtw.address}</td>
                <td className="text-center">
                    <span
                        className="btn-link"
                    >{gtw.devices ? gtw.devices : '-'}</span>
                </td>
                <td className="text-right">
                    <div className="btn-group justify-content-end">
                        <FontAwesomeIcon color="#117EDD" icon="edit" onClick={() => handleEdit(gtw._id)}/>
                        <FontAwesomeIcon color="#FF2626" icon="trash" onClick={() => handleDelete(gtw._id)}/>
                    </div>
                </td>
            </tr>)}
            </tbody>
        </table>
        <LocalPagination total={total}/>
    </div>
}

const mapStateToProps = state => ({
    gateways: state.gateway.managmentGateways.gateways,
    total: state.gateway.managmentGateways.total,
    visible: state.drawer.visible,
    pagination: state.pagination
});

const mapDispatchToProps = dispatch => ({
    funcSetDrawerVisible: (flag) => dispatch(SetDrawerVisible(flag)),
    funcSetDrawerContent: (content) => dispatch(SetDrawerContent(content)),
    funcFetchGateways: (prms) => dispatch(FetchGateways(prms)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListGateways));