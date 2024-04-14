const express = require("express");
const path = require('path');
const { exec } = require('node:child_process')
const os = require('os');

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
const ip = getIPAddress();
const port = 3000;

app.get("/", function (req, res) {
  res.render('index.ejs',{hostname:ip});
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

