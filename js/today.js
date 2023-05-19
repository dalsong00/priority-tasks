const weekday = ["일", "월", "화", "수", "목", "금", "토"];
class StoreTodayInfo {
  constructor() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = (today.getMonth() + 1).toString().padStart(2, "0");
    this.date = today.getDate().toString().padStart(2, "0");
    this.day = weekday[today.getDay()];
    this.hour =
      today.getHours() > 12
        ? `오후 ${(today.getHours() - 12).toString().padStart(2, "0")}`
        : `오전 ${today.getHours().toString().padStart(2, "0")}`;
    this.minute = today.getMinutes();
  }

  displayTodayInfo() {
    const todayInfo = document.querySelector(".today");
    todayInfo.textContent = `${this.year}년 ${this.month}월 ${this.date}일(${this.day})`;
  }

  displayTimeInfo() {
    const currentTime = document.querySelector(".current-time");
    currentTime.textContent = `${this.hour}시 ${this.minute}분`;
  }
}

const todayInfo = new StoreTodayInfo();
todayInfo.displayTodayInfo();
todayInfo.displayTimeInfo();

setInterval(() => {
  if (todayInfo.hour === "오후 11" && todayInfo.minute === "59") {
    todayInfo.displayTodayInfo();
    todayInfo.displayTimeInfo();
  }
  todayInfo.displayTimeInfo();
}, 60000);
