const express = require('express');
var cors = require("cors");
const app = express()
const port = process.env.PORT || 5001;
const bodyParser = require("body-parser");
const router = require('./src/routes');
app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());
app.use("/api/v1", router);
app.listen(port, () => console.log(`Listening on port ${port} `))