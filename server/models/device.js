var mongoose = require('mongoose');

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
        enum: ["online", "offline"]
    },
    gatewayId: {
        type: Schema.Types.ObjectId,
        ref: 'Gateway'
    }
}, {versionKey: false});

DeviceSchema.statics.getAll = async function (prms) {
    try {
        const total = await this.find({}).countDocuments();
        const list = await this.find({}, null, prms).populate({
            path: 'gatewayId',
            select: '-devices'
        });
        return {
            data: list,
            total
        }
    } catch (e) {
        throw e;
    }
};

module.exports = model('Device', DeviceSchema);