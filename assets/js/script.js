var searchBtn = ('#searchBtn'); // variable for search button
var citySearchedEl = document.querySelector('input').value

// function to handle searches after search button is pressed
function searchHandler(event) {
    event.preventDefault(); // prevents default action of form submits
    var citySearched = document.querySelector('input').value; // variable for city that input
    console.log(citySearched); // test

    
    
    document.querySelector('input').value =''; // clears search box
}










$(function () { // waits for page to load before any code is executed
    

			

  
	 
    
        $('#searchBtn').on('click', searchHandler); // listener for search button

  });



