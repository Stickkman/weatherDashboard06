var searchBtn = ('#searchBtn'); // variable for search button
var citySearchedEl = document.querySelector('input').value

var citySearched =''; // global variable for city input
var tempLat ='';
var tempLon ='';
var currentDate = dayjs().format('M/D/YYYY'); // variable for current date
var geoKey ="c321f3556bedeb7d653f0b65cb45d13b"

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
                             
                            // FIX - start forcast function weatherApi();
                            presentWeather();
  
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
                    
            })

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
                
                var tempCity = data.city.name; // holds current city name
                var tempTemp = data.list[0].main.temp; // holds current temp
                var tempWind = data.list[0].wind.speed; // holds wind speed
                var tempHumidity = data.list[0].main.humidity // holds humidty data
                var tempIcon = data.list[0].weather[0].icon // holds icon data
                console.log(data);
                // tests for all data for current day --VV--
        console.log("City: " + tempCity + " | Date: " + currentDate + " | Temp: "
        + tempTemp + " | Wind: " + tempWind + " | Humidity: " + tempHumidity + " | Icon: " + tempIcon); 
                    
            })

}





$(function () { // waits for page to load before any code is executed
    
    

			

  
	 
    
        $('#searchBtn').on('click', searchHandler); // listener for search button

  });



