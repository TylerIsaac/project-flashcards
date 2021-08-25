import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index.js";
import { deleteDeck } from "../utils/api/index.js";
import DeckSnapshot from "./DeckSnapshot";
import { useHistory } from "react-router-dom";

export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks);

    return () => abortController.abort();
  }, []);

  const deleteHandler = async (deckId) => {
    const result = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId);
      const newDecks = await listDecks();
      setDecks(newDecks);
      history.push("/");
    }
  };

  const list = decks.map((deck) => (
    <DeckSnapshot
      key={deck.id}
      deckId={deck.id}
      name={deck.name}
      description={deck.description}
      amount={deck.cards.length}
      deleteHandler={deleteHandler}
    />
  ));

  return (
    <div>
      <section>
        <div className="container">
          <button
            className="btn btn-secondary btn-sm mb-2"
            onClick={() => history.push(`/decks/new`)}
          >
            +Create Deck
          </button>
          <div className>{list}</div>
        </div>
      </section>
    </div>
  );
};

export default DeckList;