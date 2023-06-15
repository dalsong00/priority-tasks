import { makeTwoDigits } from "./utilites.js";
import { WEEKDAY } from "../data/data.js";

const hourFormat = (hour) => {
  if (hour > 12) {
    return `오후 ${makeTwoDigits(hour - 12)}`;
  } else {
    return `오전 ${makeTwoDigits(hour)}`;
  }
};

const getCurrentTime = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = makeTwoDigits(today.getMonth() + 1);
  const date = makeTwoDigits(today.getDate());
  const day = WEEKDAY[today.getDay()];
  const hour = hourFormat(today.getHours());
  const minute = makeTwoDigits(today.getMinutes());

  return [year, month, date, day, hour, minute];
};

const updateDisplay = (...rest) => {
  const [year, month, date, day, hour, minute] = rest;
  displayTodayInfo(year, month, date, day);
  displayTimeInfo(hour, minute);
};

const displayTodayInfo = (year, month, date, day) => {
  const todayInfo = document.querySelector(".today");
  todayInfo.textContent = `${year}년 ${month}월 ${date}일(${day})`;
};

const displayTimeInfo = (hour, minute) => {
  const currentTime = document.querySelector(".current-time");
  currentTime.textContent = `${hour}시 ${minute}분`;
};

const updateTimeInfo = () => {
  const [year, month, date, day, hour, minute] = getCurrentTime();
  updateDisplay(year, month, date, day, hour, minute);
};

updateTimeInfo();
setInterval(updateTimeInfo, 1000);
