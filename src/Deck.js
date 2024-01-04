import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

// Card Component props: face value, image
const BASE_URL = "https://deckofcardsapi.com/api/deck/";
const NEW_DECK_URL = `${BASE_URL}new/shuffle/`;

// Deck component to render all seleceted cards and house current deck and cards state data
const Deck = (props) => {
  const [deck_id, setDeck_id] = useState(null);
  const [cards, setCards] = useState([]);
  const [deckData, setDeckData] = useState({});
  // side effect, get deck data on initial load and every time the number of decks changes
  useEffect(() => {
    // async function to get data, useEffect callback cannot be async
    async function getDeck() {
      const res = await axios.get(`${NEW_DECK_URL}?deck_count=${props.numDecks}`);
      const id = res.data.deck_id;
      setDeck_id(id);
      setDeckData(res.data);
    }

    getDeck();
    // track numDecks for rerun of the above callback
  }, [props.numDecks]);

  // async function to draw a single card
  async function getCard() {
    const cardRes = await axios.get(`${BASE_URL}${deck_id}/draw/?count=1`);
    const drawnCards = cardRes.data.cards;
    console.log(cardRes.data, "cardRes.data");

    // Logic to alert when cards have run out
    if (cards.length >= 51) {
      alert("You have drawn all the cards");
    }
    // update card state with selected cards plus the newly drawn cards
    setCards([...cards, ...drawnCards]);
    setDeckData(cardRes.data);
  }

  return (
    <div>
      <button onClick={getCard}>
        {52 - deckData.remaining} / {deckData.remaining}
      </button>
      <h3 className='Deck-id'>{deck_id ? deck_id : "LOADING..."}</h3>
      <div className='Deck-cards'>
        {cards.map((c) => (
          <Card
            value={c.code}
            img={c.image}
            key={c.code}
            id={c.code}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
