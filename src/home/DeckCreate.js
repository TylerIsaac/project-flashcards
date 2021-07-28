import React, { useState } from "react";
import { createDeck } from "../utils/api/index.js";
import { useHistory, Link } from "react-router-dom";

export const DeckCreate = () => {
  const initialDeckState = {
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState({ ...initialDeckState });
  const history = useHistory();

  const changeHandler = (event) => {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await createDeck(deck);

    // TODO: send user to Deck screen
    history.push("/");
  };

  return (
    <section className="container">
      <nav className="ml-2 breadcrumb">
        <Link to="/">Home</Link>
        {" / "}
        <span>Create Deck</span>
      </nav>
      <form className="card-body" onSubmit={submitHandler}>
        <div className="row">
          <h3>Create Deck</h3>
        </div>
          <fieldset>
            <div className="row">
              <label htmlFor="name">Name:</label>
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
              <label htmlFor="description">Description:</label>
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
              <button className="btn btn-secondary btn-sm" onClick={() => history.push("/")}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm ml-2" type="submit">
                Submit
              </button>
            </div>
          </fieldset>
      </form>
    </section>
  );
};

export default DeckCreate;