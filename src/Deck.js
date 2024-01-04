import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

// Card Component props: face value, image
const BASE_URL = "https://deckofcardsapi.com/api/deck/";
const NEW_DECK_URL = `${BASE_URL}new/shuffle/`;

const Deck = (props) => {
  console.log("RENDERED DECK");
  const [deck_id, setDeck_id] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log("Effected");

    async function getDeck() {
      const res = await axios.get(`${NEW_DECK_URL}?deck_count=1`);
      const id = res.data.deck_id;
      setDeck_id(id);
    }

    getDeck();
  }, []);

  async function getCard() {
    const cardRes = await axios.get(`${BASE_URL}${deck_id}/draw/?count=1`);
    const drawnCards = cardRes.data.cards;

    setCards([...cards, ...drawnCards]);
  }

  return (
    <div>
      <button onClick={getCard}>Get Card</button>
      <h3 className='Deck-id'>{deck_id ? deck_id : "LOADING..."}</h3>
      {cards.map((c) => (
        <Card
          value={c.code}
          img={c.image}
          key={c.code}
          id={c.code}
        />
      ))}
    </div>
  );
};

export default Deck;
