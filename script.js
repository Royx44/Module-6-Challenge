// Function to display current weather data
function displayWeatherData(weatherData) {
  var temperature = weatherData.list[0].main.temp;
  var temperatureElement = document.getElementById('temperature');
  temperatureElement.textContent = 'Temperature: ' + temperature;

  // Add code to display other weather information such as humidity, wind speed, etc.
}

// Function to display future weather forecast
function displayForecastData(forecastData) {
  // Add code to display the 5-day forecast
}

// Function to handle the search and update weather data
function searchCity() {
  var city = document.getElementById('cityInput').value;
  getWeatherData(city);
}

// Function to update the search history
function updateSearchHistory(city) {
  // Add code to update the search history UI with the searched city
}

// Function to handle click events on search history
function handleHistoryClick(event) {
  var city = event.target.textContent;
  getWeatherData(city);
}

function getWeatherData(city) {
  var apiKey = '5c389c8d34bd7232c3e945ae11c6001e';
  var geocodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  try {
    fetch(geocodingURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.length === 0) {
          console.log('City not found');
          return;
        }

        var { lat, lon } = data[0];
        var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        fetch(weatherURL)
          .then(function(weatherResponse) {
            return weatherResponse.json();
          })
          .then(function(weatherData) {
            localStorage.setItem('weatherData', JSON.stringify(weatherData));
            displayWeatherData(weatherData);
            displayForecastData(weatherData);
            updateSearchHistory(city);
          })
          .catch(function(error) {
            console.log('An error occurred:', error);
          });
      })
      .catch(function(error) {
        console.log('An error occurred:', error);
      });
  } catch (error) {
    console.log('An error occurred:', error);
  }
}



// Event listener for the search history
var searchHistory = document.getElementById('searchHistory');
searchHistory.addEventListener('click', handleHistoryClick);

// Initial weather data fetch for a default city (e.g., Houston)
var defaultCity = 'Houston';
getWeatherData(defaultCity);
