const gatewayMutation = ({serial, name, address}) => ({...(serial ? {serial} : {}), ...(name ? {name} : {}), ...(address ? {address} : {}) });
const deviceMutation = ({uid, vendor, status, gatewayId}) => ({...(uid ? {uid} : {}), ...(vendor ? {vendor} : {}), ...(status ? {status} : {}), ...(gatewayId ? {gatewayId} : {}) });

module.exports = {
  gatewayMutation,
  deviceMutation
};