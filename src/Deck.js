import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const BASE_URL = "https://deckofcardsapi.com/api/deck/";
const NEW_DECK_URL = `${BASE_URL}new/`;
const NEW_SHUFFLED_DECK_URL = `${BASE_URL}new/shuffle/?deck_count=1`;

/** Deck
 * props : None
 * state : cards, deckData
 *
 * deckData: requests a new Deck at initial render
 * cards: renders all cards and persists current deck and cards state data
 **/
const Deck = (props) => {
  const [cards, setCards] = useState([]);
  const [deckData, setDeckData] = useState(null);
  const [url, setUrl] = useState(NEW_DECK_URL);

  useEffect(function getDeckWhenMounted() {
    async function getDeck() {
      const deckRes = await axios.get(`${NEW_DECK_URL}?deck_count=1`);
      setDeckData(deckRes.data);
    }
    getDeck();
  }, []);

  useEffect(() => {
    async function getDeckAll() {
      // const deckRes = await axios.get(url);
      // setDeckData(deckRes.data);
      // setCards([...cards, deckRes.data.cards]);
    }
    getDeckAll();
  }, [url]);

  /**handleCardClick
   *arguments : none
   *makes request to draw card from our deck_id
   * updates state for cards and deckData
   **/
  async function handleCardClick() {
    const cardRes = await axios.get(`${BASE_URL}${deckData.deck_id}/draw/?count=1`);
    const drawnCards = cardRes.data.cards;

    if (deckData.remaining <= 0) {
      alert("YOU WON, ALL CARDS DRAWN");
    }

    setCards([...cards, ...drawnCards]);
    setDeckData(cardRes.data);
  }

  /**handleShuffleClick
   *arguments : none
   * -makes request to shuffle remaining cards from our deck
   * -updates state for cards and deck data
   **/
  async function handleShuffleClick() {
    function shuffleUrl(deck_id) {
      return `${BASE_URL}/${deck_id}/shuffle/?remaining=true`;
    }
    const resetRes = await axios.get(shuffleUrl(deckData.deck_id));
    setDeckData(resetRes.data);
  }

  /** handleNewShuffleDeckClick
   * arguments: none
   * -makes request to url
   * -updates state
   **/
  async function handleNewShuffleDeckClick() {
    const newDeckShuffleRes = await axios.get(NEW_SHUFFLED_DECK_URL);
    setCards([]);
    setDeckData(newDeckShuffleRes.data);
  }

  return (
    <>
      <h3 className='Deck-id'>Deck ID: {deckData ? deckData.deck_id : "LOADING..."}</h3>
      <div className='Deck-cards'>
        {cards
          ? cards.map((c) => (
              <Card
                // value={c.code}
                img={c.image}
                key={c.code}
                id={c.code}
                remaining={deckData.remaining}
              />
            ))
          : false}
      </div>

      <button
        className='draw'
        onClick={handleCardClick}>
        {deckData ? 52 - deckData.remaining : 52} / {deckData ? deckData.remaining : 0}
      </button>

      <button
        onClick={handleShuffleClick}
        className='shuffle'>
        Shuffle Deck
      </button>

      <button
        onClick={handleNewShuffleDeckClick}
        className='reset'>
        New Shuffled Deck
      </button>
    </>
  );
};

export default Deck;
