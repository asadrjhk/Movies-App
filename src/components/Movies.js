import React, { useState } from 'react'
import { movies } from './getMovies'

import {Spinner, Card, Button, Pagination} from 'react-bootstrap';

const Movies = () => {
    const [hover, setHover] = useState('');
    const [pageNumber, setPageNumber] = useState([1]);
    const movie = movies.results;
    return (
         <>
            { movie.length === 0 ? (
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ): (
               <div className="p-5">
                   <h3 className="text-center">Trending Movies</h3>
                   <div className="d-flex flex-wrap gap-1">
                       {
                           movie.map((movieObj) => {
                               return (
                                <Card  key={movieObj.id} style={{ width: '18rem' }} onMouseEnter={() => setHover(movieObj.id)} onMouseLeave={() => setHover('')}>
                                    <Card.Header>Featured</Card.Header>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}/>
                                    <Card.Body>
                                    <Card.Title>{movieObj.title}</Card.Title>
                                    <Card.Text>{movieObj.overview.substring(0,100)}...</Card.Text>
                                    { 
                                        hover === movieObj.id &&  <Button variant="primary">Add to Favorite</Button>
                                    }
                                    
                                    </Card.Body>
                                </Card>
                               )
                           })
                       }
                   </div>
               </div>
            )}
                <Pagination className="justify-content-center p-3">
                    <Pagination.Prev />
                     
                     {  pageNumber.map((value) => (
                            <Pagination.Item>{value}</Pagination.Item>
                        ))
                          
                     }
                     
                    <Pagination.Next />
                </Pagination>
         </>
    )
}

export default Movies
