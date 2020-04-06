const router = require('express').Router();
const GatewayModel = require('../models/gateway');

const {gatewayMutation} = require('../mutation');

router.param('id', async (req, res, next, id) => {
    try {
        const result = await GatewayModel.findById(id);
        if (result) {
            req.gateway = result;
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
    const {gateway} = req;
    if (gateway) {
        const result = gateway;
        return res.json(result);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const total = await GatewayModel.countDocuments();
        const list = await GatewayModel.find({}, null, {limit: 10, skip: 0});
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
    const gateway = new GatewayModel({
        ...gatewayMutation(body)
    });

    try {
        await gateway.save();
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
    const {gateway} = req;
    const {body} = req;
    if (gateway) {
        try {
            await GatewayModel.updateOne(gateway, gatewayMutation(body));
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
    const {gateway} = req;
    if (gateway) {
        try {
            await gateway.delete();
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

