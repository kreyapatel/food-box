import React from "react";

const CategoryItemCard = ({ name, catImage, onClick }) => {
  return (
    <div className='category-item'>
      <div className='category-inner-wrap' onClick={onClick}>
        <div className='image-block'>
          <img
            src={catImage}
            style={{
              height: "120px",
              width: "120px",
              objectFit: "contain",
              objectPosition: "center",
            }}
            alt={name}
          />
        </div>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CategoryItemCard;
