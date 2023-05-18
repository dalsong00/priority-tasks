const getLoaction = () => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  navigator.geolocation.getCurrentPosition(
    getLocationSuc,
    getLocationErr,
    options
  );
};

const getLocationSuc = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeatherInfo(latitude, longitude);
};

const getLocationErr = (error) => {
  alert(`${error.code}가 발생하여 위치 정보를 찾을 수 없습니다.`);
};

const getWeatherInfo = (latitude, longitude) => {
  const APIKEY = "91ab9442f47f179e8d008c3a609c5e3e";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`
  )
    .then((res) => res.json())
    .then((result) => {
      const weatherInfo = result;
      const temp = weatherInfo.main.temp;
      const weather = weatherInfo.weather[0].main;

      document.querySelector(".weather").textContent = weatherValue[weather];
      document.querySelector(".temp").textContent = temp.toFixed(1) + " °C";
    });
};

const weatherValue = {
  Clear: "맑음",
  Rain: "비",
  Thunderstorm: "뇌우",
  Snow: "눈",
  Mist: "옅은 안개",
  Drizzle: "이슬비",
  Clouds: "흐림",
  Fog: "안개",
  Haze: "실안개",
};

getLoaction();
