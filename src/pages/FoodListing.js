import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import data from "../data.json";
import FoodItemCard from "../components/FoodItemCard";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../components/AuthContext";

const FoodListing = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const { isLoggedIn } = useAuth();

  const category = data.foodCategories.find(
    (cat) => cat.category === categoryName
  );
  const checkLogedin = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className='category-listing-section'>
      <Container maxWidth='lg'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link to='/'>Categories</Link>
          <Typography>{categoryName}</Typography>
        </Breadcrumbs>
        <h2>{categoryName}</h2>
        {!category && <h2>No items found</h2>}
        <div className='food-item-list'>
          {category &&
            category.items.map((item, index) => (
              <FoodItemCard key={index} itemDetail={item} />
            ))}
        </div>
        <div className='btn-wrap'>
          <Link className='primary-link' to='/'>
            Add other items
          </Link>
          <CustomButton
            className='primary-btn'
            varient='contained'
            onClick={checkLogedin}
          >
            Checkout
          </CustomButton>
        </div>
      </Container>
    </div>
  );
};

export default FoodListing;
