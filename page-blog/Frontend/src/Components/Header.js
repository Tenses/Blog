import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Page-blog</h1>
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/add-post">Añadir entrada</Link>
            </nav>
        </header>
    );
}

export default Header;
