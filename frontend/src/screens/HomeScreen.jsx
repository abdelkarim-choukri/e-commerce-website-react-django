import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList } from '../features/reducers/productReducers';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';


function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      <Container>
        {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
      </Container>
    </>
  );
}

export default HomeScreen;
















































// import React, { useEffect, useState } from 'react'
// import { Container,Row,Col} from 'react-bootstrap'

// import {useDispatch, useSelector} from 'react-redux'
// import { listProducts } from '../action/productActions';

// function HomeScreen() {

//  const dispatch=useDispatch() ;
//  const productList= useSelector(state=>state.productList)
//  const {loading,error,products}=productList;



//   useEffect(
//     dispatch(listProducts())

//    ,[])

//   return (
//     <>
//     <h1>Latest Products</h1>
//     <Container>
//     <Row>
//             {products.map((product) => {
//               return (
//                 <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
//                   <Product product={product} />
//                 </Col>
//               );
//             })}
//           </Row>
//     </Container>
//     </>
//   )
// }

// export default HomeScreen