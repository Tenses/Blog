import React from 'react';

function Footer() {

    return (
        <footer className="footer bg-dark text-white text-center">
            <div className="container">
                Page-blog © {new Date().getFullYear()}
            </div>
        </footer>
    );
}

export default Footer;