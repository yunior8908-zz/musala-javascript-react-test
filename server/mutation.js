const gatewayMutation = ({id, serial, name, address}) => ({...(id ? {id} : {}),...(serial ? {serial} : {}), ...(name ? {name} : {}), ...(address ? {address} : {}) });
const gatewayFiltersMutation = ({id, page=0, pageSize=7}) => ({...(id ? {id} : {}), ...(page ? {skip:  Number(page) * Number(pageSize)} : {}), ...(pageSize ? {limit: Number(pageSize)} : {}) });

const deviceMutation = ({id, uid, vendor, status, gatewayId}) => ({...(id ? {id} : {}),...(uid ? {uid} : {}), ...(vendor ? {vendor} : {}), ...(status ? {status} : {}), ...(gatewayId ? {gatewayId} : {}) });
const deviceFiltersMutation = ({id, page=0, pageSize=5}) => ({...(id ? {id} : {}), ...(page ? {skip: Number(page) * Number(pageSize)} : {}), ...(pageSize ? {limit: Number(pageSize)} : {}) });

module.exports = {
  gatewayMutation,
  gatewayFiltersMutation,
  deviceMutation,
  deviceFiltersMutation
};