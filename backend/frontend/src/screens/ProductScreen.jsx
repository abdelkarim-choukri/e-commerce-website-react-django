

import React, { useEffect, useState } from 'react'
import { Card, ListGroup, Button,Image, Form  } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Rating from '../components/Rating';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createProductReview, fetchProductDetails, resetProductReview } from '../features/reducers/productDetailSlice';
import { addToCart } from '../features/reducers/cartSlice';

function ProductScreen({match}) {

  /* STATE */
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error,successReview,loadingReview,errorReview} = useSelector((state) => state.productDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id,successReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview({ productId: id, review: { rating, comment } }));
    dispatch(resetProductReview());
    setRating(0);
    setComment('');
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
            <Container className='first-class' >
              <Row>
                <Col md={4} object-fit="cover" width="200" max-width="300" >
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fluid 
                    />
                </Col>

                <Col>
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

                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                    <ListGroup.Item >
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
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

              <Row>
            <Col md={6}>
              <h4 className="mt-3">Reviews</h4>

              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>

                    <Rating value={review.rating} color="#f8e825" />

                    <p>{review.createdAt.substring(0, 10)}</p>

                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4>Write a Review</h4>

                  {loadingReview && <Loader />}
                  {successReview && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>

                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Review</Form.Label>

                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>

                      <Button
                        disabled={loadingReview}
                        type="submit"
                        variant="primary"
                        className="my-3"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">Login</Link> to write a review.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
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