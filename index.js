// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  // Empty date
  if (!req.params.date) {
    let myNow = Date.now();
    let date = new Date(myNow);
    res.json({ unix: myNow, utc: date.toUTCString() });
    // Unix date
  } else if (/^\d+$/.test(req.params.date)) {
    let date = new Date(Number(req.params.date));
    if (!dateIsValid(date)) res.json({ error: "Invalid Date" });
    else res.json({ unix: Number(req.params.date), utc: date.toUTCString() });
    // Other date format
  } else if (req.params.date !== "") {
    let date = new Date(req.params.date);
    if (!dateIsValid(date)) res.json({ error: "Invalid Date" });
    else
      res.json({ unix: Date.parse(req.params.date), utc: date.toUTCString() });
  }
});

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}
// listen for requests :)
var listener = app.listen(/*process.env.PORT*/ 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
