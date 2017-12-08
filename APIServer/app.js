/*const data=require("./data");

const sharemessagedata=data.sharemessage;
const dbConnection = require("./config/mongoConnection");*/

const express = require("express");
const bodyParser = require("body-parser");
let app = express();
let configRoutes = require("./routes");

app.use(bodyParser.json());

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
