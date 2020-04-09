const router = require('express').Router();
const DeviceModel = require('../models/device');

const {deviceMutation, deviceFiltersMutation} = require('../mutations');

router.get('/', async (req, res, next) => {
    const {id, ...prms} = deviceFiltersMutation(req.query);
    try {
        if (id) {
            const result = await DeviceModel.getById(id)
            return res.json(result);
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
    try {
        const device = await DeviceModel.AddDevice(deviceMutation(req.body));
        return res.json({
            status: 200,
            device: device._id
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
    try {
        const device = await DeviceModel.EditDevice(deviceMutation(req.body));
        return res.json({
            status: 200,
            device: device._id
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
    try {
        const device = await DeviceModel.DeleteDevice(deviceMutation(req.body));
        return res.json({
            status: 200,
            device: device._id
        });
    } catch (e) {
        const error = {
            status: 500,
            error: e
        };
        next(error);
    }
});

module.exports = router;