Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US');
}

var forecastDate = function() {
    //Date
    var dateEl = document.createElement('h2');
    var currentDate = new Date();
    var forecastDate = currentDate.addDays(1);
    dateEl.textContent = forecastDate;

    return dateEl;
    // responseContainerEl.appendChild(dateEl);
};

var createWeatherEl = function(iconData) {
    //Weather Icon
    var iconEl = document.createElement('h4');
    iconEl.textContent = "Weather Icon: " + iconData;
    return iconEl;
};

var createTempEl = function(tempData) {
    // Temperature
    var tempEl = document.createElement('h4');
    tempEl.textContent = "Temperature: " + tempData;
    return tempEl;
}

var createHumidityEl = function(humidityData) {
     // Humidty
     var humidityEl = document.createElement('h4');
     humidityEl.textContent = "Humidity: " + humidityData;
     return humidityEl;
}

function myFunction() {
    var searchTerm = document.querySelector("#searchTerm").value;
    // console.log("searching for: " + searchTerm);

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

        var cityNameEl = document.createElement('h2');
        cityNameEl.textContent = response1.name;
        responseContainerEl.appendChild(cityNameEl);

        // add date
        var dateEl = document.createElement('h2');
        var currentDate = new Date();
        dateEl.textContent = currentDate.toLocaleDateString('en-US');
        responseContainerEl.appendChild(dateEl);

        console.log(currentDate.addDays(1));

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

            //Display the 5 day forecast

            responseContainerEl.appendChild(forecastDate());

            responseContainerEl.appendChild(createWeatherEl(response2.daily[0].weather[0].icon));
           
            responseContainerEl.appendChild(createTempEl(response2.daily[0].temp.max));

            responseContainerEl.appendChild(createHumidityEl(response2.daily[0].humidity));
        });
    });
}
