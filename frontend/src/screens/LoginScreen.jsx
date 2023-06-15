


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/reducers/userSlice";
import { useNavigate } from 'react-router-dom';
import "../LoginScreen.css"; // Import the CSS file for LoginScreen styling
import Message from "../components/Message";
import Loader from "../components/Loader";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log('userInfo',userInfo)
  useEffect(() => {
    if (userInfo) {
      console.log('Im in ');
      navigate(redirect);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(fetchUser({ email, password }));
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="login-form">
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="login-button">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="register-link"
          >
            Register
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default LoginScreen;
