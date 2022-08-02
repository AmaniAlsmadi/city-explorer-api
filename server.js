'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const westherData = require('./data/weather.json');


app.get('/weather', (req, res) => {
    let searchQuery = req.query.searchQuery;

    const city = westherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
try {
    const weatherArr = city.data.map(item=>new Forecast(item)) 

    res.status(200).send(city)

}catch (error){
handelError(error,res)

} 
})

 function handelError(error,res){
    res.status(500).send('Something went wrong');
}
class Forecast{
    constructor(day){
        this.date = day.valid_date;
        this.description = day.weather.description;

    }
}
app.listen(process.env.PORT, () => {

    console.log('working server!')
});