const sliderRed = document.getElementById("myRange1"); //calor Red
const sliderGreen = document.getElementById("myRange2"); //calor Green
const sliderBlue = document.getElementById("myRange3"); //calor Blue

const outputR = document.getElementById("valueR");
const outputG = document.getElementById("valueG");
const outputB = document.getElementById("valueB");

const socket = io();

outputR.innerHTML = sliderRed.value;
outputG.innerHTML = sliderGreen.value;
outputB.innerHTML = sliderBlue.value;

sliderRed.oninput = function () {
  outputR.innerHTML = this.value / 2.5;
  socket.emit("pulseRed", sliderRed.value);
};

sliderGreen.oninput = function () {
  outputG.innerHTML = this.value / 2.5;
  socket.emit("pulseGreen", sliderGreen.value);
};

sliderBlue.oninput = function () {
  outputB.innerHTML = this.value / 2.5;
  socket.emit("pulseBlue", sliderBlue.value);
};

function random() {
  socket.emit("random");
}
function off() {
  outputR.innerHTML = "0";
  outputG.innerHTML = "0";
  outputB.innerHTML = "0";
  sliderRed.value = "0";
  sliderGreen.value = "0";
  sliderBlue.value = "0";
  socket.emit("off");
}

document.getElementById("Random").onclick = random;
document.getElementById("Off").onclick = off;
