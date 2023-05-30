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
  const [cards, setCards] = useState({ data: [], isLoading: true });
  const [deckId, setDeckId] = useState({ data: "", isLoading: true });

  /** sets new deckId only AFTER MOUNT */
  useEffect(function fetchNewDeckOnMount() {
    async function fetchNewDeck() {
      const newDeck = await axios.get(`${BASE_URL}/new/`);
      setDeckId({ data: newDeck.data.deck_id, isLoading: false });
    }
    fetchNewDeck();
  }, []);

  /** callback function to draw card from deck */
  async function fetchCard() {
    if (cards.data.length === 52) {
      console.log("you're done.");
      return;
    }
    const newCard = await axios.get(`${BASE_URL}/${deckId.data}/draw/?count=1`);
    setCards({ data: [...cards.data, newCard.data], isLoading: false });
  }

  /** async function to shuffle current deck */
  async function shuffleDeck() {
    if (cards.data.length === 52) {
      console.log("no more cards to shuffle");
      return;
    }
    await axios.get(`${BASE_URL}/${deckId.data}/shuffle/?remaining=true`);
    setCards({ data: [], isLoading: false });
  }

  if (deckId.isLoading) return <i>Getting deck...</i>;

  return (
    <div>
      <div>
        <button onClick={fetchCard}>Give me a card!</button>
        <button onClick={shuffleDeck}>Shuffle current deck!</button>
      </div>

      {cards.data.length > 0
        && cards.data[cards.data.length - 1].remaining > 0
        && cards.data.map((card, idx) => (
          <Card key={card.cards[0].code} cardData={card} order={idx} />
        ))}
      {cards.data.length > 0
        && cards.data[cards.data.length - 1].remaining === 0
        && <h1> No cards remaining! </h1>}
    </div>
  );
}

export default DeckOfCards;