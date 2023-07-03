import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/Navbar.css';
import { FaBars } from 'react-icons/fa';

function CustomNavbar() {
    const [expanded, setExpanded] = useState(false);

    const toggleNavbar = () => {
        setExpanded(!expanded);
    };

    return (
        <Navbar
            bg="dark"
            expand="lg"
            expanded={expanded}
            className="navbar-container"
        >
            <Container>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={toggleNavbar}
                    bg="ligth"
                >
                    <FaBars className="hamburger-icon" />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" onClick={toggleNavbar}>
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/add-post" onClick={toggleNavbar}>
                            Añadir publicación
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;