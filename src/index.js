require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

app.set("port", process.env.PORT);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.log("Server Ready");
});

const socketIo = require("socket.io");
const io = socketIo(server);

const firmata = require("firmata");
const board = new firmata("COM3");

board.on("ready", () => {
  io.on("connection", (socket) => {
    board.pinMode(11, board.MODES.PWM);
    board.pinMode(10, board.MODES.PWM);
    board.pinMode(9, board.MODES.PWM);

    socket.on("pulseRed", (data) => {
      board.analogWrite(11, data);
      console.log(data);
    });

    socket.on("pulseGreen", (data) => {
      board.analogWrite(10, data);
      console.log(data);
    });

    socket.on("pulseBlue", (data) => {
      board.analogWrite(9, data);
      console.log(data);
    });

    socket.on("random", () => {
      console.log("click");
      let led = 0;
      setInterval(function () {
        if (led == 0) {
          board.analogWrite(11, 250);
          board.analogWrite(10, 0);
          board.analogWrite(9, 0);
          led++;
        } else if (led == 1) {
          board.analogWrite(11, 0);
          board.analogWrite(10, 250);
          board.analogWrite(9, 0);
          led++;
        } else if (led == 2) {
          board.analogWrite(11, 0);
          board.analogWrite(10, 0);
          board.analogWrite(9, 250);
          led++;
        }else if (led == 3) {
            board.analogWrite(11, 255);
            board.analogWrite(10, 0);
            board.analogWrite(9, 128);
            led++;
        }else if (led == 4) {
            board.analogWrite(11, 0);
            board.analogWrite(10, 128);
            board.analogWrite(9, 128);
            led++;
        }else if (led == 5) {
            board.analogWrite(11, 255);
            board.analogWrite(10, 255);
            board.analogWrite(9, 255);
            led = 0;
        }
      }, 600);
    });

    socket.on("off", () => {
      board.analogWrite(11, 0);
      board.analogWrite(10, 0);
      board.analogWrite(9, 0);
    });
  });
});
