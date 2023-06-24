import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link, useParams } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";

/* PAYPAL BUTTONS */
// import { PayPalButton } from "react-paypal-button-v2";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "../features/reducers/orderDetailSlice";




function OrderScreen({ history, match }) {
  
  const { id } = useParams();
//   const id = id;
console.log(id);
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { orderDetail, error, success,loading } = useSelector((state) => state.orderDetail);
  // ITEMS PRICE GETS CALCULATED ONLY IF WE HAVE AN ORDER
  let itemsPrice = 0;
  if ( orderDetail && orderDetail.orderItems) {
    itemsPrice = orderDetail.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    // CHECK IF WE HAVE THE ORDER DETAILS, IF NOT DISPATCH AN ACTION TO GET THE ORDER DETAILS
    if (orderDetail ) {
        console.log('in useEffect')
      dispatch(fetchOrderDetail(id));
      

    }
  }, [dispatch, id]);
console.log('orderDetail',orderDetail.orderItems);



  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {orderDetail._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {orderDetail.User?.name}</strong>
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderDetail.User?.email}`}>{orderDetail.User?.email}</a>
              </p>

              <p>
                <strong>Shipping Address: </strong>
                {orderDetail.shippingAddress?.address}, {orderDetail.shippingAddress?.city},{" "}
                {orderDetail.shippingAddress?.postalCode},{" "}
                {orderDetail.shippingAddress?.country}
              </p>

              {orderDetail.isDeliver ? (
                <Message variant="success">
                  Delivered on{" "}
                  {orderDetail.deliveredAt
                    ? orderDetail.deliveredAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Payment Method: </strong>
                {orderDetail.paymentMethod}
              </p>

              {orderDetail.isPaid ? (
                <Message variant="success">
                  Paid on {orderDetail.paidAt ? orderDetail.paidAt.substring(0, 10) : null}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>orderDetail Items</h2>

              {!orderDetail || !orderDetail.orderItems ? (
                <Message variant="info">orderDetail is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetail.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ₹{item.price} = ₹
                          {(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>

                  <Col>₹{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>

                  <Col>₹{orderDetail.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>

                  <Col>₹{orderDetail.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>₹{orderDetail.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

           
              
            </ListGroup>

            {/* {loadingDeliver && <Loader />} */}

            {userInfo && userInfo.isAdmin && orderDetail.isPaid && !orderDetail.isDeliver && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn w-100"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;