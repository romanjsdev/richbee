import React, { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import api_key from "../api";

function MainScreen() {

  const [query, setQuery] = useState('');

  const [movie, setMovie] = useState(false);

  const getMovie = async() => { 
    const result = await fetch(`https://imdb-api.com/API/Search/${api_key}/${query}`).then((res)=> res.json());
    if(result.results!=null) {
      let mov = await fetch(`https://imdb-api.com/ru/API/Title/${api_key}/${result.results[0].id}`).then((res) => res.json());
      setMovie(mov);
    }
  }

  useEffect(()=>{
    console.log(movie);
  },[movie]);

  return (
      <div className="mainScreen">
        <h1>Unlimited movies, TV shows, and more.</h1>  
        <p className="mainScreen__p">Watch anywhere. Cancel anytime.</p>
          <div className="mainScreen__search">
            <input onChange={(e)=> {setQuery(e.target.value); setMovie(false)}} placeholder="Type here smth..."></input>
            <button onClick={()=> getMovie()}>Search</button>
          </div>
          {movie &&
            <SearchResult movie={movie}/>
      }
      </div>
  );
}

export default MainScreen;