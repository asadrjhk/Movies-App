import React, {useState, useEffect} from 'react'

import {Container, Row, Col, ListGroup, InputGroup, FormControl, Table, Button, Pagination, Image} from 'react-bootstrap'
import {movies} from './getMovies';

const Favorite = () => {
    const movie = movies.results;
    const [genres, setGenres] = useState([]);
    const [currentGenre, setCurrentGenre] = useState('All Genres')

    const genreids = {28: 'Action', 12:'Adventure', 16:'Animation', 35:'Comedy', 80:'Crime', 99: 'Documentary',18: 'Drama', 10751:'Family', 
    14:'Fantasy', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749:'Romance', 878:'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War'
    }
    useEffect(() => {
    const temp = [];
    movie.forEach((movieObj) => {
        const genreCat = genreids[movieObj.genre_ids[0]];
        if (!temp.includes(genreCat)) {
            temp.push(genreCat)
        }
    })
    temp.unshift("All Genres")
    setGenres([...temp]);
    console.log(temp);
    },[])
   
    return (
        <div>
            <Container>
                <Row>
                    <Col className="col-3 m-1 mt-5">
                    <ListGroup responsive>
                        {
                            genres.map((genre) => (
                                currentGenre === genre ? (
                                     <ListGroup.Item active>{genre}</ListGroup.Item>
                                ) : (
                                    <ListGroup.Item>{genre}</ListGroup.Item>
                                )
                            ))
                        }
                         
                    </ListGroup>
                    </Col>
                    <Col className="col mt-5">
                        <InputGroup className="mb-3">
                            <FormControl aria-label="First name" placeholder="Search"/>
                            <FormControl aria-label="Last name" placeholder="Rows Count"/>
                        </InputGroup>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Popularity</th>
                                <th>Rating</th>
                                <th>Button</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    movie.map((movieObj) => (
                                        <tr>
                                            <td>
                                                <Image src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} thumbnail style={{height: "50px"}}/> 
                                                {"-- "}
                                                {movieObj.title}
                                            </td>
                                            <td>{movieObj.genre_ids[0]}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{movieObj.vote_average}</td>
                                            <td><Button variant="danger">Delete</Button></td>
                                        </tr>
                                    ))
                                }
                                
                                
                                
                            </tbody>
                        </Table>
                        <Pagination className="p-3">
                            <Pagination.Prev/>
                            
                            <Pagination.Item active>1</Pagination.Item>
                            <Pagination.Item>2</Pagination.Item>
                            <Pagination.Item>3</Pagination.Item>
                            
                            <Pagination.Next/>
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Favorite
