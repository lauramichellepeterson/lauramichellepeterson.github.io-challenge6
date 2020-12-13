var cities = loadCitySearch();

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US');
}

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
}

var createHumidityEl = function(humidityData) {
     // Humidty
     var humidityEl = document.createElement('p');
     humidityEl.textContent = "Humidity: " + humidityData;
     return humidityEl;
}

function myFunction() {
    var searchTerm = document.querySelector("#searchTerm").value;

    if (searchTerm != "") {
        cities.push(searchTerm);
        console.log("Cities array: " + cities);
        saveCitySearch(cities);
        
        loadCitySearch();

        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + ',us&appid=2c1512576f41358397a22bf62cab49d6'
            )
        .then(function(response1) {
            return response1.json();
        })
        .then(function(response1) {
            console.log(response1);
            var responseContainerEl = document.querySelector('#response-container');
            responseContainerEl.innerHTML = '';

            var cityNameEl = document.createElement('h3');
            cityNameEl.textContent = response1.name;
            responseContainerEl.appendChild(cityNameEl);

            // add date
            var dateEl = document.createElement('h3');
            var currentDate = new Date();
            dateEl.textContent = currentDate.toLocaleDateString('en-US');
            responseContainerEl.appendChild(dateEl);

            fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + response1.coord.lat + '&lon=' + response1.coord.lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=2c1512576f41358397a22bf62cab49d6'
                )
            .then(function(response2) {
                return response2.json();
            })
            .then(function(response2) {
                console.log(response2);
            
                var weatherIconEl = document.createElement('h4');
                weatherIconEl.textContent = "Weather Icon : " + response2.current.weather[0].icon;
                responseContainerEl.appendChild(weatherIconEl);

                var weatherTempEl = document.createElement('h4');
                weatherTempEl.textContent = "Temperature: " + response2.current.temp;
                responseContainerEl.appendChild(weatherTempEl);

                var weatherHumidityEl = document.createElement('h4');
                weatherHumidityEl.textContent = "Humidity: " + response2.current.humidity;
                responseContainerEl.appendChild(weatherHumidityEl);

                var windSpeedEl = document.createElement('h4');
                windSpeedEl.textContent = "Wind Speed: " + response2.current.wind_speed;
                responseContainerEl.appendChild(windSpeedEl);

                var uvIndexEl = document.createElement('h4');
                uvIndexEl.textContent = "UV Index: " + response2.current.uvi;
                responseContainerEl.appendChild(uvIndexEl);

                //Display the 5 day forecast using loop
                for (i=0; i<5; i++) {
                    responseContainerEl.appendChild(forecastDate(i));
                    responseContainerEl.appendChild(createWeatherEl(response2.daily[i].weather[0].icon));
                    responseContainerEl.appendChild(createTempEl(response2.daily[i].temp.max));
                    responseContainerEl.appendChild(createHumidityEl(response2.daily[i].humidity));
                }
            });
        });
    }
}

var saveCitySearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function loadCitySearch() {
    // Gets city search items from localStorage.
    var citiesStorage = [];
    getCities = localStorage.getItem("cities");

    // Converts city search items from the string format back into an array of objects.
    if (getCities === null) {
        citiesStorage = [];
        console.log("cities = null");
        return false;
    } 
    console.log(citiesStorage);
    return citiesStorage = JSON.parse(getCities);
    
    // Iterates through the cities array and creates city elements on the page from it.
}
