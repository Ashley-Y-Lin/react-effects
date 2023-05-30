import React from "react";

/** Card renders single card pulled from deck
 *
 * Prop:
 *  -cardData: result from API request {API result,...}
 *  -idx: order in fetched cards array
 *
 *  App => DeckOfCards => Card
 */
function Card({ cardData, idx }) {
  function generateRandDeg(ref) {
    return Math.floor(Math.random() * ref);
  }
  const cardStyle = {
    transform: `rotate(${generateRandDeg(360)}deg)`,
    zIndex: idx,
    position: "absolute",
    left: `${500 + generateRandDeg(10)}px`,
    top: `${100 + generateRandDeg(3)}px`
  }

  const card = cardData.cards[0]

  return (<div style={cardStyle}>
    <img src={card.image} alt={`${card.value} ${card.suit}`} />
  </div>);
}

export default Card;