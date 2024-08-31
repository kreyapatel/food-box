import React from "react";
import { useCart } from "../components/CartProvider";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import CustomIconButton from "../components/CustomIconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link, Link as RouterLink } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
// import CustomIconButton from "../components/CustomIconButton";
// import { RemoveCircleOutline } from "@mui/icons-material";

const Cart = () => {
  const { cartItems, handlePlusItem, handleMinusItem } = useCart();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className='cart-section'>
      <Container maxWidth='sm'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link to='/'>Home</Link>
          <Typography>Cart</Typography>
        </Breadcrumbs>
        <h1>Cart</h1>
        {cartItems.length > 0 ? (
          <Box className='cart-list-wrap'>
            <Box className='cart-items-list'>
              {cartItems.map((item) => (
                <Box className='cart-item' key={item.name}>
                  <Box className='image-block'>
                    <img src={item.imageURL} alt='' />
                  </Box>
                  <Box className='item-name'>{item.name}</Box>
                  <Box className='quantity-box'>
                    <CustomIconButton
                      icon={RemoveIcon}
                      id='minus-button'
                      onClick={() => {
                        handleMinusItem(item);
                      }}
                      className='primary-btn minus-btn'
                      disabled={item.quantity === 0}
                    />
                    <span className='items-count'>{item.quantity}</span>
                    <CustomIconButton
                      icon={AddIcon}
                      id='plus-button'
                      onClick={() => {
                        handlePlusItem(item);
                      }}
                      className='primary-btn plus-btn'
                    />
                  </Box>
                  <Box className='price-box'>{item.quantity * item.price}</Box>
                </Box>
              ))}
            </Box>
            <Box className='checkout-btn-wrap'>
              <div className='total-amount'>
                Total Amount :<span>{totalPrice}</span>
              </div>
              <CustomButton
                id='checkout-btn'
                className='primary-btn'
                varient='contained'
                component={RouterLink}
                to='/success'
              >
                Make Payment
              </CustomButton>
            </Box>
          </Box>
        ) : (
          <Box className='empty-cart-block'>
            <ProductionQuantityLimitsIcon className='empty-cart-img' />
            <h2>Your Cart is Empty</h2>
            <Link to='/' className='primary-link'>
              Add items to cart
            </Link>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Cart;
