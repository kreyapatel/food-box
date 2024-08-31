import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const handlePlusItem = (itemDetail) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.name === itemDetail.name
      );
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...itemDetail, quantity: 1 }];
      }
    });
  };

  const handleMinusItem = (itemDetail) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.name === itemDetail.name
      );
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[itemIndex].quantity > 1) {
          updatedItems[itemIndex].quantity -= 1;
        } else {
          updatedItems.splice(itemIndex, 1);
        }
        return updatedItems;
      }
      return prevItems;
    });
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const handleOrderList = () => {
    setOrderList((prevOrderList) => [...prevOrderList, cartItems]);
    console.log(orderList);
    clearCart();
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        handlePlusItem,
        handleMinusItem,
        clearCart,
        handleOrderList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
export { CartContext };
