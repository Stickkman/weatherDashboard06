// JavaScript
var searchBtn = ('#searchBtn'); // variable for search button
var citySearchedEl = document.querySelector('input').value
var citySearched =''; // global variable for city input
var tempLat ='';
var tempLon ='';
var currentDate = dayjs().format('M/D/YYYY'); // variable for current date
var geoKey ="c321f3556bedeb7d653f0b65cb45d13b"
var cityCount = 0 // counter var for created additional local storage keys
// function to handle searches after search button is pressed
function searchHandler(event) {
    event.preventDefault(); // prevents default action of form submits
    var citySearched = document.querySelector('input').value; // variable for city that input
    console.log(citySearched); // test
        convertNames(citySearched); // calls converter function
           document.querySelector('input').value =''; // clears search box
    }
// function to convert input city name to geo coordinates  
function convertNames(convertData){
    // api query url based upon city entered with key auto added    
    var geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + convertData + "&limit=1&appid=" + geoKey;
        fetch(geoApi)
            .then(function (response) {
                console.log(response.status);
                    if (response.status !== 200) {
                        alert("Error reaching Server" + "\n Status Code: " + response.status);
                    }
                    return response.json();
            })
                .then(function (data) {  // gets lat and lon for city name that is passed in
                    console.log(data);
                        var lat = data[0].lat; //lat numerical form
                        var lon = data[0].lon; //long numerical form
                        console.log("Converted Lat: " + lat + "\nConverted Lon: " + lon); //test for conversion
                            tempLat = lat; tempLon = lon;
    
                            presentWeather(); // call next function
                })
    
}
// function to get current weather conditions of city
function presentWeather () {
    console.log("Present Passed Lat: " + tempLat + "\nPresent Passed Lon: " + tempLon); //test if variables passed to next function
    // custom url for current city data retrieval based on lat and lons
    var latLonUrl ="https://api.openweathermap.org/data/2.5/weather?lat=" + tempLat + "&lon=" + tempLon + "&units=imperial&appid=" + geoKey;
    fetch(latLonUrl)
        .then(function (response) {
            console.log(response.status);
                if(response.status !== 200) { // check for status errors, if there are any alert
                    alert("Error reaching Server" + "\n Status Code: " + response.status);
                }
                return response.json();
        })
            .then(function (data) {
                var tempCity = data.name; // holds current city name
                var tempTemp = data.main.temp; // holds current temp
                var tempWind = data.wind.speed; // holds wind speed
                var tempHumidity = data.main.humidity // holds humidty data
                var tempIcon = data.weather[0].icon // holds icon data
                console.log(data);
                // tests for all data for current day --VV--
        console.log("City: " + tempCity + " | Date: " + currentDate + " | Temp: "
        + tempTemp + " | Wind: " + tempWind + " | Humidity: " + tempHumidity + " | Icon: " + tempIcon); 

                    // renders current weather to page
                    $("#cName").text(tempCity);
                    $("#cDate").text(currentDate); 
// FIX DOUBLE ICONS ON ADDITIONAL SEARCHES
                    var iconUrl = "https://openweathermap.org/img/wn/" + tempIcon + ".png"
                    $("#cIcon").append($('<img>', {src: iconUrl}));  // appends icon for current day from custom url
                    $("#cTemp").text("Temp: " + tempTemp + " F");
                    $("#cWind").text("Wind: " + tempWind + " MPH");
                    $("#cHumidity").text("Humidity: " + tempHumidity + " %");
                        })
                            weatherApi(); // call next function  
                    }

function weatherApi(){
    console.log("Passed Lat: " + tempLat + "\nPassed Lon: " + tempLon); //test if variables passed to next function
    // custom url for current city data retrieval based on lat and lons
    var latLonUrl ="https://api.openweathermap.org/data/2.5/forecast?lat=" + tempLat + "&lon=" + tempLon + "&units=imperial&appid=" + geoKey;
    fetch(latLonUrl)
        .then(function (response) {
            console.log(response.status);
                if(response.status !== 200) { // check for status errors, if there are any alert
                    alert("Error reaching Server" + "\n Status Code: " + response.status);
                }
                return response.json();
        })
            .then(function (data) {

                // loop for gathering 5 day forcast data, !!index 1!! starts at 12pm,
                //increments 8 at a time for 24hrs later based on 3 hr indexes
                var i2 = 1; //variable for rendering forecast boxes in a separate loop
                for (i = 1; i < 41; i += 8) {
                var tempCity = data.city.name; // holds current city name
                var tempTemp = data.list[i].main.temp; // holds current temp
                var tempWind = data.list[i].wind.speed; // holds wind speed
                var tempHumidity = data.list[i].main.humidity // holds humidty data
                var tempIcon = data.list[i].weather[0].icon // holds icon data
                console.log("5day forecast " + data); console.log("i" + i);
                // tests for all data for current day --VV--
        console.log("City: " + tempCity + " | Date: " + currentDate + " | Temp: "
        + tempTemp + " | Wind: " + tempWind + " | Humidity: " + tempHumidity + " | Icon: " + tempIcon); 

                        // renders 5 day forecast weather to boxes
                        var baseDate = dayjs().add(i2, 'day'); // adds a day to date per loop
                        result = dayjs(baseDate).format('M/D/YYYY'); // convert format to usual
                    $("#fDate"+i2).text(result);
                    $("#fTemp"+i2).text("Temp: " + tempTemp + " F");
                    $("#fWind"+i2).text("Wind: " + tempWind + " MPH");
                    $("#fHumidity"+i2).text("Humidity: " + tempHumidity + " %"); 
                    var iconUrl = "https://openweathermap.org/img/wn/" + tempIcon + ".png"
                    $("#fIcon"+i2).append($('<img>', {src: iconUrl}));  // appends icon for forecast from custom url
                    i2++; console.log("i2=" + i2);
                }
        // adds search history buttons
    $('#history').append('<button class="is-fullwidth button is-link p-5 mb-2" type="button">'+ tempCity+'</button>');
                // creates a value for city key in localStorage
            if (localStorage.getItem("prevCity") === null) {    
            localStorage.setItem("prevCity", tempCity); // set name of previous city searched for recall later
            } else { cityCount++; localStorage.setItem("prevCity"+cityCount, tempCity )}
        })
}

$(function () { // waits for page to load before any code is executed
        $('#searchBtn').on('click', searchHandler); // listener for search button
            //*create button handlers for history buttons to repopulate appropriate data from localstorage* 
  });
