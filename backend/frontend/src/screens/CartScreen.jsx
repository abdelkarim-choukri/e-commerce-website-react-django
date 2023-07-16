import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCartItems, removeFromCart } from '../features/reducers/cartSlice';
import Message from '../components/Message';

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchCartItems({ id, qty }));
    }
  }, [dispatch, id, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigator(`/shipping`);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col xs={4} sm={3} md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col xs={8} sm={9} md={10}>
                    <Row>
                      <Col xs={12} md={6}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col xs={6} md={3}>
                        <strong>${item.price}</strong>
                      </Col>
                      <Col xs={6} md={3}>
                        <Form.Select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart({ id: item.product, newQty: Number(e.target.value) })
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col xs={12} md={6} className="mt-2">
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i> Remove
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              <h4>
                Total Price: $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
