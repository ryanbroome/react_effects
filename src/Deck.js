import React, { useState, useEffect } from "react";
import axios from "axios";

// Card Component props: face value, image
const BASE_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/";

const Deck = () => {
  const [deck_id, setDeck_id] = useState(null);
  useEffect(() => {
    console.log("RENDER");
    axios.get(`${BASE_URL}?deck_count=1`).then((res) => {
      setDeck_id(res.data.deck_id);
      console.log(res.data.deck_id);
    });
  }, []);

  return <h3>{deck_id ? deck_id : "LOADING..."}</h3>;
};

export default Deck;
