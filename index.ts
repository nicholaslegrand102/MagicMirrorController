const express = require("express");
const path = require('path');
const { exec } = require('node:child_process')


const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/On", function (req, res) {

  // run the `ls` command using exec
exec('vcgencmd display_power 1', (err, output) => {
  // once the command has completed, the callback function is called
  if (err) {
      // log and return if we encounter an error
      console.error("could not execute command: ", err)
      return
  }
  // log the output received from the command
  console.log("Output: \n", output)
})
  res.send("On");
});

app.post("/Off", function (req, res) {

    // run the `ls` command using exec
exec('vcgencmd display_power 0', (err, output) => {
  // once the command has completed, the callback function is called
  if (err) {
      // log and return if we encounter an error
      console.error("could not execute command: ", err)
      return
  }
  // log the output received from the command
  console.log("Output: \n", output)
})

  res.send("Off");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

