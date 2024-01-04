import React from "react";

// Card Component props: face value, image
const Card = ({ value, img }) => {
  console.log("rendered CARD");
  return (
    <div>
      <p>{value}</p>
      <img
        src={img}
        alt='playing card'
      />
    </div>
  );
};

export default Card;
