
const axios =require('axios');


async function handlerMovie (req, res) {
    
    const {searchQuery} = req.query;
   
    const movieArr = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`)
    console.log(movieArr);
    try {
      const movieData = movieArr.data.map ((item) => new Movie(item));

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
      this.image_url=movie.poster_path;
      this.popularity=movie.popularity;
      this.released_on=movie.release_date;
     
    }
  }

  module.exports = {handlerMovie};