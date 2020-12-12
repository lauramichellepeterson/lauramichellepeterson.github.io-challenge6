// weather api key = 2c1512576f41358397a22bf62cab49d6

// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2c1512576f41358397a22bf62cab49d6

// api.openweathermap.org/data/2.5/weather?q=Austin,us&appid=2c1512576f41358397a22bf62cab49d6

function myFunction() {
    var searchTerm = document.querySelector("#searchTerm").nodeValue;
    console.log("searching for: " + searchTerm);

    fetch(
        // 'api.openweathermap.org/data/2.5/weather?q=' + searchTerm + ',us&appid=2c1512576f41358397a22bf62cab49d6'
        'api.openweathermap.org/data/2.5/weather?q=Austin,us&appid=2c1512576f41358397a22bf62cab49d6'
        )
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response.data[0]);
        var responseContainerEl = document.querySelector('#response-container');
        responseContainerEl.innerHTML = '';
    });
}
