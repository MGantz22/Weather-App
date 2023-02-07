import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";


// Business Logic

function getWeather (city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  
  
  
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}


// UI Logic

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText =  `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city,) {
  let celsiustemp = (apiResponse.main.temp -272.2).toFixed(2);
  let farenTemp = (celsiustemp/(9/5) + 32).toFixed(2);
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%. 
  The temperature in Kelvins is ${apiResponse.main.temp} degrees.\n The temperature in celsius is ` + celsiustemp + ` . \nThe Temperature in farenheit is` + farenTemp;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

  
