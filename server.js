const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const dotenv = require('dotenv')
dotenv.config();
const apiKey = process.env.apiKey
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  let city = req.body.city
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function(err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, plz try again'});
    }
    else {
      let weather = JSON.parse(body)
      if(weather.main == undefined) {
        res.render('index', {weather: null, error: 'Error, plz try again'});
      }
      else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, () => console.log('app listening on port 3000'))