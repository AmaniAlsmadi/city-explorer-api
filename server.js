'use strict'
//our basic code
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios =require('axios');
const {handlerWeather} = require('./modules/weatherModule');

const { handlerMovie } = require("./modules/movieModule");

const app = express();
app.use(cors());


//read weather.json file
//const weatherData = require("./data/weather.json"); 
// console.log(weatherData);
  
  // create our API using get (our path,function handler have reg&res )
  app.get("/weather", handlerWeather );
  app.get("/movies", handlerMovie );

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

function handlerError(error,res){
  res.status(500).send({error:"Something went wrong"});
}

//call the PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});