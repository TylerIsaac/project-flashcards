import React from "react";

export const StudyCardFront = ({ currentCard, flipCard }) => {
  return (
    <div>
      <div>
        <p>{currentCard.front}</p>
      </div>
      <button className="btn btn-secondary btn-sm" onClick={() => flipCard()}>
        Flip
      </button>
    </div>
  );
};

export default StudyCardFront;