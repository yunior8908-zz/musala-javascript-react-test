const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const DeviceSchema = new Schema({
    uid: {
        type: Number,
        required: [true, "uid number is required"]
    }, vendor: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        required: [true, "status is required"],
        enum: ["online", "offline"]
    }
}, {versionKey: false});

DeviceSchema.statics.getById = async function (id) {
    try {
        const device = await this.findById(id).lean();
        if (!device) throw new Error("Device not exist");
        return device;
    } catch (e) {
        throw e;
    }
};

DeviceSchema.statics.getAll = async function (parms) {
    try {
        const total = await this.find().countDocuments();
        const devices = await this.find().setOptions(parms)
        return {
            data: devices,
            total
        }
    } catch (e) {
        throw e;
    }
};

DeviceSchema.statics.AddDevice = async function (values) {
    const {id, ...params} = values;
    try {
        return await this.create(params);
    } catch (e) {
        throw e;
    }
};

DeviceSchema.statics.EditDevice = async function (values) {
    const {id, ...params} = values;
    try {
        if (!id) throw new Error("Bad request");
        const device = await this.getById(id);
        await this.updateOne(device, params, {runValidators: true});
        return  {_id: id};
    } catch (e) {
        throw e;
    }
};

DeviceSchema.statics.DeleteDevice = async function (values) {
    const {id} = values;
    try {
        if (!id) throw new Error("Bad request");
        const device = await this.getById(id);
        return await this.findByIdAndDelete(device);
    } catch (e) {
        throw e;
    }
};

module.exports = model('Device', DeviceSchema);