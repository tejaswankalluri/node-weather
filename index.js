const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const templatepath = path.join(__dirname + "/template/views");
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.static("public")); //linking external css to handlebars

app.use("/", require("./router/router"));
app.use("/h", (req, res) => {
    res.render("index");
});
app.listen(port, () => {
    console.log(`server is up at ${port}`);
});
