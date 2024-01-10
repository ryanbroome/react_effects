import React from "react";

// render Card div element with cardStyle, id, and img src address
const Card = ({ img, id, remaining }) => {
  const cardStyle = {
    zIndex: remaining,
  };

  return (
    <div
      id={id}
      className='Card'
      style={cardStyle}>
      <img
        src={img}
        alt='playing card'
      />
    </div>
  );
};

export default Card;
