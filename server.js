'use strict'
//our basic code
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


//read weather.json file
const weatherData = require("./data/weather.json"); 
  console.log(weatherData);
  
  // create our API using get (our path,function handler have reg&res )
app.get("/weather", (req, res) => {
  const searchQuery = req.query.searchQuery;
  const lat =req.query.lat;
  const lon =req.query.lon;

  
  const cityArr = weatherData.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase());

  try {
    const cityData = cityArr.data.map((item) => new Forecast(item));
    //we use (res) to having the data back from respone
    res.status(200).send(cityData);
  } catch (error) {
    handlerError(error,res)
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});
function handlerError(error,res){
  res.status(500).send({error:"Something went wrong"});
}
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
   
  }
}

//call the PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});