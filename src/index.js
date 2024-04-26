function refreshWeather(response){
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(response.data.main.temp);
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed");
   let timeElement = document.querySelector("#time");
   let date = new Date(response.data.timezone * 1000);
   let weatherIcon = document.querySelector("#icon");


   cityElement.innerHTML = response.data.name;
   descriptionElement.innerHTML = response.data.weather[0].description;
   humidityElement.innerHTML = `${response.data.main.humidity}%`;
   windSpeedElement.innerHTML = `${response.data.wind.speed}km/hr`;
   timeElement.innerHTML = formatDate(date);
   
   if(response.data.weather[0].main == "Clouds"){
    weatherIcon.src = "src/cloudy.svg";
    }
    else if(response.data.weather[0].main == "Clear"){
    weatherIcon.src = "src/clear-day.svg";
    }
    else if(response.data.weather[0].main = "Rain"){
    weatherIcon.src = "src/rain.svg";
    }
    
    else if(response.data.weather[0].main == "Drizzle"){
    weatherIcon.src = "src/drizzle.svg";
    }
    else if(response.data.weather[0].main == "Mist"){
    weatherIcon.src = "src/mist.svg";
    }
    else if(response.data.weather[0].main == "Snow"){
    weatherIcon.src = "src/snow.svg";
    }
    else if(response.data.weather[0].main == "Thunderstorm"){
    weatherIcon.src = "src/thunderstorms-night-rain.svg";
    }
    

}
function formatDate(date){
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday" 
     ];
  let day = days[date.getDay()];
  if(minutes < 10){
    minutes = `0${minutes}`
   };
  return`${day} ${hours}:${minutes}`;
  

}


function searchCity(city){
    let apiKey = "50da24d4c009f8e56953c014274fe893";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    
    searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sydney");
