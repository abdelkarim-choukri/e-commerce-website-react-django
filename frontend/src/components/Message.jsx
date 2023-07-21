/* REACT BOOTSTRAP */
import { Alert } from "react-bootstrap";
import React, { useEffect } from "react";

export default function Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}