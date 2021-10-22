const express = require("express");
const router = express();
const templatepath = require("app-root-path").resolve("/template/views");
const fetch = require("node-fetch");
// views engine
router.set("views", templatepath);

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/api", (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;
  const apikey = `${process.env.APIKEY}`;
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apikey}`;
  fetch(api)
    .then((response) => response.json())
    .then((body) => {
      return res.json(body);
    })
    .catch(() => {
      return res.status(502).send({
        message: "unable to fetch data",
      });
    });
});
module.exports = router;
