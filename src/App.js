import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Movies from './components/Movies';
import Favorite from './components/Favorite';
import './App.css';


const App = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={
                    <>
                        <Hero/>
                        <Movies/>
                    </>
                }/>
                <Route path='/favorites' element={<Favorite/>}/>
            </Routes>  
        </Router>
         
    )
}

export default App
