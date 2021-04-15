const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const jamManager = require('./entities/jamManager');

jamManager.startServer();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', routes);

module.exports = app;
