import config from "../config/apikey.js";

//현 위치 가져오기
const getLoaction = () => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 60000,
  };

  navigator.geolocation.getCurrentPosition(
    getLocationSuc,
    getLocationErr,
    options
  );
};

// 현 위치 가져오기 성공 : 현 위치의 위도와 경도를 바탕으로 날씨 정보 가져오기
const getLocationSuc = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeatherInfo(latitude, longitude);
};

// 현 위치 가져오기 실패 : 에러 메세지 alert 띄우기
const getLocationErr = (error) => {
  alert(`에러가 발생하여 위치 정보를 찾을 수 없습니다.\n${error.message}`);
};

// 날씨 정보 가져오기 : getLocationsuc에서 넘겨받은 위도와 경도 활용
const getWeatherInfo = async (latitude, longitude) => {
  const APIKEY = config.apiKey;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Weather API 요청이 실패했습니다.");
    }

    const result = await response.json();
    const temp = result.main.temp;
    const weather = result.weather[0].main;
    displayWeatherInfo(temp, weather);
  } catch (error) {
    alert("error가 발생했습니다. 콘솔 창을 확인해주세요.");
    console.log(error);
  }
};

// 얻은 날씨 정보를 화면에 띄우기
const displayWeatherInfo = (temp, weather) => {
  changeBackgroundImg(weather);
  document.querySelector(".weather").textContent = weatherValue[weather];
  document.querySelector(".temp").textContent = temp.toFixed(1) + " °C";
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

// 날씨에 따라 배경화면 이미지 변경하기
const changeBackgroundImg = (weather) => {
  const wrapper = document.querySelector(".wrapper");
  wrapper.style.background = `url('/images/background/${weather}.jpg') no-repeat`;
  wrapper.style.backgroundSize = "cover";
  wrapper.style.backgroundPosition = "center";
};

getLoaction();
