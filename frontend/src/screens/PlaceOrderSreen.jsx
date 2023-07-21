import React, { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { Button, ListGroup, Image, Card } from 'react-bootstrap';
import  {fetchOrderCreate,orderReset}  from '../features/reducers/orderCreateSlice';
import {removeCart} from '../features/reducers/cartSlice';
function PlaceOrderScreen() {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { order, error, success } = useSelector((state) => state.orderCreate);

  useEffect(() => {
    if (success) {
      // dispatch(orderReset())
      dispatch(removeCart())
      navigate(`/order/${order._id}`);}
  }, [success]);

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, []);

  
  const calculateItemsPrice = () => {
    return cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
      );
    };
    
  const itemsPrice = calculateItemsPrice().toFixed(2);
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
  const taxPrice = (0.082 * itemsPrice).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)

  const placeOrder = () => {
    
    const order = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    };
    dispatch(fetchOrderCreate( {order} )); // Pass the order object as an argument
  };
    

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Container>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Shipping Address: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment</h2>
                <p>
                  <strong>Payment Method: </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                ) : (
                    <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                        <Row>
                            <Col xs={2} md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col xs={6} md={5}>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col xs={4} md={5}>
                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
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
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type="button"
                    className="w-100"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlaceOrderScreen;
