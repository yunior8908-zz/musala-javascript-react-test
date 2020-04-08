import React, {useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {FetchListDevices} from "./redux/actions/DevicesActions";
import {SetDrawerContent, SetDrawerVisible} from "../drawer/redux/DraweActions";
import SelectedDevice from "./SelectedDeviceComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IndexPagination from "../pagination/IndexPagination";

function TableHeader() {
    return <thead>
    <tr>
        <th>No.</th>
        <th className="text-center">UID</th>
        <th className="text-center">VENDOR</th>
        <th className="text-center">CREATED</th>
        <th className="text-center">STATUS</th>
        <th></th>
    </tr>
    </thead>
}

function ListDevicesComponent({pagination, devices, visible, total, history, location, funcSetDrawerVisible, funcSetDrawerContent, funcFetchListDevices}) {
    const urlSearchParams = new URLSearchParams(location.search);
    const deviceId = urlSearchParams.has('id') ? urlSearchParams.get('id') : '';

    useEffect(() => {
        funcFetchListDevices({page: pagination.page - 1, pageSize: pagination.pageSize});
    }, [pagination]);

    useEffect(() => {
        if (visible) {
            funcSetDrawerContent(<SelectedDevice/>)
        }
    }, [visible]);

    const handleLinkClick = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/devices',
            search: urlSearchParams.toString()
        });
        funcSetDrawerVisible(true);
    };

    const handleEditClick = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/devices/edit',
            search: urlSearchParams.toString()
        });
    };

    const handleDeleteClick = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/devices/delete',
            search: urlSearchParams.toString()
        });
    };

    return <>
        <table className="table table-striped table-hover table-sm">
            <TableHeader/>
            <tbody>
            {devices.map((device, index) => {
                const d = moment(device.created);
                return <tr
                    key={device._id}
                    style={{
                        ...(deviceId === device._id ? {background: 'rgba(0,0,0, 0.6)'} : {}),
                        ...(deviceId === device._id ? {color: '#fff'} : {}),
                    }}
                    onDoubleClick={() => handleLinkClick(device._id)}
                >
                    <td className="text-center">{index}</td>
                    <td className="text-center">
                        <span
                            style={{
                                cursor: 'pointer'
                            }}
                            className="btn-link"
                            onClick={() => handleLinkClick(device._id)}
                        >{device.uid}</span>
                    </td>
                    <td className="text-center">{device.vendor}</td>
                    <td className="text-center">{d.isValid() ? d.format('YYY-MM-Dd') : "-"}</td>
                    <td className="text-center">{device.status ? device.status : "-"}</td>
                    <td className="text-center">
                        <div className="btn-group btn-group-sm">
                                <span className="btn">
                                    <FontAwesomeIcon icon="edit" color="#117EDD"
                                                     onClick={() => handleEditClick(device._id)}/>
                                </span>
                            <span className="btn">
                                <FontAwesomeIcon icon="trash" color="#FF2626"
                                                 onClick={() => handleDeleteClick(device._id)}/>
                                </span>
                        </div>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
        <IndexPagination total={total}/>
    </>
}

const mapStateToProps = state => ({
    devices: state.devices.managmentDevices.devices,
    total: state.devices.managmentDevices.total,
    visible: state.drawer.visible,
    pagination: state.pagination
});

const mapDispatchToProps = dispatch => ({
    funcFetchListDevices: (params) => dispatch(FetchListDevices(params)),
    funcSetDrawerVisible: (visible) => dispatch(SetDrawerVisible(visible)),
    funcSetDrawerContent: (content) => dispatch(SetDrawerContent(content))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListDevicesComponent));