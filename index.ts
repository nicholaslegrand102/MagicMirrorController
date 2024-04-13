const express = require("express");
const path = require('path');
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/On", function (req, res) {
  res.send("On");
});

app.post("/Off", function (req, res) {
  res.send("Off");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

