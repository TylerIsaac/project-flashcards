import React, { useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index.js";

export const EditDeck = (props) => {
  const { deck, setDeck } = props;
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId, setDeck]);

  const changeHandler = (event) => {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`/decks/${deckId}`);
  };

  return (
    <section className="container">
        <div>
            <nav className="ml-2 breadcrumb">
                <Link to="/">Home</Link>
                {" / "}
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                {" / "}
                <span>Edit Deck</span>
            </nav>
            
            <form className="card-body" onSubmit={submitHandler}>
                <div className="row">
                    <h2>Edit Deck</h2>
                </div>
                <fieldset>
                    <div className="row">
                        <label htmlFor="name">Name :</label>
                    </div>
                    <div className="row">
                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            required={true}
                            value={deck.name}
                            maxLength="100"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="row mt-2">
                        <label htmlFor="description">Description :</label>
                    </div>
                    <div className="row">
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            required={true}
                            rows="3"
                            maxLength="500"
                            value={deck.description}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="row mt-3">
                        <button
                            className="btn btn-secondary btn-sm mr-2"
                            onClick={() => history.push(`/decks/${deckId}`)}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-primary btn-sm" type="submit">
                            Submit
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    </section>
  );
};

export default EditDeck;