const weekday = ["일", "월", "화", "수", "목", "금", "토"];

class StoreTodayInfo {
  constructor() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = (today.getMonth() + 1).toString().padStart(2, "0");
    this.date = today.getDate().toString().padStart(2, "0");
    this.day = today.getDay();
  }
}

const todayInfo = new StoreTodayInfo();
console.log(todayInfo);
