import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-primary text-white py-3">
            <div className="container">
                <h1>Page-blog</h1>
                <nav>
                    <Link className="text-white mr-3" to="/">Inicio</Link>
                    <Link className="text-white" to="/add-post">Añadir entrada</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;