import React from "react";

export const CardForm = (props) => {
  const {
    history,
    isNewCard,
    card,
    deckId,
    changeHandler,
    submitHandler,
  } = props;
  return (
    <form className="container" onSubmit={submitHandler}>
        <fieldset>
            <div className="row">
                <label htmlFor="front">Front :</label>
            </div>
            <div className="row">
                <textarea
                    className="form-control"
                    id="front"
                    name="front"
                    required={true}
                    rows="3"
                    maxLength="300"
                    value={card.front}
                    onChange={changeHandler}
                />
            </div>
            <div className="row mt-2">
                <label htmlFor="back">Back :</label>
            </div>
            <div className="row">
                <textarea
                    className="form-control"
                    id="back"
                    name="back"
                    required={true}
                    rows="3"
                    maxLength="300"
                    value={card.back}
                    onChange={changeHandler}
                />
            </div>
            <div className="row mt-3">
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => history.push(`/decks/${deckId}`)}
                >
                    {isNewCard ? "Done" : "Cancel"}
                </button>
                <button className="btn btn-primary btn-sm ml-2" type="submit">
                    {isNewCard ? "Save" : "Submit"}
                </button>
            </div>
        </fieldset>
    </form>
  );
};

export default CardForm;