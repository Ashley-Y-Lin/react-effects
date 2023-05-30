import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function DeckOfCards() {
  const [card, setCard] = useState({ data: null, isLoading: true });
  const [deckId, setDeckId] = useState({ data: "", isLoading: true });

  useEffect(function fetchNewDeckOnMount() {
    async function fetchNewDeck() {
      const newDeck = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeckId({ data: newDeck.data.deck_id, isLoading: false });
    }
    fetchNewDeck();
  }, []);

  async function fetchCard() {
    const newCard = await axios.get(`${BASE_URL}/${deckId.data}/draw/?count=1`);
    setCard({ data: newCard.data, isLoading: false });
  }

  if (deckId.isLoading) return <i>Loading...</i>;
  console.log("deckId", deckId);

  return (
    <div>
      <button onClick={fetchCard}>Give me a card!</button>
      {
        card.data && <Card cardData={card.data} />
      }
    </div>
  );
}

export default DeckOfCards;