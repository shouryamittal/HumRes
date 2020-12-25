/*********************************************************
 * Filename: index.js
 * Description: This file contains the code app boostrap.
 *********************************************************/

require("./config/config");
require("./db/connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});