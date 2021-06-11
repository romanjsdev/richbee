import React from "react";
import { Link } from "react-router-dom";

function SearchResult({movie}){
    return (
        <div className="movie">
        <div className="movie__img"><img src={movie.image} alt={movie.title}></img></div>
        <div className="movie__desc">
          <div className="movie__details">
            <div className="movie__moreDetails">
              <Link className="movie__title" to={`/${movie.id}`}>{movie.title}</Link>
              <p className="movie__genres"><span>{movie.genres}</span> | <span>{movie.year}</span></p>
            </div>
            <div className="movie__rating">
              <p><span>IMDb </span>{movie.imDbRating}</p>
            </div>
          </div>
          <div className="movie__awards"><p>{movie.awards}</p></div>
        </div> 
      </div>  
    )
}

export default SearchResult;