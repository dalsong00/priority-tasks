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
  const lat = latitude;
  const lon = longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
  )
    .then((res) => res.json())
    .then((result) => {
      const weatherInfo = result;
      console.log(result);
      return weatherInfo;
    });
};

getLoaction();
