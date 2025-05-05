import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux';
const SecondContainer = () => {
  const movies = useSelector((state) => state?.movies);  
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="-mt-72 pl-12 relative z-20">
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies?.popularMovies} />
          <MovieList title={"Trending"} movies={movies?.nowPlayingMovies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.nowPlayingMovies}
          />         
        </div>
      </div>
    )
  );
}

export default SecondContainer
