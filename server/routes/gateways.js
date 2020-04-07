const router = require('express').Router();
const GatewayModel = require('../models/gateway');

const {gatewayMutation, gatewayFiltersMutation} = require('../mutation');

router.get('/', async (req, res, next) => {
    const {id, ...prms} = gatewayFiltersMutation(req.query);
    try {
        if (id) {
            const withDevices = await GatewayModel.withDevices(id, prms);
            return res.json(withDevices);
        } else {
            const gtws = await GatewayModel.getAll(prms);
            return res.json(gtws);
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
    const {id, ...prms} = gatewayMutation(body);
    const gateway = new GatewayModel(prms);
    try {
        await gateway.save();
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
    const {id, serial,...prms} = gatewayMutation(req.body);
    try {
        if (id) {
            await GatewayModel.updateOne({_id: id}, prms, {runValidators: true});
            return res.json({
                status: 200,
                message: "ok"
            });
        } else throw new Error('Bad request');
    } catch (e) {
        const error = {
            status: 500,
            error: e
        };
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    const {id} = gatewayMutation(req.body);
    try {
        if (id) {
            const gtw = await GatewayModel.findById(id);
            await gtw.delete();
            return res.json({
                status: 200,
                message: "ok"
            });
        } else throw new Error('Bad request');
    } catch (e) {
        const error = {
            status: 500,
            error: e
        };
        next(error);
    }
});

module.exports = router;

