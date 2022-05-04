import React, { useEffect, useState } from 'react'
import {movies} from './getMovies'
import {Card} from 'react-bootstrap';

const Hero = () => {
    const index = Math.floor(Math.random() * movies.results.length);
    console.log(index);
    const movie = movies.results[index];
    
     
    return (
        <div>
           <Card>
                <Card.Img className="hero-img" variant="top" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}/>
                <Card.Body className="hero-body">
                    <Card.Title className="hero-title">{movie.title}</Card.Title>
                    <Card.Text className="hero-text">{movie.overview}</Card.Text>
                </Card.Body>
            </Card> 
        </div>
    )
}

export default Hero
