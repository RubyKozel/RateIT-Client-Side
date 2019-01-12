import React, { Component } from 'react';
import MovieItem from './movie_item.js'

const MovieList = (props) => {

  let items = [];

  props.movies.forEach( (movie, i) => {
    items.push(
      <MovieItem
          key={props.id[i]}
          onMovieSelect = {props.onMovieSelect}
          movie={movie}
          poster={props.posters[i]}
          id={props.id[i]} />
        );
  });

  return (
      <div className="movies-list-div">
        <ul className="movies-list">
            {items}
        </ul>
      </div>
      
  );
}

export default MovieList;
