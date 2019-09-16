require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes');

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use('/', routes);

app.listen(port, () => console.log(`Server running on localhost:${port}`));