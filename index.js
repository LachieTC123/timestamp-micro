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
  let date;
  let invalidString = "Invalid Date";
  //Miliseconds since 1/1/1970
  let mili;
  let result;
  if (req.params.date === undefined) {
    req.params.date = Date.now();
  }
  if (!isNaN(req.params.date)) {
    mili = +req.params.date;
    date = new Date(mili).toUTCString();
  } else {
    mili = Date.parse(req.params.date);
    date = new Date(req.params.date).toUTCString();
  }
  result = { unix: mili, utc: date };

  if (date == invalidString) {
    result = { error: date };
  }
  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
