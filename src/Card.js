import React from "react";

// Simple Card Component props: face value, image, id
const Card = ({ value, img, id }) => {
  return (
    <div
      id={id}
      className='Card'>
      <p
        className='Card-value'
        id={`${value}`}>
        {value}
      </p>
      <img
        src={img}
        alt='playing card'
      />
    </div>
  );
};

export default Card;
