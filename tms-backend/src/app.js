require("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: [process.env.ALLOWED_ORIGIN , "http://localhost:5173"],
    credentials: true
}));
app.use(express.json({ limit: '10kb'}));

module.exports = app;
