import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar py-3 px-5 bg-dark text-white">
            <div className="navbar-brand">
                <Link to="/" style={{textDecoration: "none", color: "white"}}>Movies App</Link>
            </div>
            <div className="nav-text">
                <Link to="/favorites" style={{textDecoration: "none", color: "white"}}>Favorites</Link>
            </div>
        </div>
    )
}

export default Navbar
