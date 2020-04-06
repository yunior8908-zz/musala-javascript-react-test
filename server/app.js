const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;

const mongoConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(`mongodb://localhost/musalatest`, mongoConnectionOptions)
    .then(()=> console.log('database connection success'))
.catch(err=> console.error(err));

app.use(cors());
app.use(bodyParser.json());

const routes = require('./routes');

app.use(routes);

app.use((req, res, next)=> {
    const error  = {
        status: 400,
        error: new Error('The url not exist.'),
        message: 'The url not exist.'
    };
    return next(error);
});

app.use((err, req, res, next)=> {
    const status = err.status || 500;
    if(err){
        return res.status(status).send({
            error: err.error || err,
            message: err.error ? err.error.message : err.message
        })
    }
    return res.send("ok")
});

app.listen(8000, function() {
    console.log(`server runing for a port 8000`);
});