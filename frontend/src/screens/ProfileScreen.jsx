import React, { useState, useEffect } from "react";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form, Table } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchUserDetail, updatUserDetail } from "../features/reducers/userDetailSlice";
import { fetchUser } from "../features/reducers/userSlice";
import { update } from '../features/reducers/userSlice';
import { listMyOrders } from "../features/reducers/orderslistSlice";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isLoading ,error:listError,ordersList}=useSelector((state)=>state.ordersList);

  
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if(ordersList.length===0){
        dispatch(listMyOrders());
      }
      if (!user || userInfo.id !== user.id) {
        dispatch(fetchUserDetail({ id: "profile" }));
      }
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [success,userInfo,ordersList,user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updatUserDetail({
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
 
    }
  };

  useEffect( ()=>{
    
    if (success){dispatch(update(user))}
  },[user])
  
  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
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
          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={8}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : listError ? (
          <Message variant="danger">{listError}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createAt}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className="btn sm">Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;