import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchResult from "./SearchResult";
import SimilarMovs from "./SimilarMovs";
import api_key from "../api";

function MovieScreen() {

    let {id} = useParams();

    const [query, setQuery] = useState('');
    const [searchMovie, setSearchMovie] = useState(false);
    const [movie, setMovie] = useState({});
    const [poster, setPoster] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [modalState, setModalState] = useState(false);

    const getSearchMovie = async() => { 
      const result = await fetch(`https://imdb-api.com/API/Search/${api_key}/${query}`).then((res)=> res.json());
      if(result.results!=null) {
        let mov = await fetch(`https://imdb-api.com/ru/API/Title/${api_key}/${result.results[0].id}`).then((res) => res.json());
        setSearchMovie(mov);
      }
    }
  
    useEffect(()=>{
      const getMovie = async() => { 
        let mov = await fetch(`https://imdb-api.com/ru/API/Title/${api_key}/${id}`).then((res) => res.json());
        let video = await fetch(`https://imdb-api.com/API/YouTubeTrailer/${api_key}/${id}`).then((res) => res.json());
        let p = await fetch(`https://imdb-api.com/API/Posters/${api_key}/${id}`).then((res) => res.json());
        setMovie(mov);
        setPoster(p.backdrops[0].link);
        setVideoUrl('https://www.youtube.com/embed/'+video.videoId);
      };
      getMovie()
    },[id, searchMovie]);

    return (
        <>
          <header>
            <p>RichBee Shows</p>
            <div className="searchInput">
              <button onClick={()=> getSearchMovie()}></button>
              <input onChange={(e)=> {setQuery(e.target.value); setSearchMovie(false)}} placeholder="Type here smth..."></input>
            </div>
            {searchMovie &&
              <SearchResult movie={searchMovie}/>
            }
          </header>

          {modalState &&
            <div className="modalWindow" onClick={()=>setModalState(false)}>
              <div className="modalWindow__inner">
              <iframe width="560" height="315" src={videoUrl} 
                title={movie.title} frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
              </iframe>
              </div>
            </div>
          }

          <div className="movieDescription" 
                style={{ backgroundImage: 'url('+ poster +')', 
                backgroundRepeat: 'no-repeat'}}>
            <div className="container">
              <h1>{movie.title}</h1>
              <p>
                <span className="movieDescription__imdb">iMDb</span>
                <span className="movieDescription__imdb-rating"> {movie.imDbRating}</span>
                <span className="movieDescription__category"> {movie.genres} </span>
                <span className="movieDescription__rating"> {movie.year}</span>
              </p>
              <button className="movieDescription__watchButton" onClick={()=>setModalState(!modalState)}>Watch</button>
              <p className="movieDescription__awards">{movie.awards}</p>
            </div>
          </div>

          <div className="movieDescribed">
            <div className="container">
              <h2>Watch {movie.title} on Richbee Shows</h2>
              <p>
                {movie.plot}
              </p>
            </div>
          </div>

            <div className="movieAlsoLike">
              <div className="container">
                <h5>You may also like</h5>
                <SimilarMovs similar={movie.similars}/>
              </div>
            </div>
          
          <footer>
            <p>Richbee Shows</p>
          </footer>
        </>
    );
}

export default MovieScreen;
