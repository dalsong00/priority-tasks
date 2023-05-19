const weekday = ["일", "월", "화", "수", "목", "금", "토"];

class GetToday {
  constructor() {
    this.today = new Date();
  }

  getYear() {
    return this.today.getFullYear();
  }

  getMonth() {
    return this.today.getMonth() + 1;
  }

  getDate() {
    return this.today.getDate();
  }

  getDay() {
    return this.today.getDay();
  }
}

const todayInstance = new GetToday();

class StoreTodayInfo {
  constructor(todayInstance) {
    this.year = todayInstance.getYear();
    this.month = todayInstance.getMonth().toString().padStart(2, "0");
    this.date = todayInstance.getDate().toString().padStart(2, "0");
    this.day = weekday[todayInstance.getDay()];
  }
}

const todayInfo = new StoreTodayInfo(todayInstance);

console.log(todayInfo);
