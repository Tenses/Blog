import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            Page-blog © {currentYear}
        </footer>
    );
}

export default Footer;
