const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const city = req.body.city;
    const apiKey = "50e08ae00ca0e8874ffecb4c7a1e0104";
    const weatherUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    const kanyeRest = "https://api.kanye.rest/";

    https.get(kanyeRest, (response) => {
        response.once("data", (data) => {
            const kanyeQuote = JSON.parse(data).quote;
            res.write("<h1>" + kanyeQuote + " - Kanye West</h1>");
        });
    });

    https.get(weatherUrl, (response) => {
        response.once("data", (data) => {
            const weatherData = JSON.parse(data);
            const weatherTemp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherFeelsLike = weatherData.main.feels_like;
            const imageUrl ="http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            res.write("<h1>The temperature in " + city + " is " + String(weatherTemp) + 
            "F, feels like " + String(weatherFeelsLike) + "F, with " + String(weatherDescription) + "</h1>");
            res.write('<img src="' + imageUrl + '">');
            res.send();
        
        });
    });
});

app.listen(3000, () => {
    console.log("success");
});
