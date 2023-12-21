const apiKey = "1a66aaac830cca68c9bc1393663f1a9d";
const apiUrl1 =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiUrl2 =
  "https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";

//declaring api function call for current location data
async function checkCLWeather(apiUrl) {
  try {
    const response = await fetch(apiUrl + `bambili&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("API request failed");
    }
    var data = await response.json();

    currentLocationWeather(data);
  } catch {
    console.error("An error occured:", error);
  }
}

//function that determines photo change due to current weather condition
function weatherImageHandling(condition) {
  let imgArray = [
    "clear",
    "clouds",
    "drizzle",
    "humidity",
    "mist",
    "rain",
    "snow",
    "storm",
    "wind",
  ];
  let returnCondition = "";
  if (imgArray.includes(condition)) {
    returnCondition = condition;
  } else {
    returnCondition = "mist";
  }

  return returnCondition;
}

checkCLWeather(apiUrl1);

// Function to set display weather for current location
const currentLocationTemp = document.querySelector(".current-location-temp");
const currentLocationImg = document.querySelector(".current-location-image");
function currentLocationWeather(data) {
  currentLocationTemp.innerHTML = `${data.main.temp}`;
  currentLocationImg.src = `Assets/${weatherImageHandling(
    data.weather[0].main.toLowerCase()
  )}.png`;
}
//Function to get current date and time
function switchDays(dayValue) {
  let day;
  switch (dayValue) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }
  return day;
}
function getTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const dayValue = now.getDay();
  let day = switchDays(dayValue);
  if (parseInt(seconds) < 10) {
    seconds = `0${seconds}`;
  }
  if (parseInt(minutes) < 10) {
    minutes = `0${minutes}`;
  }
  if (parseInt(hours) < 10) {
    hours = `0${hours}`;
  }
  let time = `${hours}:${minutes}:${seconds}`;

  let dateTxt = `${day}, ${time}`;
  return dateTxt;
}
//calling date and time function at intervals
let currentDateTime = document.getElementById("date-time");
var intervalId = setInterval(() => {
  currentDateTime.innerHTML = `${getTime()}`;
}, 1000);

// Functions for API call based on user input
async function getWeatherData(apiUrl, apiUrl2, location) {
  const response = await fetch(apiUrl + location + `&appid=${apiKey}`);
  var data = await response.json();
  const response2 = await fetch(apiUrl2 + location + `&appid=${apiKey}`);
  var data2 = await response2.json();
  var dataArray = [data, data2];

  // calling various data inserting fuctions
  insertTodaysValues(data);
  insertForecastValues(data, data2);
}
// getWeatherData(apiUrl1, apiUrl2, "Bamenda");

//declaring various useful elements on the Today's tab
let todaysTemp = document.querySelector(".todays-temp-js");
let cityName = document.querySelector(".city-name-js");
let todaysImg = document.querySelector(".todays-img-js");
let todaysWindSpeed = document.querySelector(".wind-speed-value-js");
let todaysPressure = document.querySelector(".pressure-value-js");
let todaysVisibility = document.querySelector(".visibility-value-js");
let todaysHumidity = document.querySelector(".humidity-value-js");

//Function to acces returned data from the Api and insert them in the Main tab
function insertTodaysValues(data) {
  todaysTemp.innerHTML = data.main.temp;
  cityName.innerHTML = data.name;
  todaysImg.src = `Assets/${weatherImageHandling(
    data.weather[0].main.toLowerCase()
  )}.png`;
  todaysWindSpeed.innerHTML = data.wind.speed;
  todaysPressure.innerHTML = data.main.pressure;
  todaysVisibility.innerHTML = data.visibility;
  todaysHumidity.innerHTML = data.main.humidity;
}

//declaring useful elements within the week tab
let forecastImg1 = document.querySelector(".forecast-img1");
let forecastImg2 = document.querySelector(".forecast-img2");
let forecastImg3 = document.querySelector(".forecast-img3");
let forecastImg4 = document.querySelector(".forecast-img4");
let forecastImg5 = document.querySelector(".forecast-img5");
let forecastImg6 = document.querySelector(".forecast-img6");
let forecastTemp1 = document.querySelector(".forecast-temp1");
let forecastTemp2 = document.querySelector(".forecast-temp2");
let forecastTemp3 = document.querySelector(".forecast-temp3");
let forecastTemp4 = document.querySelector(".forecast-temp4");
let forecastTemp5 = document.querySelector(".forecast-temp5");
let forecastTemp6 = document.querySelector(".forecast-temp6");
let forecastWind1 = document.querySelector(".forecast-wind1");
let forecastWind2 = document.querySelector(".forecast-wind2");
let forecastWind3 = document.querySelector(".forecast-wind3");
let forecastWind4 = document.querySelector(".forecast-wind4");
let forecastWind5 = document.querySelector(".forecast-wind5");
let forecastWind6 = document.querySelector(".forecast-wind6");
let forecastHeading3 = document.querySelector(".forecast-heading3");
let forecastHeading4 = document.querySelector(".forecast-heading4");
let forecastHeading5 = document.querySelector(".forecast-heading5");
let forecastHeading6 = document.querySelector(".forecast-heading6");

//Funtion to access returned data and insert in the week tab

function insertForecastValues(data1, data2) {
  //inserting images
  forecastImg1.src = `Assets/${weatherImageHandling(
    data1.weather[0].main.toLowerCase()
  )}.png`;
  forecastImg2.src = `Assets/${weatherImageHandling(
    data2.list[8].weather[0].main.toLowerCase()
  )}.png`;
  forecastImg3.src = `Assets/${weatherImageHandling(
    data2.list[16].weather[0].main.toLowerCase()
  )}.png`;
  forecastImg4.src = `Assets/${weatherImageHandling(
    data2.list[24].weather[0].main.toLowerCase()
  )}.png`;
  forecastImg5.src = `Assets/${weatherImageHandling(
    data2.list[32].weather[0].main.toLowerCase()
  )}.png`;
  forecastImg6.src = `Assets/${weatherImageHandling(
    data2.list[39].weather[0].main.toLowerCase()
  )}.png`;
  //inserting temperature values
  forecastTemp1.innerHTML = data1.main.temp;
  forecastTemp2.innerHTML = data2.list[8].main.temp;
  forecastTemp3.innerHTML = data2.list[16].main.temp;
  forecastTemp4.innerHTML = data2.list[24].main.temp;
  forecastTemp5.innerHTML = data2.list[32].main.temp;
  forecastTemp6.innerHTML = data2.list[39].main.temp;
  //inserting wind speed values
  forecastWind1.innerHTML = data1.wind.speed;
  forecastWind2.innerHTML = data2.list[8].wind.speed;
  forecastWind3.innerHTML = data2.list[16].wind.speed;
  forecastWind4.innerHTML = data2.list[24].wind.speed;
  forecastWind5.innerHTML = data2.list[32].wind.speed;
  forecastWind6.innerHTML = data2.list[39].wind.speed;
  //inserting corresponding days to forecast
  forecastHeading3.innerHTML = switchDays(
    new Date(data2.list[16].dt_txt).getDay()
  );
  forecastHeading4.innerHTML = switchDays(
    new Date(data2.list[24].dt_txt).getDay()
  );
  forecastHeading5.innerHTML = switchDays(
    new Date(data2.list[32].dt_txt).getDay()
  );
  forecastHeading6.innerHTML = switchDays(
    new Date(data2.list[39].dt_txt).getDay()
  );
  // graph data
  let temperatureArray = [
    data1.main.temp,
    data2.list[8].main.temp,
    data2.list[16].main.temp,
    data2.list[24].main.temp,
    data2.list[32].main.temp,
    data2.list[39].main.temp,
  ];
  let graphLabel = [
    "Today",
    "Tomorrow",
    switchDays(new Date(data2.list[16].dt_txt).getDay()),
    switchDays(new Date(data2.list[24].dt_txt).getDay()),
    switchDays(new Date(data2.list[32].dt_txt).getDay()),
    switchDays(new Date(data2.list[39].dt_txt).getDay()),
  ];

  const ctx = document.getElementById("chart");
  if (ctx) {
    const context = ctx.getContext("2d");
    if (context.chart) {
      context.chart.destroy();
    }
  }
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: graphLabel,
      datasets: [
        {
          label: "Temperature variation",
          data: temperatureArray,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  console.log(temperatureArray);
}

//Adding event listerner to search button
let searchBut = document.querySelector(".search-button-js");
let searchInput = document.querySelector(".search-input-js");
searchBut.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInput.value !== "") {
    getWeatherData(apiUrl1, apiUrl2, searchInput.value.toLowerCase());
  }
});
//adding event listener to input
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (searchInput.value !== "") {
      getWeatherData(apiUrl1, apiUrl2, searchInput.value.toLowerCase());
    }
  }
});
