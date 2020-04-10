var supertest = require('supertest');

var {formGatewayValidData, formGatewayInvalidData} = require('./mockData');

describe('loading express', () => {
    let app;
    let request;

    beforeEach(() => {
        app = require('../app');
        request = supertest(app);
    });

    it('request to /', function () {
        request.get('/')
            .expect(response => {
                expect(response.state).toBe(400)
                    .done()
            })
    });

    it('request to /gateways', async (done) => {
        const response = await request.get('/gateways');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            total: expect.any(Number),
            data: expect.any(Array)
        });
        done()
    });

    it('request to /devices', async (done) => {
        const response = await supertest(app).get('/devices');
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            total: expect.any(Number),
            data: expect.any(Array)
        });
        done()
    })

    it('request post with invalid data to /gateways', async (done) => {
        const respone = await request.post('/gateways').send(formGatewayInvalidData);
        expect(respone.status).toBe(500);
        done();
    })

    it('request post with valid data  to /gateways should be 200 but if serial already exist should be 500', async (done) => {
        const respone = await request.post('/gateways').send(formGatewayValidData);
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({gateway: expect.any(String), status: 200});
        done();
    })
});