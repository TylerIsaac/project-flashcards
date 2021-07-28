import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api/index.js";
import CardForm from "./CardForm.js";

export const EditCard = (props) => {
  const initialCardState = {
    front: "",
    back: "",
  };
  const [card, setCard] = useState({ ...initialCardState });
  const { deck, setDeck } = props;
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const isNewCard = false;

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal).then(setCard);

    return () => abortController.abort();
  }, [cardId]);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId, setDeck]);

  const changeHandler = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deckId}`);
  };

  if (deck.name) {
    return (
        <section className="container">
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    {" / "}
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    {" / "}
                    <span>Edit Card {cardId}</span>
                </nav>
                <h2>Edit Card</h2>
            <div className="row card-body">
                <CardForm
                    history={history}
                    isNewCard={isNewCard}
                    card={card}
                    deckId={deckId}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                />
            </div>
        </section>
    );
  } else {
    return null;
  }
};

export default EditCard;