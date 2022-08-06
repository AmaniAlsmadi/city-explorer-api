
const { default: axios } = require("axios");
const handlerError = require('../server')


async function handlerWeather (req, res) {
    
    const lat =req.query.lat;
    const lon =req.query.lon;
   console.log(lat,lon)
    
    //const cityArr = weatherData.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase());
    const url = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
   console.log(url);
    try {
      const cityData = url.data.data.map ((item) => new Forecast(item));
      console.log(cityData)
      //we use (res) to having the data back from respone
      res.status(200).send(cityData);
    } catch (error) {
      handlerError(error,res)
    }
  };


  
  class Forecast {
    constructor(day) {
      this.date = day.valid_date;
      this.description = day.weather.description;
     
    }
  }

  module.exports = {handlerWeather};