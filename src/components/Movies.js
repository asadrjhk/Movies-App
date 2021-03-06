import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Spinner, Card, Button, Pagination} from 'react-bootstrap';

const apiKey = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=`;


const Movies = () => {
    const [hover, setHover] = useState('');
    const [pageNumber, setPageNumber] = useState([1]);
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);

    const [favorites,setFavorites] = useState([]);
    

    const hook = () => {
        axios.get(`${API_URL}${currentPage}`)
            .then(response => {
                const data = response.data;
                console.log(data);
                setMovies([...data.results])
            })

        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')  
        let temp = oldData.map((movie) => movie.id);
        setFavorites([...temp])
    }
    useEffect(hook, [currentPage]);
    
    // second part work start->
    const handleNext = () => {
        setCurrentPage(pageNumber[pageNumber.length - 1] + 1);
        setPageNumber(pageNumber.concat(pageNumber[pageNumber.length - 1] + 1));
         
    }
    const handlePrev = (page) => {
        if (page !== 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            // pageNumber.pop()
            setPageNumber(pageNumber.slice(0, -1));

        }
    }
    const handleClickPage = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
        console.log("current-page: ", currentPage);
    }
    // second part work end ->

    const handleFavorites = (movieObj) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        console.log(favorites.includes(movieObj.id));
        if (favorites.includes(movieObj.id)) {
            console.log('hello:', favorites)
            oldData = oldData.filter((movie) => movie.id !== movieObj.id);
            let temp = oldData.map((movie) => movie.id);
            setFavorites([...temp])
        } else {
            oldData.push(movieObj);
            setFavorites(favorites.concat(movieObj.id))
            console.log("favorites: ", favorites)
            
        }
        localStorage.setItem('movies', JSON.stringify(oldData))
        console.log(oldData);
    }
    
    return (
         <>
            { movies.length === 0 ? (
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ): (
               <div className="p-5">
                   <h3 className="text-center">Trending Movies</h3>
                   <div className="d-flex flex-wrap gap-1">
                       {
                           movies.map((movieObj) => {
                               return (
                                <Card  key={movieObj.id} style={{ width: '18rem' }} onMouseEnter={() => setHover(movieObj.id)} onMouseLeave={() => setHover('')}>
                                    <Card.Header>Featured</Card.Header>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}/>
                                    <Card.Body>
                                    <Card.Title>{movieObj.title}</Card.Title>
                                    <Card.Text>{movieObj.overview.substring(0,100)}...</Card.Text>
                                    <Button>More</Button> {"  "}
                                    { 
                                        hover === movieObj.id &&  <Button variant="primary" onClick={() => handleFavorites(movieObj)}>{favorites.includes(movieObj.id) ? "Remove from favorites" : "Add to favorites"}</Button>
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
                    <Pagination.Prev onClick={() => handlePrev(currentPage)} />
                     
                     {  pageNumber.map((value) => (
                            <Pagination.Item onClick={() => handleClickPage(value)}>{value}</Pagination.Item>
                        ))
                          
                     }
                     
                    <Pagination.Next onClick={handleNext}/>
                </Pagination>
         </>
    )
}

export default Movies
