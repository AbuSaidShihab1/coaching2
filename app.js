const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.port || 5000;
const route = require("./routes/index");
const databsecon = require("./db/databasecon");
const bodyparser = require("body-parser");
// route
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(route);
databsecon();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.listen(port, function () {
  console.log("Your website run on Port:");
});
