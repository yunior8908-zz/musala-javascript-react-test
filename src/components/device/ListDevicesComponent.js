import React, {useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {FetchListDevices} from "./redux/DevicesActions";
import {SetDrawerContent, SetDrawerVisible} from "../drawer/redux/DraweActions";
import SelectedDevice from "./SelectedDeviceComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IndexPagination from "../pagination/IndexPagination";

function ListDevicesComponent({
                                  pagination,
                                  devices,
                                  total,
                                  history,
                                  location,
                                  funcSetDrawerVisible,
                                  funcSetDrawerContent,
                                  funcFetchListDevices,
                                  formControl = false,
                                  devicesChecked,
                                  setDevicesChecked
                              }) {
    const urlSearchParams = new URLSearchParams(location.search);
    const deviceId = urlSearchParams.has('id') ? urlSearchParams.get('id') : '';

    useEffect(()=> {
        return ()=>{
            funcSetDrawerVisible(false);
        }
    }, [funcSetDrawerVisible]);

    useEffect(() => {
        funcFetchListDevices({page: pagination.page - 1, pageSize: pagination.pageSize});
    }, [funcFetchListDevices, pagination]);

    const handleLinkClick = (id) => {
        urlSearchParams.set('id', id);
        history.push({
            pathname: '/devices',
            search: urlSearchParams.toString()
        });
        funcSetDrawerVisible(true);
        funcSetDrawerContent(<SelectedDevice/>);
    };

    const handleOnchange = (ev) => {
        const {value, checked} = ev.target;
        if (checked) {
            setDevicesChecked([...devicesChecked, value]);
        } else {
            setDevicesChecked(devicesChecked.filter(dc => dc !== value));
        }
    };

    const handleSelectAllInPage = (ev) => {
        const {checked} = ev.target;
        if (checked) {
            setDevicesChecked([...devicesChecked, ...devices.map(device => device._id)]);
        } else {
            setDevicesChecked([]);
        }
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
            <thead>
            <tr>
                <th>{formControl ?
                    <input
                        type="checkbox"
                        onChange={handleSelectAllInPage}
                        checked={devices.length === devices.filter(exist => devicesChecked.includes(exist._id)).length}
                    /> :
                    <span>No.</span>}</th>
                <th className="text-center">UID</th>
                {!formControl && <th className="text-center">VENDOR</th>}
                <th className="text-center">CREATED</th>
                {!formControl && <th className="text-center">STATUS</th>}
                {!formControl && <th></th>}
            </tr>
            </thead>
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
                    <td>{formControl ?
                        <input
                            type="checkbox"
                            value={device._id}
                            checked={devicesChecked.includes(device._id)}
                            onChange={handleOnchange}
                        /> :
                        index + 1}</td>
                    <td className="text-center">
                        {!formControl ? <span
                            style={{
                                cursor: 'pointer'
                            }}
                            className="btn-link"
                            onClick={() => handleLinkClick(device._id)}
                        >{device.uid}</span> : device.uid}
                    </td>
                    {!formControl && <td className="text-center">{device.vendor}</td>}
                    <td className="text-center">{d.isValid() ? d.format('DD-MM-YYYY hh:mm:ss') : "-"}</td>
                    {!formControl && <td className="text-center">{device.status ? device.status : "-"}</td>}
                    {!formControl && <td className="text-center">
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
                    </td>}
                </tr>
            })}
            </tbody>
        </table>
        <IndexPagination total={total}/>
    </>
}

const mapStateToProps = state => ({
    devices: state.devices.devices,
    total: state.devices.total,
    pagination: state.pagination
});

const mapDispatchToProps = dispatch => ({
    funcFetchListDevices: (params) => dispatch(FetchListDevices(params)),
    funcSetDrawerVisible: (visible) => dispatch(SetDrawerVisible(visible)),
    funcSetDrawerContent: (content) => dispatch(SetDrawerContent(content))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListDevicesComponent));