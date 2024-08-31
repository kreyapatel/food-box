import React, { useEffect, useState } from "react";
import CustomIconButton from "./CustomIconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useCart } from "./CartProvider";

const FoodItemCard = ({ itemDetail }) => {
  const { cartItems, handlePlusItem, handleMinusItem } = useCart();
  const [individualItemCount, setIndividualItemCount] = useState(0);
  useEffect(() => {
    const currentItem = cartItems.find((item) => item.name === itemDetail.name);
    if (currentItem) {
      setIndividualItemCount(currentItem.quantity);
    }
  }, [cartItems, itemDetail.name]);

  return (
    <div className='food-card-item'>
      <div className='card-inner-wrap'>
        <div className='image-block'>
          <img src={itemDetail.imageURL} alt='' />
        </div>
        <div className='content-block'>
          <h4>{itemDetail.name}</h4>
          <p className='price'>&#8377;{itemDetail.price}</p>
          <p className='description'>{itemDetail.description}</p>
          <p className='ingredients'>{itemDetail.ingredients.join(", ")}</p>
        </div>
        <div className='btn-wrap'>
          <CustomIconButton
            icon={RemoveIcon}
            id='minus-button'
            onClick={() => {
              handleMinusItem(itemDetail);
            }}
            className='primary-btn minus-btn'
            disabled={individualItemCount === 0}
          />
          <span className='items-count'>{individualItemCount}</span>
          <CustomIconButton
            icon={AddIcon}
            id='plus-button'
            onClick={() => {
              handlePlusItem(itemDetail);
            }}
            className='primary-btn plus-btn'
          />
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
