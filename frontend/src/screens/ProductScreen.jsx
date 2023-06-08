

import React, { useEffect, useState } from 'react'
import { Card, ListGroup, Button,Image, Form  } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Rating from '../components/Rating';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProductDetails } from '../features/reducers/productDetailSlice';


function ProductScreen({match}) {

  /* STATE */
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <div>
            <Container>
              <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        color={'#f8e825'}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>

                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0
                              ? 'In Stock'
                              : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      
                      
                      {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Select 
                            // as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                      <ListGroup.Item>
                        <Button
                          className="w-100"
                          disabled={product.countInStock === 0}
                          type="button"
                          onClick={addToCartHandler}
                        >
                          Add to Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default ProductScreen;