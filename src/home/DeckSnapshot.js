import React from "react";
import { useHistory } from "react-router-dom";

export const DeckSnapshot = ({
  deckId,
  name,
  description,
  amount,
  deleteHandler,
}) => {
  const history = useHistory();

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className>
            <h6>{amount} cards</h6>
        </div>
        <p className="card-text">{description}</p>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          View
        </button>
        <button
          className="btn btn-primary ml-2 btn-sm"
          onClick={() => history.push(`/decks/${deckId}/study`)}
        >
          Study
        </button>
        <button className="btn btn-danger ml-2 btn-sm" onClick={() => deleteHandler(deckId)}>
          🗑
        </button>
      </div>
    </div>
  );
};

export default DeckSnapshot;