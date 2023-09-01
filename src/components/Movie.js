import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h4>{props.releaseDate}</h4>
      <p>{props.openingText}</p>
      <button onClick={() => props.onDeleteMovie(props.id)}>Delete</button>
    </li>
  );
};

export default Movie;
