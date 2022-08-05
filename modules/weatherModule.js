
const axios =require('axios');


async function handlerWeather (req, res) {
    
    const searchQuery = req.query.searchQuery;
    const lat =req.query.lat;
    const lon =req.query.lon;
  
    
    //const cityArr = weatherData.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase());
    const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
   console.log(cityArr.data);
  
    try {
      const cityData = cityArr.data.data.map ((item) => new Forecast(item));
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