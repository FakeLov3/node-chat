require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes');

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', routes);

app.listen(port, () => console.log(`Server running on localhost:${port}`));