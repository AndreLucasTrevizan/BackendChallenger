const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const Cors = require('cors');

app.use(Cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const router = require('./src/routes/router');

app.use('/api', router);

const mongoose = require('mongoose');

mongoose.connect("mongodb://mongo:27018/challanger");

app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`);
});