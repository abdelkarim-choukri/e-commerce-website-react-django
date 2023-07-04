import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchProductList } from "../features/reducers/productReducers";
import { getProductDeleted } from "../features/reducers/adminEditProductSlice";


function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading: loadingProduct, error: errorProduct } = useSelector(
    (state) => state.productList
  );
  const {loading: loadingDelete, success:successDelete,error:errorDelete } = useSelector(
    (state) => state.adminEditProduct.deleteProduct
  );
  const { userInfo } = useSelector((state) => state.userLogin);
    console.log(products)
  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    dispatch(fetchProductList());
  }, [dispatch, userInfo,successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(getProductDeleted({id}));
    }
  };

  const createProductHandler = () => {
    // dispatch(createProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {/* {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingProduct ? (
        <Loader />
      ) : errorProduct ? (
        <Message variant="danger">{errorProduct}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
