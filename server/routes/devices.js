const router = require('express').Router();
const GatewayModel = require('../models/gateway');
const DeviceModel = require('../models/device');

const { deviceMutation } = require('../mutation');

const addDeviceToAGateway = async (device, gatewayId) => {
    if(gatewayId){
        const gateway = await GatewayModel.findById(gatewayId);
        if(gateway){
            await gateway.AddDevice(device);
        }
        else{
            throw new Error(`Gateway with id: ${gatewayId} not exist`);
        }
    }
};

router.param('id', async (req, res, next, id) => {
    try {
        const result = await DeviceModel.findById(id).populate('gateway');
        if (result) {
            req.device = result;
            next();
        } else throw new Error('Item not exist');
    } catch (e) {
        const error = {
            status: 500,
            error: e,
        };
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    const {device} = req;
    if (device) {
        const result = device;
        return res.json(result);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const total = await DeviceModel.countDocuments();
        const list = await DeviceModel.find({}, null, {limit: 10, skip: 0}).populate('gateway');
        return res.json({
            data: list,
            total
        })
    }catch (e) {
        const error = {
            status: 500,
            error: e
        };
        next(error);
    }

});

router.post('/', async (req, res, next) => {
    const {body} = req;
    const {gatewayId, ...prms} = deviceMutation(body);
    const device = new DeviceModel({
        ...prms
    });

    try {
        await device.save();
        await addDeviceToAGateway(device, gatewayId);
        return res.json({
            status: 200,
            message: "ok"
        });
    }catch (e) {
        const error = {
            status: 500,
            error: e
        };
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    const {device} = req;
    const {body} = req;
    const {gatewayId, ...prms} = deviceMutation(body);
    if (device) {
        try {
            await DeviceModel.updateOne(device, prms);
            await addDeviceToAGateway(device, gatewayId);
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

router.delete('/:id', async (req, res, next) => {
    const {device} = req;
    if (device) {
        try {
            const gateway = await GatewayModel.findOne({ devices: device});
            if (gateway){
                await gateway.RemoveDevice(device);
            }
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