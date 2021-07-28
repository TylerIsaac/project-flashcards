import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api/index.js";

export const CardList = ({ cards, deckId, refreshDeck }) => {
  const history = useHistory();

  const cardDeleteHandler = async (cardId) => {
    const result = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (result) {
      await deleteCard(cardId);
      await refreshDeck();
      history.push(`/decks/${deckId}`);
    }
  };

  return (
    <div>
      {cards.map((card) => (
        <div className="container card" key={card.id}>
            <div className="row card-body">
                <div className="col">
                    <p>{card.front}</p>
                </div>
                <div className="col">
                    <p>{card.back}</p>
                </div>
            </div>
            <div className="row card-body">
                <div className="col justify-content-end">
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                            history.push(`/decks/${deckId}/cards/${card.id}/edit`)
                        }
                    >
                        Edit
                    </button>
                    <button className="btn btn-danger btn-sm ml-2" onClick={() => cardDeleteHandler(card.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;