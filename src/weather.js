import React from 'react';
import ReactDOM from 'react-dom';

fetch("http://ip-api.com/json", function(data2) {
    var lat = data2.lat,
    long = data2.lon;
    var api =
        "http://api.openweathermap.org/data/2.5/weather?&lat=" +
        lat +
        "&lon=" +
        long +
        "&id=5809844&appid=8de948601c0463fbc6ecf328a7d1b6b6";
    fetch(api, function(data) {
        var weatherType = data.weather[0].description;
        var tempSwap = false;
        kTemp = data.main.temp;
        var windSpeed = data.wind.speed;
        var city = data.name + ", " + data.sys.country;
        //var fTemp = Math.round((kTemp * (9 / 5) - 459.67).toFixed(1))
        //var cTemp = Math.round((kTemp - 273).toFixed(1));