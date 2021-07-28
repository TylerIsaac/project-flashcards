import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

export const DeckIndex = () => {
  const [deck, setDeck] = useState([]);

  return (
    <Switch>
      <Route exact path="/decks/:deckId">
        <DeckView deck={deck} setDeck={setDeck} />
      </Route>
      <Route path="/decks/:deckId/edit">
        <EditDeck deck={deck} setDeck={setDeck} />
      </Route>
      <Route path="/decks/:deckId/cards/new">
        <AddCard deck={deck} setDeck={setDeck} />
      </Route>
      <Route path="/decks/:deckId/cards/:cardId/edit">
        <EditCard deck={deck} setDeck={setDeck} />
      </Route>
    </Switch>
  );
};

export default DeckIndex;