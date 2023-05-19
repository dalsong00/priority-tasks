const weekday = ["일", "월", "화", "수", "목", "금", "토"];
class GetCurrentTime {
  constructor() {
    this.updateCurrentTime();
    this.currentTime = this.getCurrentTime();
  }

  updateCurrentTime() {
    setInterval(this.getCurrentTime, 60000);
  }

  getCurrentTime() {
    this.currentTime = new Date();
    console.log("시간 업데이트 !! :", this.currentTime);
    return this.currentTime;
  }
}

class StoreTodayInfo {
  constructor(today) {
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

  updateDisplay() {
    if (todayInfo.hour === "오후 11" && todayInfo.minute === "59") {
      todayInfo.displayTodayInfo();
      todayInfo.displayTimeInfo();
    } else {
      todayInfo.displayTimeInfo();
      console.log("time 업데이트!!!");
    }
  }
}

const timeInstance = new GetCurrentTime();
const currentTime = timeInstance.currentTime;
console.log(timeInstance);
const todayInfo = new StoreTodayInfo(currentTime);

todayInfo.displayTodayInfo();
todayInfo.displayTimeInfo();

setInterval(todayInfo.updateDisplay, 60000);
