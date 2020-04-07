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
        type: String,
        required: [true, "Name is required"],
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
    }, devices: {
        type: [{
            type: Schema.Types.ObjectId
        }]
    }
}, {versionKey: false});

GatewaySchema.statics.getAll = async function (prms) {
    try {
        const total = await this.find({}).countDocuments();
        const list = await this.find({}, null, {...prms, lean: true});
        const result = list.map(gtw => ({...gtw, devices: gtw.devices.length}));
        return {
            data: result,
            total
        }
    } catch (e) {
        throw e;
    }
};

GatewaySchema.methods.AddDevice = async function (device) {
    try {
        if (this.devices.length < 10) {

            const exist = await this.devices.find(el => el.toString() === device.id.toString());
            if (!exist) {
                this.devices.push(device);
                return await this.updateOne(this);
            }
        } else {
            throw new Error(`The gateway ${this.name} is full of max allowed devices: 10`)
        }
    } catch (e) {
        throw e;
    }
};

GatewaySchema.methods.RemoveDevice = async function (device) {
    try {
        const exist = await this.devices.find(el => el.toString() === device.id.toString());
        if (exist) {
            return await this.devices.remove(device);
            await this.updateOne(this);

        } else
            throw new Error("The device not exist")
    } catch (e) {
        throw e;
    }
};

GatewaySchema.statics.withDevices = async function (id, prms) {
    try {
        const gtw = await this.findById(id).lean();
        if (gtw) {
            const total = await model('Device').find({gatewayId: gtw}).countDocuments();
            const devices = await model('Device').find({gatewayId: gtw}, null, prms).select('-gatewayId');
            return {
                ...gtw,
                devices: {
                    list: devices,
                    total: total
                }
            }
        } else throw new Error('That item not exist');
    } catch (e) {
        throw e;
    }
};

module.exports = model('Gateway', GatewaySchema);