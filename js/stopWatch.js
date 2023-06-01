import { makeTwoDigits } from "./utilites.js";

let time = 0;
let timerState = null;
let stopWatchState = false;

const startBtn = document.querySelector(".strat-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".reset-btn");

const startStopWatch = () => {
  if (!stopWatchState) {
    stopWatchState = true;
    timerState = setInterval(updateTime, 1000);
  }
};

const storeStopWatchInfo = (time) => {
  let hour = makeTwoDigits(Math.floor(time / 3600));
  let minute = makeTwoDigits(Math.floor((time % 3600) / 60));
  let second = makeTwoDigits(time % 60);
  return [hour, minute, second];
};

const updateTime = () => {
  time += 1;
  const [hour, minute, second] = storeStopWatchInfo(time);
  displayStopWatch(hour, minute, second);
};

const displayStopWatch = (hour = "00", minute = "00", second = "00") => {
  const timer = document.querySelector(".timer");
  timer.textContent = `${hour}:${minute}:${second}`;
};

const stopStopWatch = () => {
  stopWatchState = false;
  clearInterval(timerState);
};

const resetStopWatch = () => {
  time = 0;
  stopWatchState = false;
  displayStopWatch();
};

startBtn.addEventListener("click", () => {
  startStopWatch();
});

stopBtn.addEventListener("click", () => {
  stopStopWatch();
});

resetBtn.addEventListener("click", () => {
  stopStopWatch();
  resetStopWatch();
});
