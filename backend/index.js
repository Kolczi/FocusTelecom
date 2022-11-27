const express = require("express");
const httpServer = express();
const dialer = require("dialer").Dialer;
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { call } = require("dialer/src/Dialer");
const validator = require("./validator");
const config = require("./config.json");

httpServer.use(bodyParser.json());
httpServer.use(cors());
httpServer.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

dialer.configure(config.useFakeApi ? null : config.dialerCredentials);

// Serwer nasłuchuje na porcie
const serverInstance = httpServer.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}!`);
});
const io = new Server(serverInstance);

io.on("connect", (socket) => {
  console.log("socket connected");
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

httpServer.post("/call", async (req, res) => {
  let bridge;
  const number1 = req.body.number;
  const number2 = config.useFakeApi ? config.fakeApiNumber : config.myNumber;

  //  Number validation
  if (!validator.isPhoneNumber(number1)) {
    res.status(400).send();
    io.emit("status", "FAILED");
    console.log("bad Number");
    return;
  }
  //  Try to make connection
  try {
    bridge = await dialer.call(number1, number2);
  } catch (err) {
    console.log(err);
    res.status(400).send();
    io.emit("status", "FAILED");
    console.log("bad dialer");
    return;
  }

  let oldStatus = null;
  const statuses = ["ANSWERED", "FAILED", "BUSY", "NO ANSWER"];

  let interval = setInterval(async () => {
    let currentStatus = await bridge.getStatus();

    if (currentStatus !== oldStatus) {
      oldStatus = currentStatus;
      io.emit("status", currentStatus);
    }

    if (statuses.includes(currentStatus)) {
      clearInterval(interval);
    }
  }, 1000);
  res.json({ id: "123", status: bridge.STATUSES.NEW });
});
