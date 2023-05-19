const weekday = ["일", "월", "화", "수", "목", "금", "토"];

const getCurrentTime = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const date = today.getDate().toString().padStart(2, "0");
  const day = weekday[today.getDay()];
  const hour =
    today.getHours() > 12
      ? `오후 ${(today.getHours() - 12).toString().padStart(2, "0")}`
      : `오전 ${today.getHours().toString().padStart(2, "0")}`;
  const minute = today.getMinutes();

  return [year, month, date, day, hour, minute];
};

const updateDisplay = (...arguments) => {
  const [year, month, date, day, hour, minute] = arguments;
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
