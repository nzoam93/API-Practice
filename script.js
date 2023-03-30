let weather = {
    "apiKey": "6355888f4c1def68afb104ad8926155c",
    fetchWeather: function(city) {
        fetch(
            // Website URL is from the https://openweathermap.org/current API doc
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey
        )
            .then((response) => response.json()) //extracts the JSON object from the response str so it's easily usable by the rest of the code 
            .then((data) => this.displayWeather(data));
            //.then is similar to async await
    },
    displayWeather: function(data) {
        const {name} = data; //extracts the name from the data object
        const {icon, description} = data.weather[0]; // extracts the icon, description from the data.weather object (weather nested within data). [0] because it's an array
        const {temp, humidity} = data.main; //extracts the temp,humidity from main nested within the data object. not an array so no 0 needed
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name; 
            //querySelector selects by a className so that's why it's .city
        document.querySelector(".temp").innerText = temp + "°F"
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description//.toLocaleUpperCase('en-US', {usage: 'title'});
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/hr";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.querySelector(".weather").classList.remove("loading"); //removes the loading class after it's loaded
    },
    search: function() { //does the fetchWeather based on the search input
        ourSearch = document.querySelector(".search-bar").value;
        this.fetchWeather(ourSearch);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keydown", function(e){
    if (e.key == "Enter"){
        weather.search();
    }
})

//fetches the info for Oakland when it first loads the page
weather.fetchWeather("Oakland, CA, USA");