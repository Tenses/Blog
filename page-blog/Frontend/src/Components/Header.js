import React from 'react';
import '../styles/Header.css';

function Header() {
    return (
        <header className="header-container" style={{ background: '#e9e9e9' }}>
            <div className="container">
                <h1 className="header-title">
                    <span className="gradient-text">Page-blog</span>
                </h1>
            </div>
        </header>
    );
}

export default Header;
