import React from 'react';

function AnswerOptions({ options, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="answer-options">
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name="answer"
            value={option}
            checked={selectedAnswer === option}
            onChange={() => onAnswerSelect(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default AnswerOptions;