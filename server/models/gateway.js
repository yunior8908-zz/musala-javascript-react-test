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
                return /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(v);
            },
            message: ({value}) => `${value} is not a valid ipv4 address`
        }
    },
    devices: [{
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }]
}, {versionKey: false});

GatewaySchema.methods.AddDevice = async function (device) {
    if (this.devices.length < 10) {
        try {
            const exist = this.devices.find(el => el.toString() === device.id.toString());
            if (!exist) {
                this.devices.push(device);
                await this.updateOne(this);
            }
        } catch (e) {
            throw e;
        }
    } else {
        throw new Error(`The gateway ${this.name} is full of max allowed devices: 10`)
    }
};

GatewaySchema.methods.RemoveDevice = async function (device) {
    const exist = this.devices.find(el => el.toString() === device.id.toString());
    if (exist) {
        try {
            this.devices.remove(device);
            await this.updateOne(this);
        } catch (e) {
            throw e;
        }
    } else
        throw new Error("The device not exist")
};

module.exports = model('Gateway', GatewaySchema);