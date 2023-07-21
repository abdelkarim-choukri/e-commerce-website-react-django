import React from 'react'
import { Container,Row} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import { Link } from "react-router-dom";
import '../App.css'
import axios from 'axios'

function Product({product}) {
 

  return (
  <Card className="my-3 p-3 rounded d-flex flex-column">
    <Link to={`/product/${product._id}`} className="link">
      <div className="card-image">
      <Card.Img src={product.image} className="product-image"/>

      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text >
            <Rating
              value={product.rating}
              text={`${product.countInStock} reviews`}
              color="#f8e825"
            />
          </Card.Text>
        </div>
        <div>
          <Card.Text as="h3">
            <strong>${product.price}</strong>
          </Card.Text>
        </div>
      </Card.Body>
      </Link>
    </Card>
  );
}
  


export default Product