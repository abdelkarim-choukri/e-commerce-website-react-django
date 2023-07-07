import React, { useState, useEffect } from "react";

/* AXIOS */
import axios from "axios";

/* REACT ROUTER */
import { Link, useParams } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../features/reducers/productDetailSlice";
import { getProdectUpdated } from "../features/reducers/adminEditProductSlice";

// /* ACTION CREATORS */
// import { listProductDetails, updateProduct } from "../actions/productActions";

// /* ACTION TYPES */
// import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {
  /* GETTING USER ID FROM URL */
//   const id = match.params.id;
    // const {id} =useParams();
    const { id } = useParams();

  /* STATE */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const { product, loading, error } = useSelector((state) => state.productDetails);


//   const productUpdate = useSelector((state) => state.productUpdate);
//   const {
//     success: successUpdate,
//     loading: loadingUpdate,
//     error: errorUpdate,
//   } = productUpdate;

  useEffect(() => {
   
      if (!product.name || product._id !== Number(id)) {
        console.log(product)
        dispatch(fetchProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
   
  }, [dispatch,id]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();
  
    dispatch(
        
        getProdectUpdated({
        _id: id,
        name,
        price,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", id);

    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error)
      setUploading(false);
    }
  };


  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

            {/* -----------------------------------------------------------------*/}
            </Form.Group>

            <Form.Group className="position-relative mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                    type="file"
                    required
                    name="file"
                    onChange={uploadFileHandler}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                    {/* {error.file} */}
                </Form.Control.Feedback>
                {uploading && <Loader />}
                </Form.Group>
            {/* -----------------------------------------------------------------*/}    
              
            

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="countinstock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;