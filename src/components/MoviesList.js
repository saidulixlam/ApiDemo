import React from 'react';
import Movie from './Movie';
// import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          openingText={movie.openingText}
          releaseDate={movie.releaseDate}
          onDeleteMovie={props.onDeleteMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
