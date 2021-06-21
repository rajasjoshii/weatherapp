const https = require('http');
const parser = require('body-parser');
const express = require('express');
const request = require("request");
const path = require('path');
const { json } = require('express');
const app = express();
const port = process.env.PORT || 3000
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.post('/', function (req, res) {

  let params = req.body.CityName;
  const key = 'd848c19468d45f8c524346da22112117';

  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${params}`;

  request(url, (error, response, body) => {

    try {
      const data = JSON.parse(body);
      const temp = data.current.temperature;
      const percp = data.current.precip;
      const hum = data.current.humidity;
      const cloud = data.current.cloudcover;
      const desc = data.current.weather_descriptions[0];
      const icon = data.current.weather_icons[0];


      res.write(`<center><h1>${temp} Celsius</h1><\center>`,);
      res.write(`<center><h3>${desc}</h3><\center>`);
      res.write(`<center><h3>Percipitation : ${percp}</h3><\center>`)
      res.write(`<center><h3>Humidity : ${hum}</h3><\center>`)
      res.write(`<center><h3>Cloudiness : ${cloud}</h3><\center>`)

      res.send();
    }
    catch (error) {
      res.send(`${params} is not a city`)
    }

  });
});

app.listen(port, function () {
  console.log('Node app is working!');
});
