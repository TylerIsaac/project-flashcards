import React from "react";

export const StudyCardBack = ({ currentCard, flipCard, nextCard }) => {
  return (
    <div>
      <div>
        <p>{currentCard.back}</p>
      </div>
      <div className="group-row">
        <button className="btn btn-secondary btn-sm" onClick={() => flipCard()}>
          Flip
        </button>
        <button className="btn btn-primary btn-sm ml-2" onClick={() => nextCard()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StudyCardBack;