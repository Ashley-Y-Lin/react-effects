import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck";
/** DeckOfCards renders cardapp
 *
 *  State:
 *  -card: contains data regarding displayed card {data, isLoading}
 *  -deckId: contains data regarding deck used to generate card {data, isLoading}
 *
 *  App => DeckOfCards => Card
 */
function DeckOfCards() {
  const [cards, setCard] = useState([]);
  const [deckId, setDeckId] = useState({ data: "", isLoading: true });

  /** sets new deckId only AFTER MOUNT */
  useEffect(function fetchNewDeckOnMount() {
    async function fetchNewDeck() {
      const newDeck = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeckId({ data: newDeck.data.deck_id, isLoading: false });
    }
    fetchNewDeck();
  }, []);

  /** callback function to draw card from deck */
  async function fetchCard() {
    if (cards.length === 52) {
      console.log("you're done.")
      return
    }
    const newCard = await axios.get(`${BASE_URL}/${deckId.data}/draw/?count=1`);
    setCard([...cards, newCard]);
  }

  if (deckId.isLoading) return <i>Loading...</i>;

  return (
    <div>
      {cards.length < 52 && <button onClick={fetchCard}>Give me a card!</button>}
      {cards.length < 52 && cards.map((card,idx) => (
        <Card cardData={card} order={idx} />
      ))}
      {cards.length === 52 &&
          <h1> No cards remaining! </h1>}
    </div>
  );
}

export default DeckOfCards;