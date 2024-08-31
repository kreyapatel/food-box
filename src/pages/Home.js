import React from "react";
import { Autocomplete, Box, Container } from "@mui/material";
import bannerImage from "../assets/images/banner-img.jpg";
import data from "../data.json";

import burgerImg from "../assets/images/burger.png";
import pizzaImg from "../assets/images/pizza.png";
import pastaImg from "../assets/images/pasta.png";
import wrapImg from "../assets/images/wraps.png";
import saladImg from "../assets/images/salad.png";
import tacosImg from "../assets/images/tacos.png";
import CategoryItemCard from "../components/CategoryItemCard";
import { useNavigate } from "react-router-dom";
import CustomTextfield from "../components/CustomTextfield";

const Home = () => {
  const categoryImages = {
    "burger_category.png": burgerImg,
    "pizza_category.png": pizzaImg,
    "pasta_category.png": pastaImg,
    "wrap_category.png": wrapImg,
    "salad_category.png": saladImg,
    "tacos_category.png": tacosImg,
    // Map other images similarly...
  };
  const navigate = useNavigate();

  function handleCategoryClick(category) {
    navigate(`/category/${category}`);
  }
  return (
    <div>
      <Box
        className='home-banner'
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <Container maxWidth='lg'>
          <h2>Explore the Best Food Adventures</h2>
          <p>
            Dive into an adventure of tastes and aromas from every corner of the
            world.
          </p>
        </Container>
      </Box>
      <Box className='category-listing-section'>
        <Container maxWidth='lg'>
          <Box className='section-title-block'>
            <h3>What's in your mind?</h3>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={data.foodCategories.map((cat) => cat.category)}
              sx={{ width: 300 }}
              onChange={(event, value) => {
                handleCategoryClick(value);
              }}
              renderInput={(params) => (
                <CustomTextfield
                  className='small-input'
                  {...params}
                  placeholder='Search Food'
                />
              )}
            />
          </Box>
          <Box className='category-list'>
            {data.foodCategories.map((category, index) => (
              <CategoryItemCard
                key={index}
                name={category.category}
                catImage={categoryImages[category.categoryImageURL]}
                onClick={() => {
                  handleCategoryClick(category.category);
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
