import React from "react";
import moment from "moment";

function ListGatewayDevices({gateway}) {
    return <>
        {gateway && gateway.devices.length > 0 && <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>No.</th>
                    <th className="text-center">UID</th>
                    <th className="text-center">CREATED</th>
                </tr>
                </thead>
                <tbody>
                {gateway.devices.map((device, index) => {
                    const d = moment(device.created);
                    return <tr key={device._id}>
                        <td>{index + 1}</td>
                        <td className="text-center">{device.uid}</td>
                        <td className="text-center">{d.isValid() ? d.format('DD-MM-YYYY hh:ss:mm') : ''}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>}
    </>
};
export default ListGatewayDevices;