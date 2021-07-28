import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api/index.js";
import { useHistory, useParams, Link } from "react-router-dom";
import CardForm from "./CardForm.js";

export const AddCard = (props) => {
  const initialCardState = {
    front: "",
    back: "",
  };
  const [card, setCard] = useState({ ...initialCardState });
  const { deck, setDeck } = props;
  const isNewCard = true;
  const history = useHistory();
  const { deckId } = useParams();

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
    await createCard(deckId, card);
    setCard({ ...initialCardState });
  };

  if (deck.name) {
    return (
        <section>
            <div className="container">
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    {" / "}
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    {" / "}
                    <span>Add Card</span>
                </nav>
                <div>
                    <h2>
                        <i>{deck.name}</i> : Add Card
                    </h2>
                    <CardForm
                        history={history}
                        isNewCard={isNewCard}
                        card={card}
                        deckId={deckId}
                        changeHandler={changeHandler}
                        submitHandler={submitHandler}
                    />
                </div>
            </div>
        </section>
    );
  } else {
    return null;
  }
};

export default AddCard;