const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 8080;

app.use(cors());
app.options("*", cors());

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/", function (req, res) {
  var responseOk = {
    status: "success",
    message: "Thank you. You are now subscribed.",
  };

  var responseError = {
    status: "error",
    message: "Invalid Subscription request.",
  };

  res.send(responseOk);
  //res.send(responseError);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
