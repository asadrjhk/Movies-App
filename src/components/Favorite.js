import React, {useState, useEffect} from 'react'

import {Container, Row, Col, ListGroup, InputGroup, FormControl, Table, Button, Pagination, Image} from 'react-bootstrap'
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const Favorite = () => {
    const [genres, setGenres] = useState([]);
    const [currentGenre, setCurrentGenre] = useState('All Genres')
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const genreids = {28: 'Action', 12:'Adventure', 16:'Animation', 35:'Comedy', 80:'Crime', 99: 'Documentary',18: 'Drama', 10751:'Family', 
    14:'Fantasy', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749:'Romance', 878:'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War'
    }
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('movies') || '[]');
        // console.log("data", data);
        const temp = [];
        data.forEach((movieObj) => {
            const genreCat = genreids[movieObj.genre_ids[0]];
            if (!temp.includes(genreCat)) {
                temp.push(genreCat)
            } 
        })
        temp.unshift("All Genres")
        setGenres([...temp]);
        setMovies([...data])
        console.log(temp);
        
    },[]);

    const handleGenre = (genre) => {
        setCurrentGenre(genre);
    }
    /* for filtering genre */

    let filterArray = [];
    if (search === '') {
        filterArray = [...movies];
    } else {
        filterArray = movies.filter((movieObj) => {
            let title = movieObj.original_title.toLowerCase();
            return title.includes(search.toLowerCase())
        })
    }
    if (currentGenre !== 'All Genres') {
        filterArray = movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] === currentGenre)
    }

    /** sorting the movies array */
    const sortPopularityDesc = () => {
        let temp = [...movies];
        temp.sort((movieA, movieB) => {
            return movieB.popularity - movieA.popularity;
        })
        setMovies([...temp]);
    }
    const sortPopularityAsc = () => {
        let temp = [...movies];
        temp.sort((movieA, movieB) => {
            return movieA.popularity - movieB.popularity;
        })
        setMovies([...temp]);
    }
    const sortRatingDesc = () => {
        let temp = [...movies];
        temp.sort((movieA, movieB) => {
            return movieB.vote_average - movieA.vote_average;
        })
        setMovies([...temp]);
    }
    const sortRatingAsc = () => {
        let temp = [...movies];
        temp.sort((movieA, movieB) => {
            return movieA.vote_average - movieB.vote_average;
        })
        setMovies([...temp]);
    }

    /** Pagination for favorite page */
    let pages = Math.ceil(filterArray.length / limit);
    let pagesArray = [];
    for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
    }
    let startIndex = (currentPage - 1) * limit;
    let endIndex = startIndex + limit;
    filterArray= filterArray.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        
    }

    const handleDelete = (id) => {
        let arr = [];
        arr = movies.filter((movieObj) => movieObj.id !== id);
        setMovies([...arr])
        localStorage.setItem('movies', JSON.stringify(arr));
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col className="col-lg-3  mt-5 col-sm-12">
                    <ListGroup responsive>
                        {
                            genres.map((genre) => (
                                currentGenre === genre ? (
                                     <ListGroup.Item active>{genre}</ListGroup.Item>
                                ) : (
                                    <ListGroup.Item role="button" onClick={() => handleGenre(genre)}>{genre}</ListGroup.Item>
                                )
                            ))
                        }
                         
                    </ListGroup>
                    </Col>
                    <Col className="col-lg-9 mt-5 col-sm-12">
                        <InputGroup className="mb-3">
                            <FormControl aria-label="movie name" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <FormControl aria-label="rows count" type="number" placeholder="Rows Count" value={limit} onChange={(e) => setLimit(e.target.value)}/>
                        </InputGroup>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th><FaSortUp onClick={sortPopularityDesc}/>Popularity<FaSortDown onClick={sortPopularityAsc}/></th>
                                <th><FaSortUp onClick={sortRatingDesc}/>Rating<FaSortDown onClick={sortRatingAsc}/></th>
                                <th>Button</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    filterArray.map((movieObj) => (
                                        <tr>
                                            <td>
                                                <Image src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} thumbnail style={{height: "50px"}}/> 
                                                {"-- "}
                                                {movieObj.title}
                                            </td>
                                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{movieObj.vote_average}</td>
                                            <td><Button variant="danger" onClick={() => handleDelete(movieObj.id)}>Delete</Button></td>
                                        </tr>
                                    ))
                                }
                                
                                
                                
                            </tbody>
                        </Table>
                        <Pagination className="p-3">
                            <Pagination.Prev/>
                            {
                                pagesArray.map((page) => (
                                    <Pagination.Item onClick={() => handlePageChange(page)}>{page}</Pagination.Item>
                                ))
                            }
                            <Pagination.Next/>
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Favorite
