import React, {useEffect, useState} from "react";
import moment from "moment";
import IndexPagination from "../pagination/IndexPagination";
import {connect} from "react-redux";
import {FetchListDevices} from "../device/redux/actions/DevicesActions";

function ListDevicesToAtach({
                                checkable = true,
                                pagination,
                                devices,
                                total,
                                funcFetchListDevices,
                                devicesChecked,
                                setDevicesChecked
                            }) {

    useEffect(() => {
        funcFetchListDevices({page: pagination.page - 1, pageSize: pagination.pageSize});
    }, [pagination]);

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
            setDevicesChecked(devices.map(device => device._id))
        } else {
            setDevicesChecked([]);
        }
    };

    return <div>
        <table className="table table-hover table-sm">
            <thead>
            <tr>
                <th>{checkable ? <input type="checkbox" onChange={handleSelectAllInPage}
                           checked={devices.length === devicesChecked.length}/> : "No."}</th>
                <th className="text-center">UID</th>
                <th className="text-center">CREATED</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {devices.map((device, index) => {
                const d = moment(device.created);
                return <tr
                    key={device._id}
                    style={{
                        cursor: "pointer",
                    }}
                    onDoubleClick={console.log}
                >
                    <td>
                        {checkable ? <input
                            type="checkbox"
                            value={device._id}
                            checked={devicesChecked.includes(device._id)}
                            onChange={handleOnchange}
                        /> : index.toString()}
                    </td>
                    <td className="text-center">{device.uid}</td>
                    <td className="text-center">{d.isValid() ? d.format('YYY-MM-Dd') : "-"}</td>
                </tr>
            })}
            </tbody>
        </table>
        <IndexPagination total={total}/>
    </div>
}

const mapDispatchToProps = dispatch => ({
    funcFetchListDevices: (params) => dispatch(FetchListDevices(params))
});

const mapStateToProps = state => ({
    devices: state.devices.managmentDevices.devices,
    total: state.devices.managmentDevices.total,
    pagination: state.pagination
});

export default connect(mapStateToProps, mapDispatchToProps)(ListDevicesToAtach);