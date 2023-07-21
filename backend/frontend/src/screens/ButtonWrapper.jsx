import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "../features/reducers/orderDetailSlice";
import { fetchDeleverOrder, fetchpayOrder } from "../features/reducers/orderPaySlice";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

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
    const style = {"layout":"vertical"};
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
export default ButtonWrapper;