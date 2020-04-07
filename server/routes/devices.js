const router = require('express').Router();
const GatewayModel = require('../models/gateway');
const DeviceModel = require('../models/device');

const {deviceMutation, deviceFiltersMutation} = require('../mutation');

router.get('/', async (req, res, next) => {
    const {id, ...prms} = deviceFiltersMutation(req.query);
    try {
        if (id) {
            const result = await DeviceModel.findById(id).populate({
                path: 'gatewayId',
                select: '-devices'
            });
            if (result) {
                return res.json(result);
            } else throw new Error('That item not exist');
        } else {
            const result = await DeviceModel.getAll(prms);
            return res.json(result);
        }
    } catch (e) {
        const error = {
            status: 500,
            error: e
        };
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const {body} = req;
    const {id, gatewayId, ...prms} = deviceMutation(body);
    try {
        const device = new DeviceModel({gatewayId, ...prms});
        await device.save();
        if(gatewayId) {
            const gtw = await GatewayModel.findById(gatewayId);
            await gtw.AddDevice(device);
        }
        return res.json({
            status: 200,
            message: "ok"
        });
    } catch (e) {
        const error = {
            status: 500,
            error: e
        };
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const {body} = req;
    const {id, gatewayId,...prms} = deviceMutation(body);
    try {
        await DeviceModel.updateOne({_id: id}, {gatewayId, ...prms}, {runValidators: true});
        if(gatewayId) {
            const gtw = await GatewayModel.findById(gatewayId);
            await gtw.AddDevice([device]);
        }
        return res.json({
            status: 200,
            message: "ok"
        });
    } catch (e) {
        const error = {
            status: 500,
            error: e
        };
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    const {body} = req;
    const {id} = deviceMutation(body);
    if (id) {
        try {
            const device = await DeviceModel.findById(id);
            if (!device) throw new Error('The device not exist');
            await device.delete();
            return res.json({
                status: 200,
                message: "ok"
            });
        } catch (e) {
            const error = {
                status: 500,
                error: e
            };
            next(error);
        }
    }
});

module.exports = router;