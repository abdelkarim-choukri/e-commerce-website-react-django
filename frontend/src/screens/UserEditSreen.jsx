import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link, useNavigate, useParams } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetail, updatUserDetail } from "../features/reducers/userDetailSlice";

/* ACTION CREATORS */
// import { getUserDetails, updateUser } from "../actions/userActions";
/* ACTION TYPES */
// import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen() {
  /* GETTING USER ID FROM URL */
//   const id = match.params.id;
  const { id } = useParams();
  /* STATE */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate =useNavigate();
  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const { user, loading, error,success } = useSelector((state) => state.userDetails);

//   const userUpdate = useSelector((state) => state.userUpdate);
//   const {
//     error: error,
//     loading: loading,
//     success: successUpdate,
//   } = userUpdate;

  useEffect(() => {
    /* IF USER SUCCESSFULLY UPDATED, RESET USER DETAILS & REDIRECT USER TO ADMIN PAGE */
    if (success) {
    //   dispatch({ type: USER_UPDATE_RESET });
        navigate("/admin/userlist");
    } else {
      /* IF WE DON'T HAVE A USER, OR IF WE HAVE DATA LOADED IN BUT WE ARE EDITING SOME OTHER USER THEN WE DISPATCH AND GET DATA OF THAT USER */
      if (!user || user._id !== Number(id)) {
        console.log(id)
        dispatch(fetchUserDetail({id:id}));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, id, success]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updatUserDetail({ _id: user._id, name, email, isAdmin }));
  };

  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

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

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
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

export default UserEditScreen;