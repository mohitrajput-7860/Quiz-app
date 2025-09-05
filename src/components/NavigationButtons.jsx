import React from 'react';

function NavigationButtons({
  currentQuestionIndex,
  totalQuestions,
  onNextQuestion,
  onPreviousQuestion,
}) {
  return (
    <div className="navigation-buttons">
      <button
        className="btn btn-prev"
        onClick={onPreviousQuestion}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button>

      <button
        className="btn btn-next"
        onClick={onNextQuestion}
        disabled={currentQuestionIndex === totalQuestions - 1 && !onNextQuestion}
      >
        {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default NavigationButtons;
