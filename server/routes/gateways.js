const router = require('express').Router();
const GatewayModel = require('../models/gateway');

const {gatewayMutation, gatewayFiltersMutation} = require('../mutation');

router.get('/', async (req, res, next) => {
    const {id, ...prms} = gatewayFiltersMutation(req.query);
    try {
        if (id) {
            const gtw = await GatewayModel.GetById(id);
            return res.json(gtw);
        } else {
            const gtws = await GatewayModel.GetAll(prms);
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
    try {
        const gateway = await GatewayModel.AddGateway(gatewayMutation(req.body));
        return res.json({
            status: 200,
            gateway: gateway._id
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
        const gateway = await GatewayModel.EditGateway(gatewayMutation(req.body));
        return res.json({
            status: 200,
            gateway: gateway._id
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
        const gateway = await GatewayModel.DeleteGateway(gatewayMutation(req.body));
        return res.json({
            status: 200,
            gateway: gateway._id
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

