import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import DeckList from "../home/DeckList";
import DeckCreate from "../home/DeckCreate";
import Study from "../study/Study";
import DeckIndex from "../deck/DeckIndex.js";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <DeckIndex />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
