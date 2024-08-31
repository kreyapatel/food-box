import { Container } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartProvider";

const OrderSuccess = () => {
  const { handleOrderList } = useCart();
  return (
    <div className='order-success-section'>
      <Container maxWidth='lg'>
        <div className='content-block'>
          <CheckCircleIcon />
          <h1>Order PLaced Succesfully.!</h1>
          <Link
            className='primary-link'
            to='/'
            onClick={() => {
              handleOrderList();
            }}
          >
            Go to Homepage
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default OrderSuccess;
