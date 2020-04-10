const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;

const dbURI = `mongodb://localhost/musalatest`;

const mongoConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    loggerLevel: 'info'
};

const db = mongoose.connection;

db.on('connecting', function () {
    console.log('connecting to MongoDB...');
});

db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error.message);
    mongoose.disconnect();
});
db.on('connected', function () {
    console.log('MongoDB connected!');
});
db.once('open', function () {
    console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
db.on('disconnected', function () {
    console.log('MongoDB disconnected!');
    mongoose.connect(dbURI, mongoConnectionOptions);
});

mongoose.connect(dbURI, mongoConnectionOptions);

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routes = require('./routes');

app.use(routes);

app.use((req, res, next) => {
    const error = {
        status: 400,
        error: new Error('The url not exist.'),
        message: 'The url not exist.'
    };
    return next(error);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (err) {
        return res.status(status).send({
            error: err.error || err,
            message: err.error ? err.error.message : err.message
        })
    }
    return res.send("ok")
});

app.listen(8000, function () {
    console.log(`server runing for a port ${8000}`);
});

module.exports = app;