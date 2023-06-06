import React from 'react';
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">SOUPERSHOPE</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink href="/card">
              <i className="fas fa-shopping-cart"></i> Card
            </NavLink>
            <NavLink href="/login">
              <i className="fas fa-user"></i> Login
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;