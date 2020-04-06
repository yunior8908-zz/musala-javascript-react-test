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
        enum: ["online","offline"]
    },
    gateway: {
        type: Schema.Types.ObjectId,
        ref: 'Gateway'
    }
}, {versionKey: false});

module.exports = model('Device', DeviceSchema);