import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import StudyCardFront from "./StudyCardFront";
import StudyCardBack from "./StudyCardBack";

export const Study = () => {
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  const nextCard = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex((currentValue) => currentValue + 1);
      setShowFront(true);
    } else {
      handleRestart();
    }
  };

  const handleRestart = () => {
    const result = window.confirm(
      "Restart cards? Click 'cancel' to return to the home page."
    );
    if (result) {
      setCurrentCardIndex(0);
      setShowFront(true);
    } else {
      history.push("/");
    }
  };

  const flipCard = () => {
    setShowFront((currentValue) => !currentValue);
  };

  if (deck.name) {
    return (
      <section className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          {" / "}
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          {" / "}
          <span>Study</span>
        </nav>
        <h2>
            <i>{deck.name}</i> : Study
        </h2>
        <div>
            {deck.cards.length <= 2 ? (
            <div className="card">
                <div className="card-body">
                    <h3>Not enough cards.</h3>
                    <p>
                    You need at least 3 cards to study. There are {deck.cards.length}{" "}
                    cards in this deck
                    </p>
                    <button className="btn btn-secondary btn-sm" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
                    Add Cards
                    </button>
                </div>
            </div>
            ) : (
            <div className="card">
                <div className="card-body">
                    <h4>
                    Card {currentCardIndex + 1} of {deck.cards.length}
                    </h4>
                    {showFront ? (
                    <StudyCardFront
                        currentCard={deck.cards[currentCardIndex]}
                        flipCard={flipCard}
                    />
                    ) : (
                    <StudyCardBack
                        currentCard={deck.cards[currentCardIndex]}
                        flipCard={flipCard}
                        nextCard={nextCard}
                    />
                    )}
                </div>
            </div>
        )}
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default Study;