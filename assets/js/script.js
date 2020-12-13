function myFunction() {
    var searchTerm = document.querySelector("#searchTerm").value;
    console.log("searching for: " + searchTerm);

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

        fetch(
            'https://api.openweathermap.org/data/2.5/onecall?lat=' + response1.coord.lat + '&lon=' + response1.coord.lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=2c1512576f41358397a22bf62cab49d6'
            )
        .then(function(response2) {
            return response2.json();
        })
        .then(function(response2) {
            console.log(response2);
        

            var weatherTempEl = document.createElement('h2');
            weatherTempEl.textContent = response2.current.temp;
            responseContainerEl.appendChild(weatherTempEl);

            var weatherHumidityEl = document.createElement('h2');
            weatherHumidityEl.textContent = response2.current.humidity;
            responseContainerEl.appendChild(weatherHumidityEl);

            var windSpeedEl = document.createElement('h2');
            windSpeedEl.textContent = response2.current.wind_speed;
            responseContainerEl.appendChild(windSpeedEl);

            var uvIndexEl = document.createElement('h2');
            uvIndexEl.textContent = response2.current.uvi;
            responseContainerEl.appendChild(uvIndexEl);
        });
    });
}
