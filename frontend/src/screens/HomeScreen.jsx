import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList } from '../features/reducers/productReducers';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useLocation } from 'react-router-dom';
import Paginate from '../components/Paginate';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products,page,pages } = productList;

  /* IF USER SEARCHES FOR ANYTHING THEN THIS KEYWORD CHANGES AND USE EFFECT GETS TRIGGERED */
  const location = useLocation();
  const keyword = location.search;
  console.log(keyword);

  useEffect(() => {
    console.log('dwqd');
    dispatch(fetchProductList(keyword));
  }, [dispatch, keyword]);

 
  return (<>
  <Container>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
      <Paginate page={page} pages={pages} keyword={keyword} />
      </>
  );
}

export default HomeScreen;
