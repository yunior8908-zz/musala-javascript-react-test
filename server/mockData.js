const formGatewayInvalidData = {
    serial: "dasdasdasd",
    address: "das dadasdasd",
    addDevices: ["1","2","3", "4", "5", "6", "7", "8", "9", "10", "11"]
};

const formGatewayValidData = {
    serial: "1",
    name: "probando",
    address: "127.0.0.1",
    addDevices: ["5e8eaff334a32e01408dec24","5e8eaff334a32e01408dec25","5e8eaff334a32e01408dec26"]
};

module.exports = {
    formGatewayValidData,
    formGatewayInvalidData
};