var cities = loadCitySearch();

var searchHistoryEl = document.querySelector('#search-history');
// searchHistoryEl.innerHTML = '';

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US');
};

var forecastDate = function(i) {
    //Date
    var dateEl = document.createElement('h3');
    var currentDate = new Date();
    var forecastDate = currentDate.addDays(i+1);
    dateEl.textContent = forecastDate;

    return dateEl;
};

var createWeatherEl = function(iconData) {
    //Weather Icon
    var iconEl = document.createElement('p');
    iconEl.textContent = "Weather Icon: " + iconData;
    return iconEl;
};

var createTempEl = function(tempData) {
    // Temperature
    var tempEl = document.createElement('p');
    tempEl.textContent = "Temperature: " + tempData;
    return tempEl;
};

var createHumidityEl = function(humidityData) {
     // Humidty
     var humidityEl = document.createElement('p');
     humidityEl.textContent = "Humidity: " + humidityData;
     return humidityEl;
};

function createHistoryEl(city,i)  {    
    // search history from local storage
    var historyEl = document.createElement('div');
    historyEl.setAttribute("class","history-item")
    historyEl.setAttribute("id","history-item-"+i)
    historyEl.textContent = city;
    return historyEl;
};

var historyButtonHandler = function() {
    // get city from the clicked button and run myFunction
    console.log("History element clicked")
};

var setUviColor = function(uviValue) {
    var color = "";
    if (uviValue <=2) {
        color = '#28ff03';
    } else if (uviValue > 2 && uviValue <= 5) {
        color = 'orange';
    } else {
        color = 'red';
    }
    return color;
};

function myFunction() {
    var searchTerm = document.querySelector("#searchTerm").value;

    if (searchTerm != "" || searchTerm != null) {
        cities.push(searchTerm);
        saveCitySearch(cities);

        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + ',us&appid=2c1512576f41358397a22bf62cab49d6'
            )
        .then(function(response1) {
            return response1.json();
        })
        .then(function(response1) {
            var currentCityEl = document.querySelector('#current-city');
            currentCityEl.innerHTML = '';

            var cityNameEl = document.createElement('h2');
            cityNameEl.setAttribute("class", "current-city-name");
            cityNameEl.textContent = response1.name;
            currentCityEl.appendChild(cityNameEl);

            // add date
            var dateEl = document.createElement('h2');
            var currentDate = new Date();
            dateEl.textContent = currentDate.toLocaleDateString('en-US');
            dateEl.setAttribute("class", "current-date");
            currentCityEl.appendChild(dateEl);

            fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + response1.coord.lat + '&lon=' + response1.coord.lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=2c1512576f41358397a22bf62cab49d6'
                )
            .then(function(response2) {
                return response2.json();
            })
            .then(function(response2) {
                var weatherIconEl = document.createElement('h4');
                weatherIconEl.textContent = "Weather Icon : " + response2.current.weather[0].icon;
                weatherIconEl.setAttribute("class", "current-city-icon");
                currentCityEl.appendChild(weatherIconEl);

                var currentWeatherEl = document.querySelector('#current-weather');
                currentWeatherEl.innerHTML = '';

                var weatherTempEl = document.createElement('h4');
                weatherTempEl.textContent = "Temperature: " + response2.current.temp;
                currentWeatherEl.appendChild(weatherTempEl);

                var weatherHumidityEl = document.createElement('h4');
                weatherHumidityEl.textContent = "Humidity: " + response2.current.humidity;
                currentWeatherEl.appendChild(weatherHumidityEl);

                var windSpeedEl = document.createElement('h4');
                windSpeedEl.textContent = "Wind Speed: " + response2.current.wind_speed;
                currentWeatherEl.appendChild(windSpeedEl);

                // create element for UV Index
                var uvIndexEl = document.createElement('div');
                uvIndexEl.setAttribute("class", "uv-index");
                // UV Index text
                var uvIndexTextEl = document.createElement('h4');
                uvIndexTextEl.setAttribute("class", "uv-index-text");
                uvIndexTextEl.textContent = "UV Index: ";
                // UV Index value
                var uvIndexValueEl = document.createElement('h4');
                uvIndexValueEl.textContent = response2.current.uvi;
                uvIndexValueEl.setAttribute("class", "uv-index-value");
                uvIndexValueEl.setAttribute('style', 'background-color: '+setUviColor(response2.current.uvi) );
                // Add text and value to element
                uvIndexEl.appendChild(uvIndexTextEl);
                uvIndexEl.appendChild(uvIndexValueEl);
                // Add element to DOM
                currentWeatherEl.appendChild(uvIndexEl);

                var forecastHeadingEl = document.querySelector('#forecast-section');
                var forecastHeadingTextEl = document.createElement('h2');
                forecastHeadingTextEl.textContent = "5 Day Forecast";
                forecastHeadingEl.appendChild(forecastHeadingTextEl);

                var forecastEl = document.querySelector('#forecast');
                forecastEl.innerHTML = '';
                //Display the 5 day forecast using loop
                for (i=0; i<5; i++) {
                    var forecastDayEl = document.createElement('section')
                    
                    forecastDayEl.setAttribute("class", "forecast-day");
                        forecastDayEl.appendChild(forecastDate(i));
                        forecastDayEl.appendChild(createWeatherEl(response2.daily[i].weather[0].icon));
                        forecastDayEl.appendChild(createTempEl(response2.daily[i].temp.max));
                        forecastDayEl.appendChild(createHumidityEl(response2.daily[i].humidity));
                    
                    //Dynamic id for each forecast day
                    var elementId= ('forecast-day-'+i);
                    forecastDayEl.setAttribute("id", elementId);
                    
                    forecastEl.appendChild(forecastDayEl);
                }
            });
        });
    }
}

var saveCitySearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

function loadCitySearch() {
    // Gets city search items from localStorage.
    var citiesStorage = [];
    getCities = localStorage.getItem("cities");

    // Converts city search items from the string format back into an array of objects.
    if (getCities === null) {
        citiesStorage = [];
        return citiesStorage;
    } 
    citiesStorage = JSON.parse(getCities);
    
    // Iterates through the cities array and creates city elements in the search history area of the page.
    var searchHistoryEl = document.querySelector('#search-history');
    searchHistoryEl.innerHTML = '';

    for (i=citiesStorage.length-1; i>=0; i--) {
        var city = citiesStorage[i];
        searchHistoryEl.appendChild(createHistoryEl(city,i));
    }
    
    return citiesStorage
}

searchHistoryEl.addEventListener("click", historyButtonHandler);