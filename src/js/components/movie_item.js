import React, { Component } from 'react';

const MovieItem = ({onMovieSelect, movie, poster, id}) => {
//  return (
//      
//    <div id="movies" className="movies-div">
//      
//      <li onClick = { () => onMovieSelect(movie, poster, id)} className="movie-item">
//      
//        <div className="video-list"> 
//            
//          <div className="media-left">
//            <img className="media-object" src={poster} />
//          </div>
//
//          <div className="media-body">
//          </div>
//
//        </div>
//
//      </li>
//
//    </div>
//
//  );
    
    return (
      <li onClick = { () => onMovieSelect(movie, poster, id)} className="movie-item">  
        <img className="media-poster" src={poster} />
      </li>
    );
    
//    return <div></div>

}

export default MovieItem;
