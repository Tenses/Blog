import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar-container navbar navbar-expand-lg">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item spaced">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item spaced">
                            <Link className="nav-link" to="/add-post">Añadir entrada</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;