import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index.js";
import CardList from "./CardList";

export const DeckView = (props) => {
  const { deck, setDeck } = props;
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId, setDeck]);

  const deckDeleteHandler = async (deckId) => {
    const result = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  const refreshDeck = async () => {
    const updatedDeck = await readDeck(deckId);
    setDeck(updatedDeck);
  };

  if (deck.id) {
    return (
      <section>
        <div className="container">
          <div>
            <nav className="breadcrumb ml-2">
              <Link to="/">Home</Link>
              {" / "}
              <span>{deck.name}</span>
            </nav>
            <div className="">
              <div className="card-body">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className="row">
                    <div className="col">
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => history.push(`/decks/${deckId}/edit`)}
                            >
                            ✎ Edit
                        </button>
                        <button
                            className="btn btn-primary btn-sm ml-2"
                            onClick={() => history.push(`/decks/${deckId}/study`)}
                            >
                            🕮 Study
                        </button>
                        <button
                            className="btn btn-primary btn-sm ml-2"
                            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
                            >
                            + Add Cards
                        </button>
                        <button
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => deckDeleteHandler(deckId)}
                            >
                            🗑
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-4">Cards</h2>
          <CardList
            cards={deck.cards}
            deckId={deckId}
            refreshDeck={refreshDeck}
          />
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default DeckView;