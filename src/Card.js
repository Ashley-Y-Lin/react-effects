import React from "react";

function Card({ cardData }) {
  const card = cardData.cards[0]

  return (<div>
    <img src={card.image} alt={`${card.value} ${card.suit}`} />
  </div>);
}

export default Card;