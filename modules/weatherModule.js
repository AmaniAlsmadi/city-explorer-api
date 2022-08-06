
const { default: axios } = require("axios");
const handlerError = require('../server')

const weatherCache = {};

async function handlerWeather (req, res) {
     const searchQuery = req.query.searchQuery;
    const lat =req.query.lat;
    const lon =req.query.lon;
   
    if(weatherCache[searchQuery] !== undefined){
      res.status(200).send(weatherCache[searchQuery]);

    }else {
      const url = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
   console.log(url);
    try {
      const cityData = url.data.data.map ((item) => new Forecast(item));
      console.log(cityData)
      weatherCache[searchQuery] = cityData;
      //we use (res) to having the data back from respone
      res.status(200).send(cityData);
    } catch (error) {
      handlerError(error,res)
    }
    }
  };


  
  class Forecast {
    constructor(day) {
      this.date = day.valid_date;
      this.description = day.weather.description;
     
    }
  }

  module.exports = {handlerWeather};