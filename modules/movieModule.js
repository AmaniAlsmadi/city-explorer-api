
const { default: axios } = require("axios");
const handlerError = require('../server')


async function handlerMovie (req, res) {
    
  const searchQuery = req.query.query;
  console.log(searchQuery)
   let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
    const movieArr = await axios.get(url)
    
    try {
      const movieData = movieArr.data.results.map ((item) => new Movie(item));
      console.log(movieData);
      res.status(200).send(movieData);
    } catch (error) {
      handlerError(error,res)
      
    }
  };
 

  class Movie {
    constructor(movie) {
      this.title = movie.title;
      this.overview = movie.overview;
      this.average_votes=movie.vote_average;
      this.total_votes=movie.vote_count;
      this.image_url=`https://image.tmdb.org/t/p/w500${movie.poster_path}`
      this.popularity=movie.popularity;
      this.released_on=movie.release_date;
     
    }
  }

  module.exports = {handlerMovie};