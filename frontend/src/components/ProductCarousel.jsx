import React, { useEffect } from "react";

import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../features/reducers/productReducers";
import { useDispatch, useSelector } from "react-redux";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { topProducts, loading, error } = useSelector((state) => state.productList.top);
 
   
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    loading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <Carousel
        pause="hover"
        className="bg-dark"
        items={topProducts}
        key={(item) => item._id}
      >
        {topProducts.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />

              <Carousel.Caption className="carousel.caption">
                <h4>
                  {product.name} (${product.price})
                </h4>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  );
};

export default ProductCarousel;
