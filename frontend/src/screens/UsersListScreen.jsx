import React, { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT BOOTSTRAP */
import { Table, Button } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserDeleted, getUsersList } from "../features/reducers/usersListSlice";
import { useNavigate } from "react-router-dom";

function UsersListScreen() {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {users,loading,error} = useSelector((state)=>state.usersList);
    const {userInfo} = useSelector((state)=>state.userLogin);
    const {success} = useSelector((state)=>state.usersList);
    
    
    useEffect( ()=>{
        if (userInfo && userInfo.isAdmin){
        dispatch(getUsersList())
    }else{
        navigate('/login')
    }
    } ,[dispatch])
    
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this user ?"))
          dispatch(getUserDeleted({id}));
      };

  return (
    <div>
        <h1>Users</h1>

{loading ? (
  <Loader />
) : error ? (
  <Message variant="danger">{error}</Message>
) : (
  <Table striped bordered hover responsive className="table-sm">
    <thead>
      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>ADMIN</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            {user.isAdmin ? (
              <i className="fas fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fas fa-times" style={{ color: "red" }}></i>
            )}
          </td>

          <td>
            <LinkContainer to={`/admin/user/${user._id}`}>
              <Button variant="light" className="btn-sm">
                <i className="fas fa-edit"></i>
              </Button>
            </LinkContainer>

            <Button
              variant="danger"
              className="btn-sm"
              onClick={() => deleteHandler(user._id)}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)}
    </div>
  )
}

export default UsersListScreen