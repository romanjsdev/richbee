import React from "react";
import { Link } from "react-router-dom";

function SimilarMovs({similar}){

    const similarMov = similar.map( mov => 
        <Link className="similar__item" to={`/${mov.id}`} key={mov.id}>
            <img src={mov.image} alt={mov.title}></img>
            <div className="similar__item-prop">
                <p className="similar__item-title">{mov.title}</p>
                <p>{mov.genres}</p>
                <p>{mov.plot}</p>
                <p className="similar__item-rating"><span>IMDb {mov.imDbRating}</span></p>
            </div>
        </Link>
    );

    return (
        <div className="similar">{similarMov}</div>
    )

}

export default SimilarMovs;