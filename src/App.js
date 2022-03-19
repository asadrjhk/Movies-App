import React from 'react'


import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Movies from './components/Movies';
import './App.css';
const App = () => {
    return (
        <div className="vh-100 bg-gray">
            <Navbar/>
            <Hero/>
            <Movies/>
        </div>
    )
}

export default App
