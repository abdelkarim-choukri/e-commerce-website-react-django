import React from 'react';
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../features/reducers/userSlice';

import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'; 



function Header() {
    /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
    const  {userInfo}  = useSelector((state) => state.userLogin);

    const dispatch = useDispatch();
  // console.log('name',userInfo.name);// redo 1 object machi array of object 
  
    const logoutHandler = () => {
      localStorage.removeItem('userInfo');
      dispatch(logout());
    };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">SOUPERSHOPE</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink href="/card">
              <i className="fas fa-shopping-cart"></i> Cart
            </NavLink>

            {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

            {/* <NavLink href="/login">
              <i className="fas fa-user"></i> Login
            </NavLink> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;