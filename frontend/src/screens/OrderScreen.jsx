import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "../features/reducers/orderDetailSlice";
import { fetchpayOrder } from "../features/reducers/orderPaySlice";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import Message from "../components/Message";
import Loader from "../components/Loader";

const style = {"layout":"vertical"};

const ButtonWrapper = ({ currency, showSpinner }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [{ options, isPending }] = usePayPalScriptReducer();
  const { orderDetail, error, success, loading } = useSelector(
    (state) => state.orderDetail
  );
  const amount = orderDetail.totalPrice;
  const { loadingPay, successPay } = useSelector(
    (state) => state.orderPay
  );
  useEffect(() => {
      dispatch({
          type: "resetOptions",
          value: {
              ...options,
              currency: currency,
          },
      });
  }, [currency, showSpinner]);
  
  const successPaymentHandler = () => {
    dispatch(fetchpayOrder({id}));
    alert('You have successfully paid for your order');
  };

  return (<>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[amount, currency, style]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                  return actions.order
                      .create({
                          purchase_units: [
                              {
                                  amount: {
                                      currency_code: currency,
                                      value: orderDetail.totalPrice,
                                  },
                              },
                          ],
                      })
                      
                   
              }}
              onApprove={data => {successPaymentHandler(data);}}
      
          />
      </>
  );
}

function OrderScreen({ history, match }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { orderDetail, error, success, loading } = useSelector((state) => state.orderDetail);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  

  let itemsPrice = 0;
  if (orderDetail && orderDetail.orderItems) {
    itemsPrice = orderDetail.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  console.log("order is Payed", orderDetail.isPaid);
  console.log("orderDetail", orderDetail.orderItems);

  const clientId = "ARkDDzya47PjpEnWCsv_OPZerYI4Pghe7q8-CMQtlkg7PKsnRX9d2EcjZpfCC--KO1WB08nvFRiBvg0j";
  
  

  useEffect(() => {
    if (orderDetail) {
      console.log("in useEffect");
      dispatch(fetchOrderDetail(id));
    } else if (orderDetail && !orderDetail.isPaid) {
      setSdkReady(true);
    }
  }, [dispatch, id,orderDetail.isPaid]);
  

  const successPaymentHandler = (paymentResult) => {
    dispatch(fetchpayOrder(id, paymentResult));
  };

  console.log(orderDetail.totalPrice);
  const amount = orderDetail.totalPrice;
  
  
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {orderDetail._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {orderDetail.User?.name}</strong>
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderDetail.User?.email}`}>{orderDetail.User?.email}</a>
              </p>

              <p>
                <strong>Shipping Address: </strong>
                {orderDetail.shippingAddress?.address}, {orderDetail.shippingAddress?.city},{" "}
                {orderDetail.shippingAddress?.postalCode},{" "}
                {orderDetail.shippingAddress?.country}
              </p>

              {orderDetail.isDeliver ? (
                <Message variant="success">
                  Delivered on{" "}
                  {orderDetail.deliveredAt
                    ? orderDetail.deliveredAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Payment Method: </strong>
                {orderDetail.paymentMethod}
              </p>

              {orderDetail.isPaid ? (
                <Message variant="success">
                  Paid on {orderDetail.paidAt ? orderDetail.paidAt.substring(0, 10) : null}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>orderDetail Items</h2>

              {!orderDetail || !orderDetail.orderItems ? (
                <Message variant="info">orderDetail is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetail.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>

                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>

                  <Col>${orderDetail.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>

                  <Col>${orderDetail.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>${orderDetail.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!orderDetail.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalScriptProvider
                options={{
                    "clientId":"ARkDDzya47PjpEnWCsv_OPZerYI4Pghe7q8-CMQtlkg7PKsnRX9d2EcjZpfCC--KO1WB08nvFRiBvg0j",
                    components: "buttons",
                    currency: "USD"
                }}
            >
				<ButtonWrapper
                    currency="USD"
                    showSpinner={false}
                />
			</PayPalScriptProvider>
                    
                  )}
                </ListGroup.Item>
                )}

           
              
            </ListGroup>

            {/* {loadingDeliver && <Loader />} */}

            {userInfo && userInfo.isAdmin && orderDetail.isPaid && !orderDetail.isDeliver && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn w-100"
                  // onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;