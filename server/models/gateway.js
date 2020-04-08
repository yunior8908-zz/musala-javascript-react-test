var mongoose = require('mongoose');

const {Schema, model} = mongoose;

const GatewaySchema = new Schema({
    serial: {
        type: String,
        required: [true, "Serial number is required"],
        validate: {
            validator: async (value) => {
                try {
                    const result = await model('Gateway').countDocuments({serial: value});
                    return result < 1;
                } catch (e) {
                    throw e;
                }
            }, message: ({value}) => `Gateway with serials ${value} already exist`
        }
    }, name: {
        type: String
    },
    address: {
        type: String,
        required: [true, "the ipv4 address is required"],
        validate: {
            validator: (v) => {
                console.log(v);
                return /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(v);
            },
            message: ({value}) => `${value} is not a valid ipv4 address`
        }
    },
    devices: [{type: Schema.Types.ObjectId, ref: 'Device'}]
}, {versionKey: false});

GatewaySchema.statics.GetById = async function (id) {
    try {
        const gtw = await this.findById(id).populate('devices');
        if (!gtw) throw new Error("Gatewaty not exist");
        return gtw;
    } catch (e) {
        throw e;
    }
};

GatewaySchema.statics.GetAll = async function (parms) {
    try {
        const total = await this.find().countDocuments();
        const gtws = await this.find().setOptions(parms).lean();
        const result = gtws.map(gtw => ({
            ...gtw, devices: gtw.devices.length
        }));
        return {
            data: result,
            total
        }
    } catch (e) {
        throw e;
    }
};

GatewaySchema.statics.AddGateway = async function (values) {
    const {id, addDevices, removeDevices, ...params} = values;

    try {
        const gtw = await this.create(params);
        if (addDevices) {
            await gtw.AddDevices(addDevices);
        }
        if (removeDevices) {
            await gtw.RemoveDevices(removeDevices);
        }
        return gtw;
    } catch (e) {
        throw e;
    }
};

GatewaySchema.statics.EditGateway = async function (values) {
    const {id, serial, addDevices, removeDevices, ...params} = values;
    try {
        if (!id) throw new Error("Bad request");
        const gtw = await this.findById(id);
        await this.updateOne(gtw, params, {runValidators: true});
        if (addDevices) {
            await gtw.AddDevices(addDevices);
        }
        if (removeDevices) {
            await gtw.RemoveDevices(removeDevices);
        }
        return gtw;
    } catch (e) {
        throw e;
    }
};

GatewaySchema.statics.DeleteGateway = async function (values) {
    const {id} = values;
    try {
        if (!id) throw new Error("Bad request");
        return await this.findByIdAndDelete(id);
    } catch (e) {
        throw e;
    }
};

GatewaySchema.methods.AddDevices = async function (devices) {
    try {
        if (this.devices.length >= 10) throw new Error('This gatewat already have 10 devices');
        if (devices.length > 10 ) throw new Error("The devices attached exceed the max of devices in a gateway")
        devices.map(async id => {
            if (id && !this.devices.includes(id)) {
                this.devices.push(id);
            }
            await this.updateOne(this);
        })
    } catch (e) {
        throw e;
    }
};

GatewaySchema.methods.RemoveDevices = async function (devices) {
    try {
        devices.map(async id => {
            this.devices.remove(id);
            await this.updateOne(this);
        })
    } catch (e) {
        throw e;
    }
};

module.exports = model('Gateway', GatewaySchema);